import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p>© 2026 Gulf Consult ERP Solutions. All rights reserved.</p>
      <div className="flex items-center gap-4 text-[11px] font-medium">
        <span>Schema Version 1.0</span>
        <span>•</span>
        <span>Environment: Localhost</span>
        <span>•</span>
        <span className="text-emerald-700 font-bold">Active Session</span>
      </div>
    </footer>
  );
}
