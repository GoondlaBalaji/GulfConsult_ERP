import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Calendar, 
  Globe, 
  KeyRound, 
  CheckCircle2, 
  Edit3, 
  Lock, 
  Briefcase,
  MapPin,
  Clock
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Profile() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="Account"
        pageTitle="My Profile & Security"
        subtitle="Manage personal credentials, organizational assignments, and account security settings."
        taglineTop="Identity"
        taglineBottom="Verified Access"
        actionLabel="Edit Profile"
        actionIcon={Edit3}
        extraRightContent={
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Update Password</span>
          </button>
        }
      />

      {/* Main Profile Summary Banner Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-3xl border border-blue-100 shadow-sm">
              {currentUser?.empname_vc ? currentUser.empname_vc.charAt(0) : 'G'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900">{currentUser?.empname_vc || 'Goondla Balaji'}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Employee
                </span>
              </div>
              <p className="text-xs text-blue-600 font-medium">{currentUser?.role_vc || 'Principal Systems Architect'}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Executive Technical Management
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Kuwait City HQ &bull; Tower A
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Joined Jan 15, 2019
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 sm:border-l sm:border-slate-200 sm:pl-6 text-right">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Security Clearance</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Level 4 &bull; Full ERP Admin
            </span>
            <span className="text-[11px] text-slate-400 mt-1">2FA Verified via Phone & Email</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['Overview', 'Employment Details', 'Security & Access', 'Projects Assigned'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === tab 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Contact Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Personal & Contact Information</span>
            </h3>
            <span className="text-[11px] text-slate-400">Verified</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Username:</span>
              <p className="font-semibold text-slate-800 mt-1 font-mono">{currentUser?.username_vc || 'admin'}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Employee Code:</span>
              <p className="font-semibold text-slate-800 mt-1 font-mono">GC-{currentUser?.ecode_nu || 1001}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Official Email:</span>
              <p className="font-semibold text-slate-800 mt-1">{currentUser?.email_vc || 'balaji.g@gulfconsult.com'}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Office Phone:</span>
              <p className="font-semibold text-slate-800 mt-1">+965 2244 8900 Ext 240</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Civil ID / National ID:</span>
              <p className="font-semibold text-slate-800 mt-1 font-mono">289041203491</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Nationality:</span>
              <p className="font-semibold text-slate-800 mt-1">Kuwait / Expatriate Professional</p>
            </div>
          </div>
        </div>

        {/* Organizational Details Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Organizational & Role Details</span>
            </h3>
            <span className="text-[11px] text-slate-400">GC Enterprise Master</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Department:</span>
              <p className="font-semibold text-slate-800 mt-1">{currentUser?.department || 'Executive Management'}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Designation:</span>
              <p className="font-semibold text-slate-800 mt-1">{currentUser?.role_vc || 'Senior Technical Director'}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Reporting Line:</span>
              <p className="font-semibold text-slate-800 mt-1">Dr. Tariq Al-Ghanim (Managing Director)</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Contract Type:</span>
              <p className="font-semibold text-slate-800 mt-1">Permanent &bull; Indefinite Contract</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Base Salary Grade:</span>
              <p className="font-semibold text-slate-800 mt-1">Grade 9 (Executive Leadership)</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Annual Leave Balance:</span>
              <p className="font-semibold text-emerald-600 mt-1">28.5 Days Available</p>
            </div>
          </div>
        </div>

        {/* Security & Access Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-600" />
              <span>Security & Access Credentials</span>
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium">Active Session</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">Multi-Factor Authentication (MFA)</span>
                <span className="text-[11px] text-slate-500">Secured via OTP & Authenticator App</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">Password Last Modified</span>
                <span className="text-[11px] text-slate-500">Changed 24 days ago &bull; Next rotation in 66 days</span>
              </div>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">Current Session IP</span>
                <span className="text-[11px] text-slate-500">192.168.1.105 &bull; Kuwait City HQ Network</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Current Device</span>
            </div>
          </div>
        </div>

        {/* Active Project Allocations */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Active Project Allocations</span>
            </h3>
            <span className="text-[11px] text-slate-400">3 Projects</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Gulf Maritime Complex Phase 2</div>
                <div className="text-[11px] text-slate-500">Lead Architectural Supervision &bull; 40% Allocation</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Kuwait New Metro Line A</div>
                <div className="text-[11px] text-slate-500">Senior Technical Consultant &bull; 35% Allocation</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Sabah Al-Salem University Campus</div>
                <div className="text-[11px] text-slate-500">Design Advisory Review &bull; 25% Allocation</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
