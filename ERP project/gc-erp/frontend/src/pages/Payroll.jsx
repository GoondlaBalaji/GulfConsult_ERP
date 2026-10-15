import React from 'react';
import { DollarSign, Plus, MoreVertical, Search, Users, CheckCircle, Clock, TrendingUp, Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Payroll() {
  const metricCards = [
    { value: '$485,200', label: 'Monthly Payroll', trend: 'Processed for July', icon: DollarSign, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
    { value: '248', label: 'Employees on Payroll', trend: 'All departments', icon: Users, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '6', label: 'Pending Processing', trend: 'New joiners', icon: Clock, iconBg: 'bg-[#fffbeb]', iconColor: 'text-[#f59e0b]' },
    { value: '$5.8M', label: 'YTD Total', trend: '+8% vs last year', icon: TrendingUp, iconBg: 'bg-[#f3e8ff]', iconColor: 'text-[#9333ea]' },
  ];

  const payrollRecords = [
    { id: 'PAY-2026-07', employee: 'Goondla Balaji', avatar: 'GB', avatarBg: 'bg-[#eff6ff] text-[#2563eb]', dept: 'Software Engineering', basicSalary: '$4,200', allowances: '$800', deductions: '$320', netPay: '$4,680', status: 'Paid', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'PAY-2026-07', employee: 'Fatima Al-Mansoor', avatar: 'FM', avatarBg: 'bg-[#ffe4e6] text-[#e11d48]', dept: 'Human Resources', basicSalary: '$3,800', allowances: '$600', deductions: '$280', netPay: '$4,120', status: 'Paid', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'PAY-2026-07', employee: 'Tariq Rashid', avatar: 'TR', avatarBg: 'bg-[#ecfdf5] text-[#059669]', dept: 'Engineering & Operations', basicSalary: '$3,500', allowances: '$700', deductions: '$260', netPay: '$3,940', status: 'Paid', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'PAY-2026-07', employee: 'Sarah Jenkins', avatar: 'SJ', avatarBg: 'bg-[#f3e8ff] text-[#9333ea]', dept: 'Human Resources', basicSalary: '$2,800', allowances: '$400', deductions: '$200', netPay: '$3,000', status: 'Pending', statusStyle: 'bg-[#fff7ed] text-[#ea580c]' },
    { id: 'PAY-2026-07', employee: 'Kharim Hussain', avatar: 'KH', avatarBg: 'bg-[#ecfdf5] text-[#16a34a]', dept: 'Construction Operations', basicSalary: '$3,200', allowances: '$650', deductions: '$240', netPay: '$3,610', status: 'Paid', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'PAY-2026-07', employee: 'Elena Rostova', avatar: 'ER', avatarBg: 'bg-[#fce7f3] text-[#db2777]', dept: 'Finance & Payroll', basicSalary: '$3,000', allowances: '$500', deductions: '$220', netPay: '$3,280', status: 'Paid', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="Payroll"
        pageTitle="Payroll Register"
        subtitle="Process monthly employee disbursements, standard allowances, statutory PIFSS withholdings, and payslips."
        taglineTop="Financial"
        taglineBottom="Ledger Balance"
        actionLabel="Run Payroll Cycle"
        extraRightContent={
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 px-3 py-1 bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#0f172a] text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Export Payslips</span>
          </button>
        }
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
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eef2f6]">
          <div>
            <h3 className="text-sm font-bold text-[#0f172a]">July 2026 Payroll Register</h3>
            <p className="text-[11px] text-[#64748b]">248 employee disbursements processed for cycle July 2026</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search payroll records..."
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] hover:bg-slate-50 text-xs font-semibold text-[#0f172a] rounded-lg shadow-xs transition-colors">
              <Download className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Export Payslips</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
              <th className="py-3 px-4 font-medium">Employee</th><th className="py-3 px-4 font-medium">Department</th><th className="py-3 px-4 font-medium">Basic Salary</th><th className="py-3 px-4 font-medium">Allowances</th><th className="py-3 px-4 font-medium">Deductions</th><th className="py-3 px-4 font-medium">Net Pay</th><th className="py-3 px-4 font-medium">Status</th><th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {payrollRecords.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4"><div className="flex items-center gap-2.5"><div className={`w-7 h-7 rounded-full ${p.avatarBg} font-bold flex items-center justify-center text-[10px]`}>{p.avatar}</div><span className="font-semibold text-[#0f172a]">{p.employee}</span></div></td>
                  <td className="py-3 px-4 text-[#475569]">{p.dept}</td>
                  <td className="py-3 px-4 text-[#0f172a] font-medium">{p.basicSalary}</td>
                  <td className="py-3 px-4 text-[#10b981] font-medium">+{p.allowances}</td>
                  <td className="py-3 px-4 text-[#f43f5e] font-medium">-{p.deductions}</td>
                  <td className="py-3 px-4 text-[#0f172a] font-bold">{p.netPay}</td>
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
