import React from 'react';
import { UserPlus, Plus, MoreVertical, Search, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function NewJoiners() {
  const metricCards = [
    { value: '18', label: 'New Joiners (This Year)', trend: '+5 since last quarter', icon: UserPlus, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '6', label: 'Currently Onboarding', trend: 'In progress', icon: Clock, iconBg: 'bg-[#fffbeb]', iconColor: 'text-[#f59e0b]' },
    { value: '12', label: 'Onboarding Completed', trend: 'This year', icon: CheckCircle, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
    { value: '94%', label: 'Retention Rate', trend: '+2% vs last year', icon: TrendingUp, iconBg: 'bg-[#f3e8ff]', iconColor: 'text-[#9333ea]' },
  ];

  const joiners = [
    { id: 'NJ-001', name: 'Sarah Jenkins', avatar: 'SJ', avatarBg: 'bg-[#f3e8ff] text-[#9333ea]', title: 'HR Coordinator', dept: 'Human Resources', joinDate: '2026-07-25', status: 'Onboarding', statusStyle: 'bg-[#fff7ed] text-[#ea580c]', progress: 60 },
    { id: 'NJ-002', name: 'Ahmad Nasser', avatar: 'AN', avatarBg: 'bg-[#eff6ff] text-[#2563eb]', title: 'Civil Engineer', dept: 'Engineering & Operations', joinDate: '2026-07-20', status: 'Onboarding', statusStyle: 'bg-[#fff7ed] text-[#ea580c]', progress: 75 },
    { id: 'NJ-003', name: 'Maria Santos', avatar: 'MS', avatarBg: 'bg-[#fce7f3] text-[#db2777]', title: 'Payroll Specialist', dept: 'Finance & Payroll', joinDate: '2026-07-15', status: 'Completed', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', progress: 100 },
    { id: 'NJ-004', name: 'Omar Khalid', avatar: 'OK', avatarBg: 'bg-[#ecfdf5] text-[#059669]', title: 'Site Inspector', dept: 'Construction Operations', joinDate: '2026-07-10', status: 'Completed', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', progress: 100 },
    { id: 'NJ-005', name: 'Lisa Chen', avatar: 'LC', avatarBg: 'bg-[#e0f2fe] text-[#0284c7]', title: 'IT Analyst', dept: 'IT Systems', joinDate: '2026-08-01', status: 'Pending', statusStyle: 'bg-[#eff6ff] text-[#2563eb]', progress: 10 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="HRMS"
        pageTitle="New Joiners & Onboarding"
        subtitle="Track candidate onboarding progression, equipment allocation, and document clearance."
        taglineTop="Growth"
        taglineBottom="Welcome Team"
        actionLabel="Add New Joiner"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => { const Icon = card.icon; return (
          <div key={idx} className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}><Icon className="w-6 h-6" /></div>
            <div><h3 className="text-2xl font-bold text-[#0f172a] tracking-tight leading-none">{card.value}</h3><p className="text-xs font-medium text-[#64748b] mt-1">{card.label}</p><p className="text-[11px] font-medium text-[#10b981] mt-1">{card.trend}</p></div>
          </div>
        ); })}
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-[#eef2f6]">
          <h3 className="text-sm font-bold text-[#0f172a]">Onboarding Tracker</h3>
          <div className="relative w-60"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input type="text" placeholder="Search joiners..." className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
              <th className="py-3 px-4 font-medium">ID</th><th className="py-3 px-4 font-medium">Employee</th><th className="py-3 px-4 font-medium">Position</th><th className="py-3 px-4 font-medium">Department</th><th className="py-3 px-4 font-medium">Join Date</th><th className="py-3 px-4 font-medium">Progress</th><th className="py-3 px-4 font-medium">Status</th><th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {joiners.map((j) => (
                <tr key={j.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#475569]">{j.id}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2.5"><div className={`w-7 h-7 rounded-full ${j.avatarBg} font-bold flex items-center justify-center text-[10px]`}>{j.avatar}</div><span className="font-semibold text-[#0f172a]">{j.name}</span></div></td>
                  <td className="py-3 px-4 text-[#475569]">{j.title}</td>
                  <td className="py-3 px-4 text-[#475569]">{j.dept}</td>
                  <td className="py-3 px-4 text-[#475569]">{j.joinDate}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><div className="w-20 h-1.5 rounded-full bg-[#e2e8f0]"><div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${j.progress}%` }} /></div><span className="text-[11px] font-medium text-[#64748b]">{j.progress}%</span></div></td>
                  <td className="py-3 px-4"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${j.statusStyle}`}>{j.status}</span></td>
                  <td className="py-3 px-4 text-right text-[#94a3b8] hover:text-[#0f172a] cursor-pointer"><MoreVertical className="w-4 h-4 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
