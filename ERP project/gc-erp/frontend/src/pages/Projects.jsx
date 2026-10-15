import React from 'react';
import { FolderKanban, Plus, MoreVertical, Search, DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Projects() {
  const metricCards = [
    { value: '34', label: 'Active Projects', trend: '+5 new projects', icon: FolderKanban, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '12', label: 'In Progress', trend: 'On track', icon: Clock, iconBg: 'bg-[#fffbeb]', iconColor: 'text-[#f59e0b]' },
    { value: '8', label: 'Completed This Year', trend: '+3 vs last year', icon: CheckCircle, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
    { value: '$4.2M', label: 'Total Budget', trend: '78% utilized', icon: DollarSign, iconBg: 'bg-[#f3e8ff]', iconColor: 'text-[#9333ea]' },
  ];

  const projects = [
    { id: 'PRJ-001', name: 'Gulf Maritime Complex Phase 2', client: 'Kuwait Port Authority', budget: '$1.2M', progress: 78, manager: 'Tariq Rashid', status: 'In Progress', statusStyle: 'bg-[#eff6ff] text-[#2563eb]', deadline: '2026-12-15' },
    { id: 'PRJ-002', name: 'Al-Farwaniya Infrastructure Upgrade', client: 'Ministry of Public Works', budget: '$850K', progress: 45, manager: 'Kharim Hussain', status: 'In Progress', statusStyle: 'bg-[#eff6ff] text-[#2563eb]', deadline: '2027-03-20' },
    { id: 'PRJ-003', name: 'Sabah Al-Salem Commercial Tower', client: 'Tamdeen Group', budget: '$2.4M', progress: 92, manager: 'Goondla Balaji', status: 'Reviewing', statusStyle: 'bg-[#fff7ed] text-[#ea580c]', deadline: '2026-09-30' },
    { id: 'PRJ-004', name: 'Kuwait University Campus Extension', client: 'Ministry of Education', budget: '$3.1M', progress: 15, manager: 'Tariq Rashid', status: 'Planning', statusStyle: 'bg-[#f3e8ff] text-[#9333ea]', deadline: '2028-06-01' },
    { id: 'PRJ-005', name: 'Shuwaikh Industrial Zone Renovation', client: 'Kuwait Industries Co.', budget: '$600K', progress: 100, manager: 'Kharim Hussain', status: 'Completed', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', deadline: '2026-06-30' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="TSMS"
        pageTitle="Projects Master"
        subtitle="Manage engineering consultancies, project budgets, contractor milestones, and site deliverables."
        taglineTop="Milestones"
        taglineBottom="Deliver Quality"
        actionLabel="Create Project"
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
          <h3 className="text-sm font-bold text-[#0f172a]">All Projects</h3>
          <div className="relative w-60"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input type="text" placeholder="Search projects..." className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
              <th className="py-3 px-4 font-medium">Project ID</th><th className="py-3 px-4 font-medium">Project Name</th><th className="py-3 px-4 font-medium">Client</th><th className="py-3 px-4 font-medium">Budget</th><th className="py-3 px-4 font-medium">Progress</th><th className="py-3 px-4 font-medium">Manager</th><th className="py-3 px-4 font-medium">Deadline</th><th className="py-3 px-4 font-medium">Status</th><th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#475569]">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0f172a]">{p.name}</td>
                  <td className="py-3 px-4 text-[#475569]">{p.client}</td>
                  <td className="py-3 px-4 text-[#10b981] font-semibold">{p.budget}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><div className="w-20 h-1.5 rounded-full bg-[#e2e8f0]"><div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${p.progress}%` }} /></div><span className="text-[11px] font-medium text-[#64748b]">{p.progress}%</span></div></td>
                  <td className="py-3 px-4 text-[#475569]">{p.manager}</td>
                  <td className="py-3 px-4 text-[#475569]">{p.deadline}</td>
                  <td className="py-3 px-4"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${p.statusStyle}`}>{p.status}</span></td>
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
