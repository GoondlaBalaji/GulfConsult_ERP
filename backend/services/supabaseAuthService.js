/**
 * Supabase Cloud Auth Service
 * Uses Supabase GoTrue Auth REST API to dispatch and verify email OTP codes.
 * Works seamlessly with any email provider and without requiring WebSocket/realtime client dependencies.
 */

const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  // Clean trailing slash if present
  return {
    url: url.replace(/\/+$/, ''),
    key: key.trim(),
  };
};

/**
 * Dispatches a 6-digit OTP code to ANY email address using Supabase Cloud Auth.
 * Supabase handles cloud delivery to Gmail, Yahoo, Outlook, corporate domains, etc.
 */
const sendSupabaseOtp = async (email) => {
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/auth/v1/otp`, {
    method: 'POST',
    headers: {
      'apikey': config.key,
      'Authorization': `Bearer ${config.key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      create_user: true,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.msg || data.message || data.error_description || `HTTP error ${response.status}`;
    console.error('❌ Supabase OTP dispatch error:', errorMsg);
    throw new Error(errorMsg);
  }

  console.log(`🚀 [Supabase Cloud Auth] Verification code dispatched to ${email}`);
  return { success: true, provider: 'supabase', data };
};

/**
 * Verifies the 6-digit OTP code via Supabase Cloud Auth.
 */
const verifySupabaseOtp = async (email, token) => {
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/auth/v1/verify`, {
    method: 'POST',
    headers: {
      'apikey': config.key,
      'Authorization': `Bearer ${config.key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      token: token.trim(),
      type: 'email',
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.msg || data.message || data.error_description || 'Invalid or expired verification code';
    console.error('❌ Supabase OTP verification failed:', errorMsg);
    throw new Error(errorMsg);
  }

  console.log(`✅ [Supabase Cloud Auth] OTP verified successfully for ${email}`);
  return { success: true, user: data.user, session: data.session };
};

module.exports = {
  getSupabaseConfig,
  sendSupabaseOtp,
  verifySupabaseOtp,
};
