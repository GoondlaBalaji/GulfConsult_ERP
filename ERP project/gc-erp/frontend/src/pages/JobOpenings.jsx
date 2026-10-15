import React from 'react';
import { Briefcase, Plus, MapPin, ChevronDown, MoreVertical, ArrowUpDown, Search, Clock, Users, TrendingUp } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function JobOpenings() {
  const metricCards = [
    { value: '18', label: 'Open Positions', trend: '+3 this month', icon: Briefcase, iconBg: 'bg-[#fffbeb]', iconColor: 'text-[#f59e0b]' },
    { value: '42', label: 'Total Applicants', trend: '+8 new this week', icon: Users, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '6', label: 'Interviews Scheduled', trend: 'This week', icon: Clock, iconBg: 'bg-[#f3e8ff]', iconColor: 'text-[#9333ea]' },
    { value: '4', label: 'Offers Extended', trend: '2 accepted', icon: TrendingUp, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
  ];

  const jobs = [
    { id: 'JOB-001', title: 'Senior Structural Engineer', dept: 'Engineering & Operations', vacancies: 3, exp: '8+ Years', location: 'Kuwait City', salary: '$4,500 - $6,000', status: 'Open', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', posted: '2026-07-15', applicants: 12 },
    { id: 'JOB-002', title: 'BIM Modeler (REVIT)', dept: 'Engineering & Operations', vacancies: 2, exp: '4+ Years', location: 'Ahmadi', salary: '$2,800 - $3,500', status: 'Open', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', posted: '2026-07-18', applicants: 8 },
    { id: 'JOB-003', title: 'HR Business Partner', dept: 'Human Resources', vacancies: 1, exp: '5+ Years', location: 'Kuwait City', salary: '$3,200 - $4,000', status: 'Open', statusStyle: 'bg-[#ecfdf5] text-[#10b981]', posted: '2026-07-20', applicants: 6 },
    { id: 'JOB-004', title: 'Site Safety Officer', dept: 'Construction Operations', vacancies: 2, exp: '3+ Years', location: 'Shuwaikh', salary: '$2,500 - $3,200', status: 'Closed', statusStyle: 'bg-[#f1f5f9] text-[#64748b]', posted: '2026-06-10', applicants: 15 },
    { id: 'JOB-005', title: 'Financial Controller', dept: 'Finance & Payroll', vacancies: 1, exp: '10+ Years', location: 'Kuwait City', salary: '$5,000 - $7,000', status: 'On Hold', statusStyle: 'bg-[#fff7ed] text-[#ea580c]', posted: '2026-07-22', applicants: 3 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="HRMS"
        pageTitle="Job Openings"
        subtitle="Manage talent acquisition, open engineering positions, and candidate interview pipelines."
        taglineTop="Talent"
        taglineBottom="Build Excellence"
        actionLabel="Post New Opening"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}><Icon className="w-6 h-6" /></div>
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight leading-none">{card.value}</h3>
                <p className="text-xs font-medium text-[#64748b] mt-1">{card.label}</p>
                <p className="text-[11px] font-medium text-[#10b981] mt-1">{card.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-[#eef2f6]">
          <h3 className="text-sm font-bold text-[#0f172a]">All Job Openings</h3>
          <div className="relative w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input type="text" placeholder="Search positions..." className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
                <th className="py-3 px-4 font-medium">Job ID</th>
                <th className="py-3 px-4 font-medium">Position</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Experience</th>
                <th className="py-3 px-4 font-medium">Vacancies</th>
                <th className="py-3 px-4 font-medium">Applicants</th>
                <th className="py-3 px-4 font-medium">Salary Range</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Posted</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#475569]">{j.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0f172a]">{j.title}</td>
                  <td className="py-3 px-4 text-[#475569]">{j.dept}</td>
                  <td className="py-3 px-4 text-[#475569]"><div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#94a3b8]" />{j.location}</div></td>
                  <td className="py-3 px-4 text-[#475569]">{j.exp}</td>
                  <td className="py-3 px-4 text-[#0f172a] font-semibold">{j.vacancies}</td>
                  <td className="py-3 px-4 text-[#2563eb] font-semibold">{j.applicants}</td>
                  <td className="py-3 px-4 text-[#10b981] font-medium">{j.salary}</td>
                  <td className="py-3 px-4"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${j.statusStyle}`}>{j.status}</span></td>
                  <td className="py-3 px-4 text-[#475569]">{j.posted}</td>
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
