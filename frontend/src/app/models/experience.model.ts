export interface Experience {
  id?: number;
  role: string;
  company: string;
  period_start: string;
  period_end?: string;
  location: string;
  description: string;
  projects: string[]; // Handled as JSON
  achievements: string[]; // Handled as JSON
  created_at?: string;
}