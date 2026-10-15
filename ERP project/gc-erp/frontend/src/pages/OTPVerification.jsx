import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClickSpark from '../components/common/ClickSpark';
import { ShieldCheck, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, pendingOtpUser, demoOtp } = useAuth();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoCodePreview = location.state?.otpPreview || demoOtp || '123456';

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOtp(otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillDemo = () => {
    setOtp(demoCodePreview);
    setError('');
  };

  return (
    <ClickSpark sparkColor="#0284c7" sparkSize={12} sparkRadius={20} sparkCount={10} duration={400}>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl z-10 relative">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>

          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <KeyRound className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-1">Two-Factor Authentication</h2>
          <p className="text-xs text-slate-500 mb-6">
            Enter the 6-digit verification code sent to{' '}
            <strong className="text-slate-800">{pendingOtpUser?.email_vc || 'user@gulfconsult.com'}</strong>
          </p>

          {/* Demo OTP Banner */}
          <div
            onClick={handleQuickFillDemo}
            className="mb-6 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-between cursor-pointer hover:bg-blue-100/70 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Demo OTP: <strong className="text-blue-900 tracking-widest">{demoCodePreview}</strong></span>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-600 text-white">Click to Autofill</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                6-Digit Security Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="0 0 0 0 0 0"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-mono font-bold text-blue-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Verify & Continue to Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </ClickSpark>
  );
}
