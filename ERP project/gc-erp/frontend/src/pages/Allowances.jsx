import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronDown, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Edit2,
  Trash2,
  SlidersHorizontal
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Allowances() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const metricCards = [
    { 
      label: 'Active Allowance Types', 
      value: '14', 
      trend: '+2 added this quarter', 
      isPositive: true,
      icon: Receipt,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Monthly Allowance Volume', 
      value: '$94,350', 
      trend: '+3.4% vs last cycle', 
      isPositive: true,
      icon: DollarSign,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      label: 'Avg Allowance / Employee', 
      value: '$380.44', 
      trend: 'Across 248 active staff', 
      isPositive: true,
      icon: TrendingUp,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      label: 'Pending Approval Changes', 
      value: '2', 
      trend: 'Requires HR Director sign-off', 
      isPositive: false,
      icon: AlertCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  const allowancesData = [
    { 
      code: 'ALLW-001', 
      name: 'Housing & Accommodation', 
      category: 'Fixed Monthly', 
      taxable: 'Exempt', 
      amount: '$1,200.00', 
      grade: 'Grade 5 & Above (Senior/Lead)', 
      applicableCount: 42,
      status: 'Active' 
    },
    { 
      code: 'ALLW-002', 
      name: 'Executive Transport & Fuel', 
      category: 'Fixed Monthly', 
      taxable: 'Exempt', 
      amount: '$450.00', 
      grade: 'All Engineers & Field Consultants', 
      applicableCount: 88,
      status: 'Active' 
    },
    { 
      code: 'ALLW-003', 
      name: 'Mobile Telecommunications', 
      category: 'Fixed Monthly', 
      taxable: 'Exempt', 
      amount: '$150.00', 
      grade: 'Site Supervision & Project Managers', 
      applicableCount: 65,
      status: 'Active' 
    },
    { 
      code: 'ALLW-004', 
      name: 'Offshore Site Hardship Allowance', 
      category: 'Project-Specific', 
      taxable: 'Taxable', 
      amount: '$850.00', 
      grade: 'Offshore Maritime Engineers', 
      applicableCount: 19,
      status: 'Active' 
    },
    { 
      code: 'ALLW-005', 
      name: 'Food & Daily Sustenance Subsidy', 
      category: 'Fixed Monthly', 
      taxable: 'Exempt', 
      amount: '$220.00', 
      grade: 'Junior & Technical Site Staff', 
      applicableCount: 54,
      status: 'Active' 
    },
    { 
      code: 'ALLW-006', 
      name: 'Professional Engineering Certification', 
      category: 'Skill-Based', 
      taxable: 'Taxable', 
      amount: '$300.00', 
      grade: 'PE / PMP Licensed Consultants', 
      applicableCount: 28,
      status: 'Active' 
    },
    { 
      code: 'ALLW-007', 
      name: 'High-Altitude Inspection Hazard', 
      category: 'Project-Specific', 
      taxable: 'Exempt', 
      amount: '$500.00', 
      grade: 'Tower & Façade Inspectors', 
      applicableCount: 12,
      status: 'Under Review' 
    },
  ];

  const filteredData = allowancesData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="Payroll"
        pageTitle="Allowance Master Setup"
        subtitle="Master configuration for recurring benefits, site allowances, and employee compensation packages."
        taglineTop="Benefits"
        taglineBottom="Value People"
        actionLabel="Add Allowance Type"
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
              placeholder="Search allowances by code, name, or eligible grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Category:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Fixed Monthly">Fixed Monthly</option>
              <option value="Project-Specific">Project-Specific</option>
              <option value="Skill-Based">Skill-Based</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
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
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Allowance Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Taxability</th>
                <th className="py-3 px-4">Standard Amount</th>
                <th className="py-3 px-4">Target Eligibility</th>
                <th className="py-3 px-4">Active Staff</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600">
                    {item.code}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-medium ${item.taxable === 'Exempt' ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {item.taxable}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.amount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {item.grade}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {item.applicableCount} emp
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                      item.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors" title="Edit Allowance">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-xs text-slate-400">
                    No allowance records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredData.length}</span> of <span className="font-semibold text-slate-700">{allowancesData.length}</span> allowance records
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
