import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import ArchitecturalBuilding from './ArchitecturalBuilding';

/**
 * PageHeader
 * Unified enterprise page header banner that blends cleanly and seamlessly into the page background.
 * Features:
 * - Seamless background blending (no harsh card container or borders)
 * - Signature multi-building architectural skyline watermark (including the large high-rise tower)
 * - Module breadcrumbs, enterprise page title & description
 * - Underlined KPI status tagline, primary action button, and action menu
 */
export default function PageHeader({
  module = 'HRMS',
  pageTitle = 'Employees',
  subtitle = "Manage your organization's employee directory and workforce information.",
  taglineTop = 'People',
  taglineBottom = 'Build Progress',
  actionLabel = 'Add Employee',
  onAction,
  actionIcon: ActionIcon = Plus,
  showAction = true,
  extraRightContent
}) {
  return (
    <div className="relative pt-2 pb-3 px-0.5 min-h-[110px] sm:min-h-[125px] flex flex-col justify-center animate-erp-in">
      {/* Signature Architectural Building Skyline Watermark (Blends seamlessly with background) */}
      <div className="absolute right-16 sm:right-28 lg:right-36 bottom-0 pointer-events-none hidden md:block select-none z-0">
        <ArchitecturalBuilding className="w-[480px] lg:w-[580px] xl:w-[660px] h-[120px] sm:h-[135px] lg:h-[150px] opacity-90 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        {/* Left Side: Module Breadcrumb, Title & Description */}
        <div className="max-w-xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748b] mb-1 font-medium">
            <span>{module}</span>
            <span>&gt;</span>
            <span className="text-[#0f172a] font-semibold">{pageTitle}</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0b132b] tracking-tight leading-tight">
            {pageTitle}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
            {subtitle}
          </p>
        </div>

        {/* Right Side: Tagline + Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Tagline with subtle underline matching reference design */}
          {taglineTop && (
            <div className="text-left hidden lg:block shrink-0 pr-1">
              <p className="text-xs font-medium text-[#64748b] leading-tight">{taglineTop}</p>
              <p className="text-xs font-bold text-[#0f172a] leading-tight">{taglineBottom}</p>
              <div className="w-6 h-[1.5px] bg-[#64748b] mt-1 rounded-full" />
            </div>
          )}

          {/* Action Buttons (Stacked top and bottom cleanly) */}
          <div className="flex flex-col gap-1.5 shrink-0">
            {/* Primary Action Button */}
            {showAction && actionLabel && (
              <button
                onClick={onAction}
                className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 active:translate-y-0 active:scale-98"
              >
                <ActionIcon className="w-3.5 h-3.5" />
                <span>{actionLabel}</span>
              </button>
            )}

            {/* Optional Secondary Action Button (Bottom) */}
            {extraRightContent}
          </div>

          {/* 3-Dots More Options Menu Button */}
          <button 
            type="button"
            className="self-stretch flex items-center justify-center px-2 bg-white border border-[#e2e8f0] hover:border-slate-300 hover:bg-slate-50 text-[#64748b] hover:text-[#0f172a] rounded-lg shadow-xs hover:shadow-xs transition-all duration-150 active:scale-95"
            title="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
