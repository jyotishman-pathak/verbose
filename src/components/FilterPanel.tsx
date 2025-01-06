import React from 'react';
import { FilterCriteria, FilterType, Subject } from '../types';
import { ArrowDownUp } from 'lucide-react';

interface FilterPanelProps {
  filter: FilterCriteria;
  onFilterChange: (filter: FilterCriteria) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const subjects: { value: Subject; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'maths', label: 'Maths' },
  { value: 'science', label: 'Science' },
  { value: 'socialScience', label: 'Social Science' },
];

const filterTypes: { value: FilterType; label: string }[] = [
  { value: 'above', label: 'Above' },
  { value: 'below', label: 'Below' },
  { value: 'between', label: 'Between' },
];

export function FilterPanel({ filter, onFilterChange, onApplyFilter, onClearFilter }: FilterPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={filter.subject}
            onChange={(e) => onFilterChange({ ...filter, subject: e.target.value as Subject })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter Type</label>
          <select
            value={filter.type}
            onChange={(e) => onFilterChange({ ...filter, type: e.target.value as FilterType })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Filter Type</option>
            {filterTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <input
            type="number"
            value={filter.value1 || ''}
            onChange={(e) => onFilterChange({ ...filter, value1: Number(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>

        {filter.type === 'between' && (
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="number"
              value={filter.value2 || ''}
              onChange={(e) => onFilterChange({ ...filter, value2: Number(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter value"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onApplyFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Filter
          </button>
          <button
            onClick={onClearFilter}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}