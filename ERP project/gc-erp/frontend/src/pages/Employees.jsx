import React, { useState } from 'react';
import {
  Users,
  Building2,
  UserPlus,
  Clock,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Mail,
  Phone,
  MoreVertical,
  Plus,
  Download,
  CheckSquare,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import FlagIcon from '../components/common/FlagIcon';

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedTitle, setSelectedTitle] = useState('All Job Titles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [selectedRows, setSelectedRows] = useState([]);

  // Metric Cards Data
  const metricCards = [
    {
      value: '248',
      label: 'Total Employees',
      trend: '+12 this month',
      trendPositive: true,
      icon: Users,
      iconBg: 'bg-[#ecfdf5]',
      iconColor: 'text-[#10b981]',
      sparkColor: '#10b981',
      sparkPath: 'M 0,22 Q 15,18 30,24 T 60,12 T 90,8',
    },
    {
      value: '12',
      label: 'Departments',
      trend: '+1 new department',
      trendPositive: true,
      icon: Building2,
      iconBg: 'bg-[#eff6ff]',
      iconColor: 'text-[#2563eb]',
      sparkColor: '#2563eb',
      sparkPath: 'M 0,20 Q 20,22 40,16 T 70,14 T 90,6',
    },
    {
      value: '18',
      label: 'New Joiners (This Year)',
      trend: '+5 since last quarter',
      trendPositive: true,
      icon: UserPlus,
      iconBg: 'bg-[#eff6ff]',
      iconColor: 'text-[#2563eb]',
      sparkColor: '#2563eb',
      sparkPath: 'M 0,24 Q 25,24 45,18 T 75,10 T 90,6',
    },
    {
      value: '6',
      label: 'Onboarding',
      trend: 'In progress ✓',
      trendPositive: false,
      icon: Clock,
      iconBg: 'bg-[#fffbeb]',
      iconColor: 'text-[#f59e0b]',
      sparkColor: '#f59e0b',
      sparkPath: 'M 0,18 Q 20,8 40,20 T 70,6 T 90,14',
    },
  ];

  // Employee Directory Data matching reference image
  const employeesData = [
    {
      id: 'EMP-1001',
      name: 'Goondla Balaji',
      avatar: 'GB',
      avatarBg: 'bg-[#eff6ff] text-[#2563eb]',
      title: 'Senior Full Stack Architect',
      dept: 'Software Engineering',
      email: 'admin@gulfconsult.com',
      phone: '+965 9000 1122',
      nationality: 'Indian',
      flag: '🇮🇳',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2024-01-15',
    },
    {
      id: 'EMP-1002',
      name: 'Fatima Al-Mansoor',
      avatar: 'FM',
      avatarBg: 'bg-[#ffe4e6] text-[#e11d48]',
      title: 'HR Manager',
      dept: 'Human Resources',
      email: 'fatima.hrms@gulfconsult.com',
      phone: '+965 9111 2233',
      nationality: 'Kuwaiti',
      flag: '🇰🇼',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2023-09-01',
    },
    {
      id: 'EMP-1003',
      name: 'Tariq Rashid',
      avatar: 'TR',
      avatarBg: 'bg-[#ecfdf5] text-[#059669]',
      title: 'Project Manager',
      dept: 'Engineering & Operations',
      email: 'tariq.pm@gulfconsult.com',
      phone: '+965 9222 3344',
      nationality: 'Jordanian',
      flag: '🇯🇴',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2023-06-20',
    },
    {
      id: 'EMP-1004',
      name: 'Sarah Jenkins',
      avatar: 'SJ',
      avatarBg: 'bg-[#f3e8ff] text-[#9333ea]',
      title: 'HR Coordinator',
      dept: 'Human Resources',
      email: 'sarah.j@gulfconsult.com',
      phone: '+965 9333 4455',
      nationality: 'British',
      flag: '🇬🇧',
      status: 'Onboarding',
      statusStyle: 'bg-[#fff7ed] text-[#ea580c]',
      joiningDate: '2026-07-25',
    },
    {
      id: 'EMP-1005',
      name: 'Kharim Hussain',
      avatar: 'KH',
      avatarBg: 'bg-[#ecfdf5] text-[#16a34a]',
      title: 'Site Supervisor',
      dept: 'Construction Operations',
      email: 'kharim.h@gulfconsult.com',
      phone: '+965 9444 5566',
      nationality: 'Egyptian',
      flag: '🇪🇬',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2022-11-10',
    },
    {
      id: 'EMP-1006',
      name: 'Elena Rostova',
      avatar: 'ER',
      avatarBg: 'bg-[#fce7f3] text-[#db2777]',
      title: 'Financial Analyst',
      dept: 'Finance & Payroll',
      email: 'elena.f@gulfconsult.com',
      phone: '+965 9555 6677',
      nationality: 'Russian',
      flag: '🇷🇺',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2023-03-18',
    },
    {
      id: 'EMP-1007',
      name: 'Mohammed Ali',
      avatar: 'MA',
      avatarBg: 'bg-[#e0f2fe] text-[#0284c7]',
      title: 'IT Support Engineer',
      dept: 'IT Systems',
      email: 'mohammed.it@gulfconsult.com',
      phone: '+965 9566 7788',
      nationality: 'Saudi Arabian',
      flag: '🇸🇦',
      status: 'Inactive',
      statusStyle: 'bg-[#f1f5f9] text-[#64748b]',
      joiningDate: '2021-08-05',
    },
    {
      id: 'EMP-1008',
      name: 'Layla Rahman',
      avatar: 'LR',
      avatarBg: 'bg-[#f3e8ff] text-[#7c3aed]',
      title: 'Document Controller',
      dept: 'Administration',
      email: 'layla.dms@gulfconsult.com',
      phone: '+965 9777 8899',
      nationality: 'Indian',
      flag: '🇮🇳',
      status: 'Active',
      statusStyle: 'bg-[#ecfdf5] text-[#10b981]',
      joiningDate: '2024-02-12',
    },
  ];

  // Checkbox toggle
  const toggleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === employeesData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employeesData.map((e) => e.id));
    }
  };

  // Filter logic
  const filteredEmployees = employeesData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dept.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || emp.dept === selectedDept;
    const matchesStatus = selectedStatus === 'All Status' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ==================== 1. BREADCRUMB & HEADER WITH ARCHITECTURAL WATERMARK ==================== */}
      <PageHeader
        module="HRMS"
        pageTitle="Employees"
        subtitle="Manage your organization's employee directory and workforce information."
        taglineTop="People"
        taglineBottom="Build Progress"
        actionLabel="Add Employee"
      />

      {/* ==================== 2. METRIC SUMMARY CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group erp-card-interactive bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-xs flex items-center justify-between cursor-default"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight leading-none">
                    {card.value}
                  </h3>
                  <p className="text-xs font-medium text-[#64748b] mt-1">{card.label}</p>
                  <p
                    className={`text-[11px] font-medium mt-1 flex items-center gap-1 ${
                      card.trendPositive ? 'text-[#10b981]' : 'text-[#64748b]'
                    }`}
                  >
                    <span>{card.trend}</span>
                  </p>
                </div>
              </div>

              {/* Sparkline curve */}
              <div className="w-20 h-8 shrink-0 overflow-hidden">
                <svg viewBox="0 0 90 28" className="w-full h-full fill-none transition-transform duration-300 group-hover:scale-105">
                  <path
                    d={card.sparkPath}
                    stroke={card.sparkColor}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== 3. SEARCH & FILTER TOOLBAR ==================== */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-3 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by employee name, ID, department..."
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all duration-200"
          />
        </div>

        {/* Filter Dropdown 1: Department */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-[#64748b] mb-0.5">Department</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white transition-all duration-150">
            <span>{selectedDept}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
          </button>
        </div>

        {/* Filter Dropdown 2: Job Title */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-[#64748b] mb-0.5">Job Title</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white transition-all duration-150">
            <span>{selectedTitle}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
          </button>
        </div>

        {/* Filter Dropdown 3: Status */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-[#64748b] mb-0.5">Status</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white transition-all duration-150">
            <span>{selectedStatus}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
          </button>
        </div>

        {/* Filter Dropdown 4: Location */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-[#64748b] mb-0.5">Location</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white transition-all duration-150">
            <span>{selectedLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
          </button>
        </div>

        {/* More Filters button */}
        <div className="self-end pb-0.5">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white shadow-xs transition-all duration-150 active:scale-98">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748b]" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* ==================== 4. EMPLOYEE DATA TABLE ==================== */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {/* Sub-header above table */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eef2f6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center text-[#64748b]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a] leading-tight">248 Employees</h3>
              <p className="text-xs text-[#64748b]">Complete list of employees in the organization.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher: List & Grid */}
            <div className="flex items-center border border-[#e2e8f0] rounded-lg p-0.5 bg-white">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'table' ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid' ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Export button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-xs text-[#0f172a] font-medium bg-white">
              <Download className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
            </button>

            {/* Bulk Actions button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-xs text-[#64748b] font-medium bg-white">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Bulk Actions</span>
            </button>

            {/* More options button */}
            <button className="p-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#64748b]">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] font-medium text-[#64748b] border-b border-[#eef2f6] bg-[#fcfdfe]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === employeesData.length}
                    onChange={toggleSelectAll}
                    className="rounded border-[#cbd5e1] text-[#2563eb] focus:ring-[#2563eb]"
                  />
                </th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Employee ID</span>
                    <ArrowUpDown className="w-3 h-3 text-[#94a3b8]" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium whitespace-nowrap">Employee Name</th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Job Title</span>
                    <span className="text-[#2563eb] text-[10px]">*</span>
                  </div>
                </th>
                <th className="py-3 px-4 font-medium whitespace-nowrap">Department</th>
                <th className="py-3 px-4 font-medium whitespace-nowrap">Contact</th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Nationality</span>
                    <ArrowUpDown className="w-3 h-3 text-[#94a3b8]" />
                  </div>
                </th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-[#94a3b8]" />
                  </div>
                </th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Joining Date</span>
                    <ArrowUpDown className="w-3 h-3 text-[#94a3b8]" />
                  </div>
                </th>
                <th className="py-3 px-3 font-medium text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {filteredEmployees.map((emp) => {
                const isSelected = selectedRows.includes(emp.id);
                return (
                  <tr
                    key={emp.id}
                    className={`hover:bg-[#f8fafc] transition-colors ${
                      isSelected ? 'bg-[#eff6ff]/40' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRowSelect(emp.id)}
                        className="rounded border-[#cbd5e1] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                    </td>

                    {/* Employee ID */}
                    <td className="py-3 px-3 font-mono font-medium text-[#475569] whitespace-nowrap">
                      {emp.id}
                    </td>

                    {/* Employee Name & Avatar */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full ${emp.avatarBg} font-bold flex items-center justify-center text-[10px] shrink-0`}
                        >
                          {emp.avatar}
                        </div>
                        <span className="font-semibold text-[#0f172a]">{emp.name}</span>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-3 px-3 text-[#475569] whitespace-nowrap">{emp.title}</td>

                    {/* Department */}
                    <td className="py-3 px-4 text-[#475569] whitespace-nowrap">{emp.dept}</td>

                    {/* Contact (Email & Phone) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#475569]">
                          <Mail className="w-3 h-3 text-[#94a3b8]" />
                          <span>{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#64748b]">
                          <Phone className="w-3 h-3 text-[#94a3b8]" />
                          <span>{emp.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Nationality */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-[#475569]">
                        <FlagIcon country={emp.nationality} />
                        <span className="font-medium text-xs">{emp.nationality}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${emp.statusStyle}`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* Joining Date */}
                    <td className="py-3 px-3 text-[#475569] whitespace-nowrap">{emp.joiningDate}</td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap text-[#94a3b8] hover:text-[#0f172a] cursor-pointer">
                      <MoreVertical className="w-4 h-4 ml-auto" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3.5 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#eef2f6] text-xs text-[#64748b]">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#e2e8f0] text-xs font-medium text-[#0f172a]">
              <span>10</span>
              <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <span>Showing 1-10 of 248</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-[#e2e8f0] hover:bg-slate-50 text-[#94a3b8] hover:text-[#0f172a]">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 rounded bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-[#64748b] text-xs flex items-center justify-center">
                2
              </button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-[#64748b] text-xs flex items-center justify-center">
                3
              </button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-[#64748b] text-xs flex items-center justify-center">
                4
              </button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-[#64748b] text-xs flex items-center justify-center">
                5
              </button>
              <span className="text-[#94a3b8] px-0.5">...</span>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-[#64748b] text-xs flex items-center justify-center">
                25
              </button>
              <button className="p-1 rounded border border-[#e2e8f0] hover:bg-slate-50 text-[#64748b] hover:text-[#0f172a]">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
