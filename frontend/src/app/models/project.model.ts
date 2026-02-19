export interface Project {
    id?: number;
    title: string;
    company: string | null;
    category: string;
    type_class: string;
    description: string;
    features: string[]; // This matches your Laravel JSON cast
    link: string | null;
    status: 'active' | 'development' | 'archived';
    created_at?: string;
    updated_at?: string;
}