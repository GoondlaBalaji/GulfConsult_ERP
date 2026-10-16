const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send Real 6-Digit OTP Email via Resend Third-Party API (or fallback to Nodemailer)
 * @param {string} toEmail - Recipient email address
 * @param {string} otp - 6-Digit OTP code
 * @param {string} purpose - 'registration' or 'login'
 */
const sendOtpEmail = async (toEmail, otp, purpose = 'registration') => {
  const subject =
    purpose === 'registration'
      ? 'Gulf Consult ERP — Your Account Activation OTP Code'
      : 'Gulf Consult ERP — 2FA Login Verification Code';

  const titleText =
    purpose === 'registration'
      ? 'Employee Account Activation'
      : 'Two-Factor Authentication';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6fb; margin: 0; padding: 20px; color: #222; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.06); }
          .header { background: #1e3a8a; padding: 28px 24px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px; }
          .header p { color: #93c5fd; margin: 6px 0 0 0; font-size: 13px; letter-spacing: 0.5px; }
          .content { padding: 32px 28px; text-align: center; }
          .content h2 { font-size: 18px; color: #111827; margin: 0 0 12px 0; }
          .content p { font-size: 14px; color: #4b5563; line-height: 1.5; margin: 0 0 24px 0; }
          .otp-badge { display: inline-block; background: #eff6ff; border: 2px dashed #3b82f6; border-radius: 10px; padding: 14px 28px; font-size: 32px; font-weight: 800; color: #1d4ed8; letter-spacing: 8px; margin: 0 auto 24px auto; }
          .warning { font-size: 12px; color: #6b7280; background: #f9fafb; border-radius: 8px; padding: 12px; line-height: 1.4; }
          .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px; text-align: center; font-size: 11px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GULF CONSULT</h1>
            <p>Enterprise Resource Planning Portal</p>
          </div>
          <div class="content">
            <h2>${titleText}</h2>
            <p>We received a request for authentication from your email address. Use the 6-digit one-time verification code below to proceed:</p>
            <div class="otp-badge">${otp}</div>
            <div class="warning">
              ⏳ <strong>This code is valid for 10 minutes.</strong><br>
              🔒 For your security, never share this OTP code with anyone, including Gulf Consult personnel.
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Gulf Consult Engineering & Planning. All rights reserved.<br>
            Al-Murqab, Block 3, Al-Sour Street, Kuwait City
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Try Resend Third-Party API first (Industry standard)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM || 'Gulf Consult ERP <onboarding@resend.dev>';
      const result = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      console.log(`🚀 [Resend API] Real email successfully delivered to ${toEmail} (ID: ${result.data?.id})`);
      return { success: true, provider: 'resend', id: result.data?.id };
    } catch (resendErr) {
      console.error('❌ Resend API delivery error:', resendErr.message);
      throw resendErr;
    }
  }

  // 2. Try Nodemailer Gmail SMTP if configured
  const transporter = createTransporter();
  if (transporter) {
    try {
      const mailOptions = {
        from: `"Gulf Consult ERP" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject,
        html,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log(`✉️ [Nodemailer] Email successfully delivered to ${toEmail} (ID: ${info.messageId})`);
      return { success: true, provider: 'nodemailer', messageId: info.messageId };
    } catch (smtpErr) {
      console.error('❌ Nodemailer delivery error:', smtpErr.message);
      throw smtpErr;
    }
  }

  // 3. Fallback when neither service has API keys configured
  console.warn(`⚠️ No email provider configured (Set RESEND_API_KEY in .env). OTP for ${toEmail} is: ${otp}`);
  return { success: true, simulated: true, otp };
};

/**
 * Send automated Onboarding Email to newly created employee with their new Employee ID
 */
const sendWelcomeEmployeeEmail = async ({ toEmail, empName, ecodeNu, jobTitle = 'Staff Member' }) => {
  const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',')[0] : 'https://gulfconsulterp-frontend.vercel.app';
  const activationLink = `${clientUrl}/login?ecode=${ecodeNu}&email=${encodeURIComponent(toEmail)}`;

  const subject = `Welcome to Gulf Consult — Your Employee ID (#${ecodeNu}) & Portal Access`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: #1e3a8a; padding: 32px 24px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
          .header p { color: #93c5fd; margin: 6px 0 0 0; font-size: 13px; }
          .body-content { padding: 32px 28px; }
          .badge-card { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; margin: 24px 0; text-align: left; }
          .badge-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #cbd5e1; }
          .badge-row:last-child { border-bottom: none; }
          .label { color: #64748b; font-size: 13px; font-weight: 500; }
          .value { color: #0f172a; font-size: 14px; font-weight: 700; }
          .emp-id-highlight { font-size: 26px; color: #1e40af; font-weight: 800; letter-spacing: 2px; }
          .btn { display: block; width: 100%; box-sizing: border-box; background: #2563eb; color: #ffffff !important; text-decoration: none; text-align: center; padding: 14px 20px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 24px 0; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GULF CONSULT</h1>
            <p>Official Employee Onboarding</p>
          </div>
          <div class="body-content">
            <h2 style="margin-top: 0; color: #0f172a;">Welcome to the Team, ${empName}!</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              Your employee profile has been registered in the Gulf Consult Enterprise Resource Planning (ERP) system.
            </p>

            <div class="badge-card">
              <div style="text-align: center; padding-bottom: 12px; border-bottom: 1px solid #cbd5e1;">
                <div style="font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 600;">Your Official Employee ID</div>
                <div class="emp-id-highlight">#${ecodeNu}</div>
              </div>
              <div style="padding-top: 12px;">
                <div style="margin: 6px 0;"><strong style="color: #64748b;">Full Name:</strong> ${empName}</div>
                <div style="margin: 6px 0;"><strong style="color: #64748b;">Corporate Email:</strong> ${toEmail}</div>
                <div style="margin: 6px 0;"><strong style="color: #64748b;">Role / Job:</strong> ${jobTitle}</div>
              </div>
            </div>

            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              You can log in to your portal using either your <strong>Employee ID (#${ecodeNu})</strong> or your email. Please click below to activate your account and choose your password:
            </p>

            <a href="${activationLink}" class="btn">Set Password & Activate Portal</a>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Gulf Consult Engineering & Planning. All rights reserved.<br>
            If you did not expect this invitation, please contact Gulf Consult HR immediately.
          </div>
        </div>
      </body>
    </html>
  `;

  // Dispatch via Resend or Nodemailer
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM || 'Gulf Consult HR <onboarding@resend.dev>';
      await resend.emails.send({ from: fromEmail, to: [toEmail], subject, html });
      console.log(`🚀 [Resend] Onboarding welcome email sent to ${toEmail} (ID: #${ecodeNu})`);
      return { success: true, provider: 'resend' };
    } catch (e) {
      console.error('Failed to send onboarding email via Resend:', e.message);
    }
  }

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Gulf Consult HR" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject,
        html,
      });
      console.log(`✉️ [Nodemailer] Onboarding welcome email sent to ${toEmail} (ID: #${ecodeNu})`);
      return { success: true, provider: 'nodemailer' };
    } catch (e) {
      console.error('Failed to send onboarding email via Nodemailer:', e.message);
    }
  }

  console.log(`ℹ️ [Simulated] Onboarding email for ${toEmail} with Employee ID #${ecodeNu} (Link: ${activationLink})`);
  return { success: true, simulated: true, activationLink };
};

module.exports = {
  sendOtpEmail,
  sendWelcomeEmployeeEmail,
};

