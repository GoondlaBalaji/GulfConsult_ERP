import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  UserCheck,
  CreditCard,
  Calendar,
  FolderKanban,
  BarChart3,
  FileBarChart,
  FileText,
  Settings,
  ChevronDown,
  Building,
  ChevronsLeft,
  ShieldCheck,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [openMenus, setOpenMenus] = useState({
    hrms: true,
    reports: false,
  });

  const toggleSubmenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Enterprise Role-Based Access Evaluation
  const currentRole = currentUser?.role_vc || currentUser?.role || 'System Administrator';
  const isAdmin = currentRole === 'System Administrator';
  const isHR = isAdmin || currentRole === 'HR Manager';
  const isPM = isAdmin || currentRole === 'Project Manager';

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 w-60 bg-white border-r border-[#e8ecf2] flex flex-col justify-between transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Top: Logo & Company Name */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#eef2f6]">
          <div className="flex items-center gap-3 min-w-0">
            {/* Official Gulf Consult Logo Mark */}
            <img
              src="/gc-logo.png"
              alt="Gulf Consult Logo"
              className="w-9 h-9 rounded-lg object-contain shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-[#0f172a] tracking-tight leading-tight">GC ERP</h2>
              <span className="text-[10px] text-[#64748b] font-normal leading-tight block truncate">Gulf Consult Enterprise</span>
            </div>
          </div>
          <span 
            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 border ${
              isAdmin 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : isHR 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : isPM 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {isAdmin ? 'Admin' : isHR ? 'HR Mgr' : isPM ? 'PM' : 'Emp'}
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Dashboard */}
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                  isActive || location.pathname === '/'
                    ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                }`
              }
            >
              {(location.pathname === '/dashboard' || location.pathname === '/') && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
              )}
              <div className="flex items-center gap-3">
                <Home
                  className={`w-4 h-4 ${
                    location.pathname === '/dashboard' || location.pathname === '/'
                      ? 'text-[#2563eb]'
                      : 'text-[#64748b]'
                  }`}
                />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </div>

          {/* SECTION: PEOPLE */}
          {(isHR || isPM) && (
            <div className="space-y-1">
              <p className="px-3.5 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                PEOPLE & OPERATIONS
              </p>

              {/* Employees - HR & Admin Only */}
              {isHR && (
                <NavLink
                  to="/employees"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive
                        ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                        : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                    }`
                  }
                >
                  {location.pathname === '/employees' && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
                  )}
                  <div className="flex items-center gap-3">
                    <Users
                      className={`w-4 h-4 ${
                        location.pathname === '/employees' ? 'text-[#2563eb]' : 'text-[#64748b]'
                      }`}
                    />
                    <span>Employees</span>
                  </div>
                </NavLink>
              )}

              {/* HR Management with submenus - HR & Admin Only */}
              {isHR && (
                <div>
                  <button
                    onClick={() => toggleSubmenu('hrms')}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                      openMenus.hrms ? 'text-[#0f172a] bg-[#f8fafc]' : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-[#64748b]" />
                      <span>HR Management</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform text-[#94a3b8] ${
                        openMenus.hrms ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openMenus.hrms && (
                    <div className="pl-9 pr-2 space-y-0.5 py-1">
                      <NavLink
                        to="/job-openings"
                        className={({ isActive }) =>
                          `block px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            isActive
                              ? 'text-[#2563eb] bg-[#eff6ff] font-semibold'
                              : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                          }`
                        }
                      >
                        Job Openings
                      </NavLink>
                      <NavLink
                        to="/new-joiners"
                        className={({ isActive }) =>
                          `block px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            isActive
                              ? 'text-[#2563eb] bg-[#eff6ff] font-semibold'
                              : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                          }`
                        }
                      >
                        New Joiners
                      </NavLink>
                    </div>
                  )}
                </div>
              )}

              {/* Payroll - HR & Admin Only */}
              {isHR && (
                <NavLink
                  to="/payroll"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive
                        ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                        : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                    }`
                  }
                >
                  {location.pathname === '/payroll' && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
                  )}
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-[#64748b]" />
                    <span>Payroll</span>
                  </div>
                </NavLink>
              )}

              {/* Timesheets (TSMS) - PM, HR & Admin */}
              <NavLink
                to="/timesheets"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                  }`
                }
              >
                {location.pathname === '/timesheets' && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#64748b]" />
                  <span>Timesheets (TSMS)</span>
                </div>
              </NavLink>

              {/* Projects - PM, HR & Admin */}
              <NavLink
                to="/projects"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                  }`
                }
              >
                {location.pathname === '/projects' && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
                )}
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-[#64748b]" />
                  <span>Projects</span>
                </div>
              </NavLink>
            </div>
          )}

          {/* SECTION: FINANCE - HR & Admin Only */}
          {isHR && (
            <div className="space-y-1">
              <p className="px-3.5 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                FINANCE & COMPENSATION
              </p>

              <NavLink
                to="/allowances"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-[#64748b]" />
                  <span>Allowances & Deductions</span>
                </div>
              </NavLink>
            </div>
          )}

          {/* SECTION: SYSTEM */}
          <div className="space-y-1">
            <p className="px-3.5 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
              SYSTEM
            </p>

            <NavLink
              to="/documents"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#64748b]" />
                <span>Documents</span>
              </div>
            </NavLink>

            {/* Security Users - Exclusive to System Administrator */}
            {isAdmin && (
              <NavLink
                to="/users"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                  }`
                }
              >
                {location.pathname === '/users' && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563eb] rounded-r-md" />
                )}
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
                  <span>Security Accounts</span>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                  Admin
                </span>
              </NavLink>
            )}

            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#64748b]" />
                <span>Settings</span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Bottom Area: Architectural sketch, Company Info, Status, Collapse */}
      <div className="border-t border-[#eef2f6]">
        {/* Architectural skyscraper line illustration matching reference image */}
        <div className="px-4 pt-3 pb-1 flex justify-center">
          <svg
            viewBox="0 0 200 88"
            className="w-full h-14 stroke-[#33465e] fill-none transition-colors duration-300 hover:stroke-[#2563eb] cursor-default"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Ground Baseline */}
            <line x1="2" y1="76" x2="198" y2="76" strokeWidth="0.7" stroke="#cbd5e1" />
            <line x1="8" y1="76" x2="192" y2="76" strokeWidth="1.2" stroke="#33465e" />

            {/* LEFT PRISM / ANGLED FACET */}
            <polyline points="12,76 56,43 75,56" strokeWidth="1.3" />
            <line x1="56" y1="43" x2="56" y2="76" strokeWidth="1.2" />
            <line x1="22" y1="69" x2="35" y2="76" strokeWidth="0.8" />
            <line x1="33" y1="61" x2="56" y2="72" strokeWidth="0.8" />
            <line x1="25" y1="76" x2="48" y2="58" strokeWidth="0.8" />
            <line x1="38" y1="76" x2="52" y2="65" strokeWidth="0.7" />
            <line x1="42" y1="53" x2="56" y2="63" strokeWidth="0.8" />
            <line x1="45" y1="76" x2="56" y2="67" strokeWidth="0.7" />
            <line x1="61" y1="46" x2="61" y2="76" strokeWidth="0.8" />
            <line x1="66" y1="50" x2="66" y2="76" strokeWidth="0.8" />
            <line x1="71" y1="53" x2="71" y2="76" strokeWidth="0.8" />

            {/* CENTER MAIN TOWER */}
            <polyline points="75,34 105,10 130,30" strokeWidth="1.4" />
            <line x1="105" y1="10" x2="105" y2="76" strokeWidth="1.4" />
            <line x1="75" y1="34" x2="75" y2="76" strokeWidth="1.3" />
            <line x1="130" y1="30" x2="130" y2="76" strokeWidth="1.3" />
            <line x1="78" y1="31" x2="78" y2="76" strokeWidth="0.7" />
            <line x1="81" y1="29" x2="81" y2="76" strokeWidth="0.9" />
            <line x1="84" y1="27" x2="84" y2="76" strokeWidth="0.6" />
            <line x1="87" y1="24" x2="87" y2="76" strokeWidth="1.0" />
            <line x1="89" y1="22.5" x2="89" y2="76" strokeWidth="0.6" />
            <line x1="92" y1="20" x2="92" y2="76" strokeWidth="0.8" />
            <line x1="95" y1="18" x2="95" y2="76" strokeWidth="0.7" />
            <line x1="98" y1="15.5" x2="98" y2="76" strokeWidth="0.9" />
            <line x1="101" y1="13" x2="101" y2="76" strokeWidth="0.6" />
            <line x1="110" y1="14" x2="110" y2="76" strokeWidth="0.9" />
            <line x1="115" y1="18" x2="115" y2="76" strokeWidth="0.8" />
            <line x1="120" y1="22" x2="120" y2="76" strokeWidth="0.9" />
            <line x1="125" y1="26" x2="125" y2="76" strokeWidth="0.8" />

            {/* RIGHT WING */}
            <polyline points="130,38 184,69 184,76" strokeWidth="1.3" />
            <line x1="130" y1="47" x2="148" y2="47" strokeWidth="1.0" />
            <line x1="130" y1="56" x2="164" y2="56" strokeWidth="1.0" />
            <line x1="130" y1="66" x2="179" y2="66" strokeWidth="1.0" />
            <line x1="142" y1="44" x2="142" y2="76" strokeWidth="0.9" />
            <line x1="154" y1="51" x2="154" y2="76" strokeWidth="0.9" />
            <line x1="166" y1="58" x2="166" y2="76" strokeWidth="0.9" />
            <line x1="177" y1="64" x2="177" y2="76" strokeWidth="0.8" />
            <line x1="130" y1="59" x2="151" y2="76" strokeWidth="0.8" />
            <line x1="130" y1="68" x2="140" y2="76" strokeWidth="0.7" />
            <line x1="148" y1="66" x2="160" y2="76" strokeWidth="0.7" />
            <line x1="160" y1="66" x2="172" y2="76" strokeWidth="0.7" />
          </svg>
        </div>

        {/* Company Card: Gulf Consult Enterprise Kuwait */}
        <div className="px-4 py-2 flex items-center gap-2.5">
          <img
            src="/gc-logo.png"
            alt="Gulf Consult"
            className="w-6 h-6 rounded-md object-contain shrink-0"
          />
          <div>
            <h4 className="text-xs font-semibold text-[#0f172a] leading-tight">Gulf Consult Enterprise</h4>
            <p className="text-[10px] text-[#64748b]">Kuwait</p>
          </div>
        </div>

        {/* System Status: All systems operational */}
        <div className="px-4 py-1.5 flex items-center gap-2.5 text-[11px] text-[#475569]">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>All systems operational</span>
        </div>

        {/* Collapse Button */}
        <div className="px-4 py-2 border-t border-[#f1f5f9]">
          <button className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#0f172a] transition-colors">
            <ChevronsLeft className="w-3.5 h-3.5" />
            <span>Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
