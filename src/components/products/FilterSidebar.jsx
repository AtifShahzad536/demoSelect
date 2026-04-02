import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { filterOptions, colourDots } from '../../data/productsData';

const FilterGroup = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm font-semibold tracking-wide uppercase text-gray-900 hover:text-gray-600 transition-colors"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64 pb-4' : 'max-h-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange, onClearAll, isMobileOpen, onMobileClose }) => {
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gray-700" />
          <span className="font-bold text-sm tracking-widest uppercase text-gray-900">Filters</span>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-600 hover:text-red-800 font-semibold tracking-wide underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          )}
          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Active tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-3 pb-1">
          {Object.entries(filters).map(([key, vals]) =>
            vals.map((v) => (
              <span
                key={`${key}-${v}`}
                className="flex items-center gap-1 px-2.5 py-1 bg-black text-white text-xs font-medium rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => toggle(key, v)}
              >
                {v}
                <X size={10} />
              </span>
            ))
          )}
        </div>
      )}

      {/* Filter Groups */}
      <div className="mt-2 flex-1 overflow-y-auto pr-1">
        {/* Colour */}
        <FilterGroup title="Colour" defaultOpen={true}>
          <div className="flex flex-wrap gap-2">
            {filterOptions.colour.map((colour) => {
              const active = filters.colour?.includes(colour);
              return (
                <button
                  key={colour}
                  onClick={() => toggle('colour', colour)}
                  title={colour}
                  className={`group relative flex flex-col items-center gap-1.5 transition-transform hover:scale-110 ${
                    active ? 'scale-110' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      active ? 'border-black shadow-md' : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: colourDots[colour.toLowerCase()] || '#ccc' }}
                  />
                  <span className="text-[10px] text-gray-500 capitalize leading-none">{colour}</span>
                </button>
              );
            })}
          </div>
        </FilterGroup>

        {/* Size */}
        <FilterGroup title="Size" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {filterOptions.size.map((size) => {
              const active = filters.size?.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggle('size', size)}
                  className={`w-10 h-10 border text-sm font-semibold transition-all ${
                    active
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        {/* Version */}
        <FilterGroup title="Version" defaultOpen={false}>
          <div className="space-y-2">
            {filterOptions.version.map((ver) => {
              const active = filters.version?.includes(ver);
              return (
                <label
                  key={ver}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    onClick={() => toggle('version', ver)}
                    className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      active ? 'bg-black border-black' : 'border-gray-400 group-hover:border-black'
                    }`}
                  >
                    {active && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => toggle('version', ver)}
                    className={`text-sm transition-colors ${active ? 'font-semibold text-black' : 'text-gray-600 group-hover:text-black'}`}
                  >
                    {ver}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterGroup>

        {/* Gender */}
        <FilterGroup title="Gender" defaultOpen={false}>
          <div className="space-y-2">
            {filterOptions.gender.map((gen) => {
              const active = filters.gender?.includes(gen);
              return (
                <label key={gen} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggle('gender', gen)}
                    className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      active ? 'bg-black border-black' : 'border-gray-400 group-hover:border-black'
                    }`}
                  >
                    {active && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => toggle('gender', gen)}
                    className={`text-sm transition-colors ${active ? 'font-semibold text-black' : 'text-gray-600 group-hover:text-black'}`}
                  >
                    {gen}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterGroup>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white p-6 shadow-2xl overflow-y-auto custom-scrollbar animate-slide-in-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
