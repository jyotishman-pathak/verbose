export interface Student {
  id: number;
  name: string;
  english: number;
  maths: number;
  science: number;
  socialScience: number;
}

export type Subject = 'english' | 'maths' | 'science' | 'socialScience';
export type FilterType = 'above' | 'below' | 'between';

export interface FilterCriteria {
  subject: Subject | '';
  type: FilterType | '';
  value1: number;
  value2: number;
}