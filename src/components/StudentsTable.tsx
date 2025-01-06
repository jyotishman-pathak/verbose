import React from 'react';
import { Student, Subject } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface StudentsTableProps {
  students: Student[];
  sortColumn: keyof Student;
  sortDirection: 'asc' | 'desc';
  onSort: (column: keyof Student) => void;
}

export function StudentsTable({ students, sortColumn, sortDirection, onSort }: StudentsTableProps) {
  const columns: { key: keyof Student; label: string }[] = [
    { key: 'id', label: 'S.No' },
    { key: 'name', label: 'Name' },
    { key: 'english', label: 'English' },
    { key: 'maths', label: 'Maths' },
    { key: 'science', label: 'Science' },
    { key: 'socialScience', label: 'Social Science' },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortColumn === column.key ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}