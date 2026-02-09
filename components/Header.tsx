
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-compass-drafting text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Rural Brand Builder</h1>
            <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-widest leading-none">Powered by GenAI</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Resources</a>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            Start Project
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
