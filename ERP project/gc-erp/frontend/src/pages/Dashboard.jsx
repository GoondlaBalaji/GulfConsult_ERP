import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Clock,
  DollarSign,
  TrendingUp,
  Download,
  ChevronDown,
  ChevronRight,
  FolderPlus
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projectDistFilter, setProjectDistFilter] = useState('This Year');
  const [timesheetFilter, setTimesheetFilter] = useState('Last 6 Months');
  const [payrollFilter, setPayrollFilter] = useState('This Year');

  // 1. KPI Metric Cards Data
  const kpiCards = [
    {
      title: 'Total Employees',
      value: '248',
      trend: '+12 this month',
      trendColor: 'text-[#10b981]',
      hasArrow: true,
      icon: Users,
      iconBg: 'bg-[#eff6ff]',
      iconColor: 'text-[#2563eb]',
    },
    {
      title: 'Active Projects',
      value: '34',
      trend: '+5 new projects',
      trendColor: 'text-[#10b981]',
      hasArrow: true,
      icon: Briefcase,
      iconBg: 'bg-[#fffbeb]',
      iconColor: 'text-[#f59e0b]',
    },
    {
      title: 'Pending Timesheets',
      value: '14',
      trend: 'Approval required',
      trendColor: 'text-[#f97316]',
      hasArrow: true,
      icon: Clock,
      iconBg: 'bg-[#fff1f2]',
      iconColor: 'text-[#f43f5e]',
    },
    {
      title: 'Monthly Payroll',
      value: '$485,200',
      trend: 'Processed for July',
      trendColor: 'text-[#10b981]',
      hasArrow: false,
      icon: DollarSign,
      iconBg: 'bg-[#ecfdf5]',
      iconColor: 'text-[#10b981]',
    },
  ];

  // 2. Project Distribution (Donut Chart)
  const projectDistribution = [
    { name: 'Engineering', count: 10, color: '#2563eb' },
    { name: 'Operations', count: 8, color: '#ef4444' },
    { name: 'Infrastructure', count: 7, color: '#f59e0b' },
    { name: 'Commercial', count: 5, color: '#60a5fa' },
    { name: 'IT Systems', count: 4, color: '#94a3b8' },
  ];
  const totalProjects = 34;
  const donutRadius = 40;
  const circumference = 2 * Math.PI * donutRadius;
  let accumulatedPercent = 0;

  // 3. Timesheet Status (Bar Chart)
  const timesheetData = [
    { month: 'Jan', submitted: 380, pending: 100 },
    { month: 'Feb', submitted: 420, pending: 80 },
    { month: 'Mar', submitted: 540, pending: 90 },
    { month: 'Apr', submitted: 390, pending: 110 },
    { month: 'May', submitted: 260, pending: 80 },
    { month: 'Jun', submitted: 280, pending: 90 },
    { month: 'Jul', submitted: 440, pending: 110 },
  ];
  const maxTimesheetValue = 800;

  // 4. Payroll Trend (Line Chart)
  const payrollMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const payrollPoints = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 460 },
    { month: 'Mar', value: 550 },
    { month: 'Apr', value: 510 },
    { month: 'May', value: 580 },
    { month: 'Jun', value: 620 },
    { month: 'Jul', value: 720 },
  ];

  // Generate SVG path for line chart
  const chartWidth = 320;
  const chartHeight = 150;
  const paddingX = 20;
  const paddingY = 20;
  const minVal = 200;
  const maxVal = 800;

  const pointsCoordinates = payrollPoints.map((pt, i) => {
    const x = paddingX + (i / (payrollPoints.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - ((pt.value - minVal) / (maxVal - minVal)) * (chartHeight - 2 * paddingY);
    return { x, y };
  });

  const linePathD = pointsCoordinates.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );

  const areaPathD = `${linePathD} L ${pointsCoordinates[pointsCoordinates.length - 1].x},${chartHeight - paddingY} L ${pointsCoordinates[0].x},${chartHeight - paddingY} Z`;

  // 5. Upcoming Deadlines Table
  const upcomingDeadlines = [
    {
      date: 'Jul 30, 2026',
      event: 'Project Review Meeting',
      description: 'Gulf Maritime Complex Phase 2',
      status: 'Upcoming',
      statusStyle: 'bg-[#eff6ff] text-[#2563eb]',
    },
    {
      date: 'Aug 02, 2026',
      event: 'Timesheet Submission',
      description: 'For July 2026',
      status: 'Due Soon',
      statusStyle: 'bg-[#fff7ed] text-[#ea580c]',
    },
    {
      date: 'Aug 05, 2026',
      event: 'Payroll Processing',
      description: 'August 2026',
      status: 'Upcoming',
      statusStyle: 'bg-[#eff6ff] text-[#2563eb]',
    },
    {
      date: 'Aug 07, 2026',
      event: 'Quarterly Report',
      description: 'Executive Management',
      status: 'Upcoming',
      statusStyle: 'bg-[#eff6ff] text-[#2563eb]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ==================== 1. DASHBOARD HEADER WITH SIGNATURE ARCHITECTURAL WATERMARK ==================== */}
      <PageHeader
        module="Enterprise"
        pageTitle="Dashboard"
        subtitle="Monitor your organization's people, engineering projects and financial operations."
        taglineTop="Operations"
        taglineBottom="Live Intelligence"
        actionLabel="Export Report"
        actionIcon={Download}
        onAction={() => window.print()}
      />

      {/* ==================== 2. KPI METRIC CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group erp-card-interactive bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex items-center gap-4 cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-medium text-[#64748b]">{card.title}</span>
                <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight mt-0.5 leading-none">
                  {card.value}
                </h3>
                <p className={`text-[11px] font-medium flex items-center gap-1 mt-1.5 ${card.trendColor}`}>
                  {card.hasArrow && <TrendingUp className="w-3 h-3" />}
                  <span>{card.trend}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== 3. ANALYTICS ROW (3 COLUMNS) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Column 1: Project Distribution */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0f172a]">Project Distribution</h3>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#e2e8f0] text-xs text-[#475569] font-medium hover:bg-slate-50">
              <span>{projectDistFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 my-auto py-2">
            {/* Donut Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                {projectDistribution.map((item, idx) => {
                  const percent = (item.count / totalProjects) * 100;
                  const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                  accumulatedPercent += percent;

                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r={donutRadius}
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="16"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all hover:opacity-90"
                    />
                  );
                })}
              </svg>

              {/* Center hole text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-bold text-[#0f172a] leading-none">{totalProjects}</span>
                <span className="text-[10px] text-[#64748b] font-normal mt-0.5">Projects</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="flex-1 space-y-2">
              {projectDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#475569] font-medium">{item.name}</span>
                  </div>
                  <span className="text-[#0f172a] font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Timesheet Status (Bar Chart) */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0f172a]">Timesheet Status</h3>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#e2e8f0] text-xs text-[#475569] font-medium hover:bg-slate-50">
              <span>{timesheetFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>

          <div className="relative pt-2 pb-2">
            {/* Y-axis gridlines */}
            <div className="h-36 flex flex-col justify-between text-[10px] text-[#94a3b8] pr-2 border-b border-[#e2e8f0]">
              {[800, 600, 400, 200, 0].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <span className="w-6 text-right">{val}</span>
                  <div className="flex-1 border-b border-dashed border-[#f1f5f9]" />
                </div>
              ))}
            </div>

            {/* Stacked/Grouped Bars along X axis */}
            <div className="absolute inset-0 pl-10 pr-2 flex items-end justify-between pb-6 pt-1">
              {timesheetData.map((item, idx) => {
                const subHeight = (item.submitted / maxTimesheetValue) * 100;
                const pendHeight = (item.pending / maxTimesheetValue) * 100;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="flex flex-col items-center justify-end h-28 w-4">
                      {/* Pending top bar */}
                      <div
                        style={{ height: `${pendHeight}%` }}
                        className="w-3.5 bg-[#e2e8f0] rounded-t-xs"
                        title={`Pending: ${item.pending}`}
                      />
                      {/* Submitted bottom bar */}
                      <div
                        style={{ height: `${subHeight}%` }}
                        className="w-3.5 bg-[#10b981] rounded-b-xs"
                        title={`Submitted: ${item.submitted}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#64748b] font-medium">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timesheet Legend */}
          <div className="flex items-center justify-center gap-6 pt-2 border-t border-[#f1f5f9] text-xs text-[#475569] font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
              <span>Submitted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#e2e8f0]" />
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Column 3: Payroll Trend (Line Chart) */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0f172a]">Payroll Trend</h3>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#e2e8f0] text-xs text-[#475569] font-medium hover:bg-slate-50">
              <span>{payrollFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>

          <div className="relative pt-1 pb-2">
            {/* Y-axis markers */}
            <div className="h-36 flex flex-col justify-between text-[10px] text-[#94a3b8] pr-2 border-b border-[#e2e8f0]">
              {['800K', '600K', '400K', '200K'].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <span className="w-7 text-right">{val}</span>
                  <div className="flex-1 border-b border-dashed border-[#f1f5f9]" />
                </div>
              ))}
            </div>

            {/* SVG Line & Area Chart */}
            <div className="absolute inset-0 pl-10 pr-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-36">
                <defs>
                  <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area under curve */}
                <path d={areaPathD} fill="url(#payrollGradient)" />

                {/* Line */}
                <path d={linePathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

                {/* Dots at data points */}
                {pointsCoordinates.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="3.5"
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex items-center justify-between px-2 pt-1 text-[10px] text-[#64748b] font-medium">
                {payrollMonths.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 4. BOTTOM SECTION (2 COLUMNS) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Column 1: Upcoming Deadlines (Table) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0f172a]">Upcoming Deadlines</h3>
              <button
                onClick={() => navigate('/projects')}
                className="text-xs text-[#2563eb] hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6]">
                    <th className="pb-2.5 font-medium">Date</th>
                    <th className="pb-2.5 font-medium">Event</th>
                    <th className="pb-2.5 font-medium">Description</th>
                    <th className="pb-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8fafc]">
                  {upcomingDeadlines.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 text-[#0f172a] font-medium whitespace-nowrap">{item.date}</td>
                      <td className="py-3 font-semibold text-[#0f172a]">{item.event}</td>
                      <td className="py-3 text-[#64748b]">{item.description}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${item.statusStyle}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Actions (2x2 Grid) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-4">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Add Employee */}
              <button
                onClick={() => navigate('/new-joiners')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#e5e7eb] hover:border-[#2563eb] hover:bg-[#eff6ff]/30 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a]">Add Employee</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#2563eb] transition-colors" />
              </button>

              {/* Create Project */}
              <button
                onClick={() => navigate('/projects')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#e5e7eb] hover:border-[#10b981] hover:bg-[#ecfdf5]/30 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] text-[#10b981] flex items-center justify-center">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a]">Create Project</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#10b981] transition-colors" />
              </button>

              {/* Approve Timesheets */}
              <button
                onClick={() => navigate('/timesheets')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#e5e7eb] hover:border-[#8b5cf6] hover:bg-[#f5f3ff]/30 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#f5f3ff] text-[#8b5cf6] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a]">Approve Timesheets</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors" />
              </button>

              {/* Process Payroll */}
              <button
                onClick={() => navigate('/payroll')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#e5e7eb] hover:border-[#10b981] hover:bg-[#ecfdf5]/30 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] text-[#10b981] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a]">Process Payroll</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#10b981] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
