export interface Volunteer {
  id?: string;
  cedula: string;
  first_name: string;
  last_name: string;
  role?: string | null;
  status?: string;
  photo_url?: string | null;
  registered_by?: string | null;
  created_at?: string;
}

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  name?: string;
}

export interface Registro {
  registro_number: string;
  first_name?: string | null;
  last_name?: string | null;
  approximate_age?: number | null;
  sex?: string | null;
  city?: string | null;
  state?: string | null;
  status: string;
  clothing?: string | null;
  distinguishing_features?: string | null;
  last_seen?: string | null;
  photo_url?: string | null;
  media?: MediaItem[];
  // private (registry console only)
  exact_address?: string | null;
  gps?: string | null;
  facility?: string | null;
  phones?: string | null;
  emails?: string | null;
  family_data?: string | null;
  id_document?: string | null;
  medical_info?: string | null;
  video_url?: string | null;
  internal_notes?: string | null;
  registered_by?: string | null;
  created_at?: string;
  score?: number;
}

export interface AdminEntry {
  email: string;
  full_name?: string | null;
  source?: 'env' | 'table';
  removable?: boolean;
  is_self?: boolean;
}

export const REGISTRO_STATUS_LABEL: Record<string, string> = {
  localizada: 'Localizada',
  en_refugio: 'En refugio',
  hospitalizada: 'Hospitalizada',
  buscada: 'Buscada por familiares',
  fallecida: 'Fallecida',
};

export const REGISTRO_STATUS_CLASS: Record<string, string> = {
  localizada: 'ok',
  en_refugio: 'info',
  hospitalizada: 'info',
  buscada: 'warn',
  fallecida: 'muted',
};
