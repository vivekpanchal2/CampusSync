export interface Testimonial {
  id: number;
  content: string;
  author: string;
}

export interface GalleryImage {
  id: number;
  url: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl: string;
  secretary: string;
  president: string;
  vicePresident: string;
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  email: string;
  phone: string;
  _count: { members: number };
}

export interface ClubResponse {
  data: Club;
}
