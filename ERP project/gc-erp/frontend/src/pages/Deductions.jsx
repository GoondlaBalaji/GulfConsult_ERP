import React, { useState } from 'react';
import { 
  MinusCircle, 
  Plus, 
  Search, 
  Download, 
  MoreVertical, 
  DollarSign, 
  TrendingDown, 
  ShieldAlert, 
  Landmark,
  Edit2,
  SlidersHorizontal
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Deductions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const metricCards = [
    { 
      label: 'Active Deduction Codes', 
      value: '9', 
      trend: '4 Statutory / 5 Voluntary', 
      isPositive: true,
      icon: MinusCircle,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600'
    },
    { 
      label: 'July Withholding Total', 
      value: '$38,420', 
      trend: '-1.8% vs June cycle', 
      isPositive: true,
      icon: DollarSign,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'PIFSS Social Insurance', 
      value: '$21,150', 
      trend: 'Remitted to Public Institution', 
      isPositive: true,
      icon: Landmark,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      label: 'Active Staff Loan Balance', 
      value: '$42,600', 
      trend: '18 active amortizations', 
      isPositive: false,
      icon: TrendingDown,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  const deductionsData = [
    { 
      code: 'DED-001', 
      name: 'PIFSS Social Insurance (Employee Share)', 
      category: 'Statutory', 
      calcType: '10.5% Basic + Allowance', 
      amount: '$350.00 avg', 
      beneficiary: 'PIFSS Kuwait Authority', 
      activeCount: 114,
      status: 'Active' 
    },
    { 
      code: 'DED-002', 
      name: 'Staff Housing Advance Loan Amortization', 
      category: 'Loan Repayment', 
      calcType: 'Fixed Monthly Installment', 
      amount: '$250.00', 
      beneficiary: 'Gulf Consult Treasury', 
      activeCount: 12,
      status: 'Active' 
    },
    { 
      code: 'DED-003', 
      name: 'Comprehensive Health Insurance Premium', 
      category: 'Insurance', 
      calcType: 'Fixed Tiered Dependent', 
      amount: '$75.00', 
      beneficiary: 'Gulf Insurance Group (GIG)', 
      activeCount: 182,
      status: 'Active' 
    },
    { 
      code: 'DED-004', 
      name: 'Unexcused Absence & Lateness Penalty', 
      category: 'Disciplinary', 
      calcType: 'Hourly Prorated Rate', 
      amount: 'Variable', 
      beneficiary: 'Payroll Retention', 
      activeCount: 6,
      status: 'Active' 
    },
    { 
      code: 'DED-005', 
      name: 'Company Vehicle Traffic Violation Recovery', 
      category: 'Recovery', 
      calcType: 'Fine Exact Match', 
      amount: 'Variable ($50 - $150)', 
      beneficiary: 'Ministry of Interior Kuwait', 
      activeCount: 4,
      status: 'Active' 
    },
    { 
      code: 'DED-006', 
      name: 'Voluntary Provident / Savings Contribution', 
      category: 'Voluntary', 
      calcType: '5.0% Basic Salary', 
      amount: '$180.00 avg', 
      beneficiary: 'Employee Retirement Trust', 
      activeCount: 48,
      status: 'Active' 
    },
    { 
      code: 'DED-007', 
      name: 'Emergency Advance Relocation Balance', 
      category: 'Loan Repayment', 
      calcType: 'Monthly Amortized (6 Mo)', 
      amount: '$300.00', 
      beneficiary: 'Gulf Consult Treasury', 
      activeCount: 3,
      status: 'Active' 
    },
  ];

  const filteredData = deductionsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.beneficiary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="Payroll"
        pageTitle="Deductions Master Setup"
        subtitle="Master configuration for salary withholdings, statutory insurance, staff loans, and disciplinary recoveries."
        taglineTop="Integrity"
        taglineBottom="Balance Accounts"
        actionLabel="Add Deduction Type"
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
                  <span className={`text-[11px] font-medium ${card.isPositive ? 'text-slate-600' : 'text-amber-600'}`}>
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
              placeholder="Search deductions by code, name, or beneficiary..."
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
              <option value="Statutory">Statutory</option>
              <option value="Loan Repayment">Loan Repayment</option>
              <option value="Insurance">Insurance</option>
              <option value="Disciplinary">Disciplinary</option>
              <option value="Voluntary">Voluntary</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
                <th className="py-3 px-4">Deduction Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Calculation Method</th>
                <th className="py-3 px-4">Standard Rate / Amount</th>
                <th className="py-3 px-4">Remittance Beneficiary</th>
                <th className="py-3 px-4">Enrolled Staff</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-rose-600">
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
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                    {item.calcType}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.amount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.beneficiary}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {item.activeCount} staff
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors" title="Edit Deduction">
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
                    No deduction records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredData.length}</span> of <span className="font-semibold text-slate-700">{deductionsData.length}</span> deduction records
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
