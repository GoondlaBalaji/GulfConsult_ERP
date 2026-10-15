import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Download, 
  MoreVertical, 
  KeyRound, 
  Lock, 
  UserCheck, 
  ShieldAlert,
  SlidersHorizontal,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { getStoredUsers } from '../services/mockAuth';
import { api } from '../services/api';
import PageHeader from '../components/common/PageHeader';

export default function Users() {
  const [users, setUsers] = useState(() => getStoredUsers());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.getUsers();
        if (res && res.users && res.users.length > 0) {
          setUsers(res.users);
        }
      } catch (err) {
        console.warn('API users fetch fallback to stored:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const metricCards = [
    { 
      label: 'Total System Users', 
      value: users.length.toString(), 
      trend: 'Registered ERP accounts', 
      isPositive: true,
      icon: UserCheck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Security Administrators', 
      value: '3', 
      trend: 'Full privileged access', 
      isPositive: true,
      icon: ShieldAlert,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      label: 'Active Authentications', 
      value: '18', 
      trend: 'Current active sessions', 
      isPositive: true,
      icon: KeyRound,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      label: 'MFA Security Compliance', 
      value: '100%', 
      trend: 'OTP verification enforced', 
      isPositive: true,
      icon: ShieldCheck,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
  ];

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.username_vc && u.username_vc.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (u.empname_vc && u.empname_vc.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (u.role_vc && u.role_vc.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'All' || u.role_vc === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="Security"
        pageTitle="Security User Accounts"
        subtitle="Role-based access control, security profiles, and enterprise authentication management."
        taglineTop="Access"
        taglineBottom="Protect System"
        actionLabel="Create User Account"
        actionIcon={UserPlus}
      />

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] font-medium text-slate-600">
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar / Search / Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by username, full name, or security role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Role:</span>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="System Administrator">System Administrator</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Finance Controller">Finance Controller</option>
              <option value="Consultant">Consultant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Account User</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Employee Code</th>
                <th className="py-3 px-4">Security Role</th>
                <th className="py-3 px-4">MFA Status</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.user_id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                    #{u.user_id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-200">
                        {u.empname_vc ? u.empname_vc.charAt(0) : 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{u.empname_vc || 'System User'}</div>
                        <div className="text-[10px] text-slate-400">{u.email_vc || 'user@gulfconsult.com'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">
                    {u.username_vc}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    GC-{u.ecode_nu || 1000}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {u.role_vc || 'Standard User'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Enforced
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-xs text-slate-400">
                    No user accounts found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredUsers.length}</span> of <span className="font-semibold text-slate-700">{users.length}</span> security accounts
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-2 font-medium text-slate-700">1</span>
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
