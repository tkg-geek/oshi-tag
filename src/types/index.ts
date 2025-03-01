export type VisibilityType = 'private' | 'public' | 'limited';

export interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  visibility: VisibilityType;
  password?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
} 