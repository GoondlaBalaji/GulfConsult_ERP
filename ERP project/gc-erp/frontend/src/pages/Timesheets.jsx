import React from 'react';
import { Calendar, Plus, MoreVertical, Search, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Timesheets() {
  const metricCards = [
    { value: '186', label: 'Total Timesheets', trend: 'This month', icon: Calendar, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '14', label: 'Pending Approval', trend: 'Requires action', icon: Clock, iconBg: 'bg-[#fff7ed]', iconColor: 'text-[#ea580c]' },
    { value: '168', label: 'Approved', trend: '90% approval rate', icon: CheckCircle, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
    { value: '4', label: 'Rejected', trend: '2% rejection rate', icon: AlertCircle, iconBg: 'bg-[#fff1f2]', iconColor: 'text-[#f43f5e]' },
  ];

  const timesheets = [
    { id: 'TS-2026-0187', employee: 'Goondla Balaji', avatar: 'GB', avatarBg: 'bg-[#eff6ff] text-[#2563eb]', project: 'Gulf Maritime Complex', period: 'Jul 21-27, 2026', hours: 42.5, submitted: '2026-07-28', status: 'Approved', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'TS-2026-0186', employee: 'Tariq Rashid', avatar: 'TR', avatarBg: 'bg-[#ecfdf5] text-[#059669]', project: 'Al-Farwaniya Infrastructure', period: 'Jul 21-27, 2026', hours: 45.0, submitted: '2026-07-28', status: 'Pending', statusStyle: 'bg-[#fff7ed] text-[#ea580c]' },
    { id: 'TS-2026-0185', employee: 'Kharim Hussain', avatar: 'KH', avatarBg: 'bg-[#ecfdf5] text-[#16a34a]', project: 'Shuwaikh Industrial Zone', period: 'Jul 21-27, 2026', hours: 48.0, submitted: '2026-07-27', status: 'Approved', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'TS-2026-0184', employee: 'Sarah Jenkins', avatar: 'SJ', avatarBg: 'bg-[#f3e8ff] text-[#9333ea]', project: 'HR Operations', period: 'Jul 21-27, 2026', hours: 40.0, submitted: '2026-07-28', status: 'Pending', statusStyle: 'bg-[#fff7ed] text-[#ea580c]' },
    { id: 'TS-2026-0183', employee: 'Elena Rostova', avatar: 'ER', avatarBg: 'bg-[#fce7f3] text-[#db2777]', project: 'Finance Operations', period: 'Jul 14-20, 2026', hours: 38.5, submitted: '2026-07-21', status: 'Approved', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'TS-2026-0182', employee: 'Mohammed Ali', avatar: 'MA', avatarBg: 'bg-[#e0f2fe] text-[#0284c7]', project: 'IT Infrastructure', period: 'Jul 14-20, 2026', hours: 36.0, submitted: '2026-07-22', status: 'Rejected', statusStyle: 'bg-[#fff1f2] text-[#f43f5e]' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="TSMS"
        pageTitle="Timesheets"
        subtitle="Review, track, and approve consultant weekly timesheet submissions and project hours."
        taglineTop="Hours"
        taglineBottom="Log Accuracy"
        actionLabel="Submit Timesheet"
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
          <h3 className="text-sm font-bold text-[#0f172a]">Timesheet Records</h3>
          <div className="relative w-60"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input type="text" placeholder="Search timesheets..." className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
              <th className="py-3 px-4 font-medium">Timesheet ID</th><th className="py-3 px-4 font-medium">Employee</th><th className="py-3 px-4 font-medium">Project</th><th className="py-3 px-4 font-medium">Period</th><th className="py-3 px-4 font-medium">Hours</th><th className="py-3 px-4 font-medium">Submitted</th><th className="py-3 px-4 font-medium">Status</th><th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {timesheets.map((t) => (
                <tr key={t.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#475569]">{t.id}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2.5"><div className={`w-7 h-7 rounded-full ${t.avatarBg} font-bold flex items-center justify-center text-[10px]`}>{t.avatar}</div><span className="font-semibold text-[#0f172a]">{t.employee}</span></div></td>
                  <td className="py-3 px-4 text-[#475569]">{t.project}</td>
                  <td className="py-3 px-4 text-[#475569]">{t.period}</td>
                  <td className="py-3 px-4 text-[#0f172a] font-semibold">{t.hours}h</td>
                  <td className="py-3 px-4 text-[#475569]">{t.submitted}</td>
                  <td className="py-3 px-4"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${t.statusStyle}`}>{t.status}</span></td>
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
