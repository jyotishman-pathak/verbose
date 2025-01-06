import React, { useState, useMemo } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { StudentsTable } from './components/StudentsTable';
import { students } from './data/students';
import { FilterCriteria, Student } from './types';
import { GraduationCap } from 'lucide-react';

function App() {
  const [filter, setFilter] = useState<FilterCriteria>({
    subject: '',
    type: '',
    value1: 0,
    value2: 0,
  });

  const [sortConfig, setSortConfig] = useState<{
    column: keyof Student;
    direction: 'asc' | 'desc';
  }>({
    column: 'id',
    direction: 'asc',
  });

  const [isFilterActive, setIsFilterActive] = useState(false);

  const filteredStudents = useMemo(() => {
    if (!isFilterActive || !filter.subject || !filter.type) return students;

    return students.filter((student) => {
      const score = student[filter.subject];
      
      switch (filter.type) {
        case 'above':
          return score > filter.value1;
        case 'below':
          return score < filter.value1;
        case 'between':
          return score >= filter.value1 && score <= filter.value2;
        default:
          return true;
      }
    });
  }, [filter, isFilterActive]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents].sort((a, b) => {
      if (a[sortConfig.column] < b[sortConfig.column]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.column] > b[sortConfig.column]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, sortConfig]);

  const handleSort = (column: keyof Student) => {
    setSortConfig({
      column,
      direction:
        sortConfig.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleApplyFilter = () => {
    setIsFilterActive(true);
  };

  const handleClearFilter = () => {
    setFilter({
      subject: '',
      type: '',
      value1: 0,
      value2: 0,
    });
    setIsFilterActive(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Student Score Management</h1>
          </div>
          <p className="text-gray-600">Track and analyze student performance across subjects</p>
        </div>

        <FilterPanel
          filter={filter}
          onFilterChange={setFilter}
          onApplyFilter={handleApplyFilter}
          onClearFilter={handleClearFilter}
        />

        <StudentsTable
          students={sortedStudents}
          sortColumn={sortConfig.column}
          sortDirection={sortConfig.direction}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default App;