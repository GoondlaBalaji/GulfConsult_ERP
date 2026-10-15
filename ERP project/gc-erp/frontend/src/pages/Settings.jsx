import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Building, 
  ShieldCheck, 
  Globe, 
  GraduationCap, 
  Plus, 
  Search, 
  Download, 
  CheckCircle2, 
  Edit2, 
  MoreVertical,
  SlidersHorizontal,
  Layers,
  Save
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import FlagIcon from '../components/common/FlagIcon';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Company');
  const [searchTerm, setSearchTerm] = useState('');

  const metricCards = [
    { 
      label: 'Registered Company Entities', 
      value: '3', 
      trend: 'Kuwait HQ & Regional Offices', 
      icon: Building,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Active Nationality Codes', 
      value: '42', 
      trend: 'Standard ISO 3166-1', 
      icon: Globe,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      label: 'Configured Leave Types', 
      value: '8', 
      trend: 'Kuwait Labor Law compliant', 
      icon: ShieldCheck,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      label: 'Education Qualifications', 
      value: '12', 
      trend: 'ABET & Engineering certified', 
      icon: GraduationCap,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  const companyList = [
    { code: 'CMP-001', name: 'Gulf Consult Kuwait W.L.L.', regNo: 'CR-104928', country: 'State of Kuwait', city: 'Kuwait City', status: 'Primary HQ' },
    { code: 'CMP-002', name: 'Gulf Consult Engineering UAE Branch', regNo: 'DXB-582910', country: 'United Arab Emirates', city: 'Dubai', status: 'Branch' },
    { code: 'CMP-003', name: 'Gulf Consult Infrastructure Bahrain', regNo: 'BH-49021', country: 'Kingdom of Bahrain', city: 'Manama', status: 'Branch' },
  ];

  const nationalityList = [
    { code: 'NAT-KWT', name: 'Kuwaiti', iso: 'KWT', region: 'GCC', quota: 'Priority 1 (National)' },
    { code: 'NAT-IND', name: 'Indian', iso: 'IND', region: 'South Asia', quota: 'Technical & Engineering' },
    { code: 'NAT-EGY', name: 'Egyptian', iso: 'EGY', region: 'MENA', quota: 'Consulting & Legal' },
    { code: 'NAT-JOR', name: 'Jordanian', iso: 'JOR', region: 'MENA', quota: 'Project Engineering' },
    { code: 'NAT-PHL', name: 'Filipino', iso: 'PHL', region: 'Southeast Asia', quota: 'CAD/BIM & Site Administration' },
    { code: 'NAT-GBR', name: 'British', iso: 'GBR', region: 'Europe', quota: 'Senior Architectural Lead' },
    { code: 'NAT-USA', name: 'American', iso: 'USA', region: 'North America', quota: 'Specialist Advisory' },
  ];

  const leaveTypesList = [
    { code: 'LV-ANN', name: 'Annual Paid Leave', days: '30 Days / Year', carryOver: 'Max 15 days', type: 'Paid', law: 'Article 70, Kuwait Labor Law' },
    { code: 'LV-SCK', name: 'Sick Medical Leave', days: '15 Days Full / 10 Half', carryOver: 'No', type: 'Paid / Tiered', law: 'Article 69, Kuwait Labor Law' },
    { code: 'LV-HAJ', name: 'Hajj Pilgrimage Leave', days: '21 Days (Once)', carryOver: 'No', type: 'Paid (Special)', law: 'Article 76, Kuwait Labor Law' },
    { code: 'LV-MAT', name: 'Maternity Leave', days: '70 Days', carryOver: 'No', type: 'Paid', law: 'Article 24, Kuwait Labor Law' },
    { code: 'LV-BER', name: 'Bereavement Compassionate', days: '3 Days', carryOver: 'No', type: 'Paid', law: 'Company Policy Standard' },
    { code: 'LV-UNP', name: 'Unpaid Extended Leave', days: 'Subject to Approval', carryOver: 'No', type: 'Unpaid', law: 'Management Discretion' },
  ];

  const educationList = [
    { code: 'EDU-PHD', degree: 'Doctor of Philosophy (PhD) in Engineering', level: 'Postgraduate Level 8', field: 'Structural / Geotechnical' },
    { code: 'EDU-MSC', degree: 'Master of Science (M.Sc.) in Civil Engineering', level: 'Postgraduate Level 7', field: 'Infrastructure Planning' },
    { code: 'EDU-MARCH', degree: 'Master of Architecture (M.Arch)', level: 'Postgraduate Level 7', field: 'Architectural Urban Design' },
    { code: 'EDU-BSC', degree: 'Bachelor of Science (B.Sc.) in Engineering', level: 'Undergraduate Level 6', field: 'Civil / Mechanical / Electrical' },
    { code: 'EDU-DIP', degree: 'Higher National Diploma (HND)', level: 'Diploma Level 5', field: 'Surveying & CAD Drafting' },
  ];

  return (
    <div className="space-y-6">
      {/* Header section with signature building line-art watermark */}
      <PageHeader
        module="Settings"
        pageTitle="System Settings & Master Configuration"
        subtitle="Global Administration &bull; Setup Company Master, Nationalities, Leave Allowances, and Qualification Codes."
        taglineTop="Enterprise"
        taglineBottom="Core Setup"
        actionLabel="Add Master Record"
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
                  <span className="text-[11px] font-medium text-slate-600">
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'Company', label: 'Company Master (Gen_Company)', icon: Building },
          { id: 'Nationalities', label: 'Nationalities (gen_nationality)', icon: Globe },
          { id: 'LeaveTypes', label: 'Leave Types (Gen_LeaveTypes)', icon: ShieldCheck },
          { id: 'Education', label: 'Education Master (Gen_Education)', icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Company Master */}
      {activeTab === 'Company' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Registered Legal Entities & Subsidiaries</h3>
            <span className="text-xs text-slate-500 font-mono">Table: Gen_Company</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Entity Code</th>
                <th className="py-3 px-4">Company Legal Name</th>
                <th className="py-3 px-4">Commercial Reg. (CR)</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Headquarters City</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companyList.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600">{c.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{c.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{c.regNo}</td>
                  <td className="py-3.5 px-4 text-slate-700">{c.country}</td>
                  <td className="py-3.5 px-4 text-slate-600">{c.city}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Nationalities */}
      {activeTab === 'Nationalities' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Nationalities & ISO Country Reference</h3>
            <span className="text-xs text-slate-500 font-mono">Table: gen_nationality</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Nat Code</th>
                <th className="py-3 px-4">Nationality Label</th>
                <th className="py-3 px-4">ISO 3-Letter</th>
                <th className="py-3 px-4">Geographic Region</th>
                <th className="py-3 px-4">Labor Quota Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {nationalityList.map((n) => (
                <tr key={n.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-emerald-600">{n.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <FlagIcon country={n.iso} />
                      <span>{n.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{n.iso}</td>
                  <td className="py-3.5 px-4 text-slate-700">{n.region}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {n.quota}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Leave Types */}
      {activeTab === 'LeaveTypes' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Leave Policies & Statutory Allowances</h3>
            <span className="text-xs text-slate-500 font-mono">Table: Gen_LeaveTypes</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Leave Code</th>
                <th className="py-3 px-4">Leave Type Name</th>
                <th className="py-3 px-4">Default Allocation</th>
                <th className="py-3 px-4">Annual Carry Over</th>
                <th className="py-3 px-4">Payment Structure</th>
                <th className="py-3 px-4">Governing Regulation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaveTypesList.map((l) => (
                <tr key={l.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-indigo-600">{l.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{l.name}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{l.days}</td>
                  <td className="py-3.5 px-4 text-slate-600">{l.carryOver}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {l.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">{l.law}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Education Master */}
      {activeTab === 'Education' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Education Levels & Professional Qualifications</h3>
            <span className="text-xs text-slate-500 font-mono">Table: Gen_Education</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Degree Code</th>
                <th className="py-3 px-4">Official Degree Title</th>
                <th className="py-3 px-4">Academic Level</th>
                <th className="py-3 px-4">Engineering Discipline</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {educationList.map((e) => (
                <tr key={e.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-purple-600">{e.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{e.degree}</td>
                  <td className="py-3.5 px-4 text-slate-700">{e.level}</td>
                  <td className="py-3.5 px-4 text-slate-600">{e.field}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
