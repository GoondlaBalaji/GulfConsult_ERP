import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ChevronDown, LogOut, User, Menu } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = currentUser?.empname_vc || 'Goondla Balaji';
  const displayRole = currentUser?.role_vc || 'System Administrator';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('') || 'GB';

  return (
    <header className="h-16 bg-white border-b border-[#e8ecf2] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side: Mobile Toggle + Global Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-[#64748b] hover:text-[#0f172a] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors" />
          <input
            type="text"
            placeholder="Search employees, projects, timesheets, documents..."
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-14 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all duration-200"
          />
          {/* Ctrl K badge */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-[#94a3b8] bg-[#eef2f6] px-1.5 py-0.5 rounded border border-[#e2e8f0] font-medium pointer-events-none">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right side: Country Selector, Notifications, User Profile */}
      <div className="flex items-center gap-4">
        {/* Country Selector: Kuwait */}
        <div className="relative">
          <button
            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 hover:border-slate-300 text-xs text-[#0f172a] font-medium transition-all duration-150"
          >
            <span className="inline-flex items-center justify-center overflow-hidden rounded-xs w-4 h-3 border border-[#e2e8f0]">
              <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                <rect width="640" height="160" fill="#007a3d" />
                <rect y="160" width="640" height="160" fill="#ffffff" />
                <rect y="320" width="640" height="160" fill="#ce1126" />
                <polygon points="0,0 213,160 213,320 0,480" fill="#000000" />
              </svg>
            </span>
            <span>Kuwait</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#94a3b8] transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {countryDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-lg border border-[#e2e8f0] shadow-lg py-1 z-30 text-xs animate-dropdown">
              <div
                onClick={() => setCountryDropdownOpen(false)}
                className="px-3 py-2 flex items-center gap-2 hover:bg-slate-50 cursor-pointer font-medium text-[#0f172a] transition-colors"
              >
                <span>🇰🇼</span> Kuwait
              </div>
              <div
                onClick={() => setCountryDropdownOpen(false)}
                className="px-3 py-2 flex items-center gap-2 hover:bg-slate-50 cursor-pointer text-[#475569] transition-colors"
              >
                <span>🇸🇦</span> Saudi Arabia
              </div>
              <div
                onClick={() => setCountryDropdownOpen(false)}
                className="px-3 py-2 flex items-center gap-2 hover:bg-slate-50 cursor-pointer text-[#475569] transition-colors"
              >
                <span>🇦🇪</span> UAE
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell with 3 Badge */}
        <div className="relative cursor-pointer text-[#475569] hover:text-[#0f172a] p-1 transition-all duration-150 hover:scale-105 active:scale-95">
          <Bell className="w-5 h-5" />
          <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#ef4444] text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs">
            3
          </span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 text-left focus:outline-none group pl-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white font-bold flex items-center justify-center text-xs shadow-xs transition-transform duration-150 group-hover:scale-105 group-hover:ring-2 group-hover:ring-blue-100">
              {initials}
            </div>
            <div className="hidden sm:block">
              <h4 className="text-xs font-semibold text-[#0f172a] leading-tight">{displayName}</h4>
              <p className="text-[10px] text-[#64748b] leading-tight mt-0.5">{displayRole}</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#0f172a] transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#e2e8f0] shadow-lg py-1 z-30 animate-dropdown">
              <div className="px-4 py-2 border-b border-[#f1f5f9]">
                <p className="text-xs font-bold text-[#0f172a]">{displayName}</p>
                <p className="text-[10px] text-[#64748b]">{currentUser?.email_vc || 'balaji@gulfconsult.com'}</p>
              </div>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/profile');
                }}
                className="w-full px-4 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc] flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#64748b]" />
                <span>My Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-[#f1f5f9]"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
