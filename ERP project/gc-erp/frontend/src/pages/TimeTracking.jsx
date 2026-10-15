import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Search, 
  Download, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  TrendingUp, 
  MoreVertical,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function TimeTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const metricCards = [
    { 
      label: 'Hours Logged This Week', 
      value: '1,842 hrs', 
      trend: '+6.8% vs last week', 
      isPositive: true,
      icon: Clock,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Billable Utilization Rate', 
      value: '88.4%', 
      trend: '+3.4% above target (85%)', 
      isPositive: true,
      icon: TrendingUp,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      label: 'Site Overtime Recorded', 
      value: '142 hrs', 
      trend: 'Inspection & night concrete pours', 
      isPositive: true,
      icon: Calendar,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      label: 'Logged Staff Today', 
      value: '68 / 72', 
      trend: '4 pending end-of-day submission', 
      isPositive: false,
      icon: AlertCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  const tracksData = [
    { 
      id: 'TRK-1048', 
      empName: 'Goondla Balaji', 
      empCode: 'GC-1001', 
      role: 'Principal Systems Architect',
      project: 'Gulf Maritime Complex Phase 2', 
      date: '2026-07-29', 
      hours: '8.5', 
      billable: 'Billable',
      status: 'Approved',
      task: 'React 19 Frontend architecture & modular enterprise dashboard router setup' 
    },
    { 
      id: 'TRK-1047', 
      empName: 'Tariq Rashid', 
      empCode: 'GC-1044', 
      role: 'Senior Structural Engineer',
      project: 'Al-Farwaniya Infrastructure Upgrade', 
      date: '2026-07-29', 
      hours: '7.0', 
      billable: 'Billable',
      status: 'Approved',
      task: 'On-site engineering inspection, rebar scanning, and soil load verification' 
    },
    { 
      id: 'TRK-1046', 
      empName: 'Fatima Al-Mansoor', 
      empCode: 'GC-1082', 
      role: 'MEP Project Director',
      project: 'Kuwait New Metro Line A', 
      date: '2026-07-29', 
      hours: '8.0', 
      billable: 'Billable',
      status: 'Pending',
      task: 'HVAC tunnel ventilation simulation analysis and stakeholder review meeting' 
    },
    { 
      id: 'TRK-1045', 
      empName: 'Ahmad Khaldoun', 
      empCode: 'GC-1102', 
      role: 'Civil Project Manager',
      project: 'Sabah Al-Salem University Campus', 
      date: '2026-07-28', 
      hours: '6.5', 
      billable: 'Billable',
      status: 'Approved',
      task: 'Contractor subcontractor invoice quantity takeoff and civil progress signoff' 
    },
    { 
      id: 'TRK-1044', 
      empName: 'Nadia El-Sayed', 
      empCode: 'GC-1150', 
      role: 'Lead Architect',
      project: 'Corporate Headquarters Modernization', 
      date: '2026-07-28', 
      hours: '5.0', 
      billable: 'Non-Billable',
      status: 'Approved',
      task: 'Internal GC BIM standards workshop and Revit parametric family training' 
    },
    { 
      id: 'TRK-1043', 
      empName: 'Kareem Mansour', 
      empCode: 'GC-1192', 
      role: 'Site Safety Officer',
      project: 'Gulf Maritime Complex Phase 2', 
      date: '2026-07-28', 
      hours: '9.0', 
      billable: 'Billable',
      status: 'Approved',
      task: 'Night shift crane lifting permit inspection and marine piling safety protocol audit' 
    },
  ];

  const filteredData = tracksData.filter(item => {
    const matchesSearch = item.empName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'All' || item.project === projectFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="TSMS"
        pageTitle="Time Tracking & Task Logs"
        subtitle="Project-wise task logs, on-site supervision hours, and consultant billable timesheets."
        taglineTop="Efficiency"
        taglineBottom="Track Progress"
        actionLabel="Log Time Entry"
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
                  <span className={`text-[11px] font-medium ${card.isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
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
              placeholder="Search by engineer, project, code or task description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Project:</span>
            </div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Projects</option>
              <option value="Gulf Maritime Complex Phase 2">Gulf Maritime Complex Phase 2</option>
              <option value="Al-Farwaniya Infrastructure Upgrade">Al-Farwaniya Infrastructure Upgrade</option>
              <option value="Kuwait New Metro Line A">Kuwait New Metro Line A</option>
              <option value="Sabah Al-Salem University Campus">Sabah Al-Salem University Campus</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
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
                <th className="py-3 px-4">Track ID</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Task Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        {item.empName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{item.empName}</div>
                        <div className="text-[10px] text-slate-400">{item.empCode} &bull; {item.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-700">{item.project}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      {item.hours} hrs
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      item.billable === 'Billable' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.billable}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={item.task}>
                    {item.task}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                      item.status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-xs text-slate-400">
                    No time tracking entries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredData.length}</span> of <span className="font-semibold text-slate-700">{tracksData.length}</span> logged entries
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
