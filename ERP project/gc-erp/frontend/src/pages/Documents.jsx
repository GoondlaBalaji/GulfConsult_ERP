import React from 'react';
import { FileText, Plus, MoreVertical, Search, Download, FolderOpen, Clock, File } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Documents() {
  const metricCards = [
    { value: '342', label: 'Total Documents', trend: '+24 this month', icon: FileText, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { value: '28', label: 'Pending Review', trend: 'Requires attention', icon: Clock, iconBg: 'bg-[#fff7ed]', iconColor: 'text-[#ea580c]' },
    { value: '15', label: 'Categories', trend: 'Well organized', icon: FolderOpen, iconBg: 'bg-[#f3e8ff]', iconColor: 'text-[#9333ea]' },
    { value: '1.8 GB', label: 'Storage Used', trend: 'of 10 GB', icon: File, iconBg: 'bg-[#ecfdf5]', iconColor: 'text-[#10b981]' },
  ];

  const documents = [
    { id: 'DOC-001', name: 'Employee Handbook 2026', category: 'HR Policies', uploadedBy: 'Fatima Al-Mansoor', date: '2026-07-15', size: '2.4 MB', type: 'PDF', status: 'Published', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'DOC-002', name: 'Gulf Maritime Complex - Contract', category: 'Project Documents', uploadedBy: 'Tariq Rashid', date: '2026-07-20', size: '8.1 MB', type: 'PDF', status: 'Published', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
    { id: 'DOC-003', name: 'Q2 2026 Financial Report', category: 'Finance', uploadedBy: 'Elena Rostova', date: '2026-07-10', size: '1.2 MB', type: 'XLSX', status: 'Draft', statusStyle: 'bg-[#fff7ed] text-[#ea580c]' },
    { id: 'DOC-004', name: 'Safety Compliance Checklist', category: 'Operations', uploadedBy: 'Kharim Hussain', date: '2026-07-22', size: '540 KB', type: 'DOCX', status: 'Under Review', statusStyle: 'bg-[#eff6ff] text-[#2563eb]' },
    { id: 'DOC-005', name: 'IT Infrastructure Plan', category: 'IT Systems', uploadedBy: 'Mohammed Ali', date: '2026-06-28', size: '3.6 MB', type: 'PDF', status: 'Published', statusStyle: 'bg-[#ecfdf5] text-[#10b981]' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        module="DMS"
        pageTitle="Documents & Records"
        subtitle="Centralized document library for corporate contracts, engineering specifications, and compliance records."
        taglineTop="Compliance"
        taglineBottom="Secure Archive"
        actionLabel="Upload Document"
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
          <h3 className="text-sm font-bold text-[#0f172a]">Document Library</h3>
          <div className="relative w-60"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input type="text" placeholder="Search documents..." className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb]" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
              <th className="py-3 px-4 font-medium">Doc ID</th><th className="py-3 px-4 font-medium">Document Name</th><th className="py-3 px-4 font-medium">Category</th><th className="py-3 px-4 font-medium">Uploaded By</th><th className="py-3 px-4 font-medium">Date</th><th className="py-3 px-4 font-medium">Size</th><th className="py-3 px-4 font-medium">Type</th><th className="py-3 px-4 font-medium">Status</th><th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#475569]">{d.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0f172a]">{d.name}</td>
                  <td className="py-3 px-4 text-[#475569]">{d.category}</td>
                  <td className="py-3 px-4 text-[#475569]">{d.uploadedBy}</td>
                  <td className="py-3 px-4 text-[#475569]">{d.date}</td>
                  <td className="py-3 px-4 text-[#64748b]">{d.size}</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[10px] font-semibold">{d.type}</span></td>
                  <td className="py-3 px-4"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${d.statusStyle}`}>{d.status}</span></td>
                  <td className="py-3 px-4 text-right"><div className="flex items-center justify-end gap-2"><Download className="w-3.5 h-3.5 text-[#94a3b8] hover:text-[#2563eb] cursor-pointer" /><MoreVertical className="w-4 h-4 text-[#94a3b8] hover:text-[#0f172a] cursor-pointer" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
