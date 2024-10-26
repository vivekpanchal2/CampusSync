export interface Testimonial {
  id: number;
  content: string;
  author: string;
}

export interface GalleryImage {
  id: number;
  url: string;
}

export interface ClubMembership {
  memberId: string;
  userId: string;
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
  memberships: ClubMembership[];
  _count: { memberships: number };
  events: any;
}

export interface ClubCardProps {
  filteredClubs: Club[];
  basepath: String;
}

export interface ClubResponse {
  data: Club;
}

declare interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: { [key: string]: any };
  theme?: {
    color?: string;
  };
}

declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
  on(event: string, handler: (response: any) => void): void;
}

declare interface Window {
  Razorpay: typeof Razorpay;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  clubId: string | null;
  timeDate: string;
  venue: string;
  image: string;
  ticketPrice: number;
  studentsLimit: number;
  createdById: string;
  createdBy: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  club?: {
    name: string;
  };
  tickets: Ticket[];
}

export interface User {
  id: string;
  name: string;
  collegeEnrollNo: string;
  email: string;
  profileImage: string;
}

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  ticketId: string;
  ticketUrl: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface EventDetailsProps {
  eventDetails: Event;
}

export interface LoginFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormData {
  email: string;
  password: string;
  collegeEnrollNo?: string;
  name?: string;
}

export interface SignupFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface LoaderProps {
  loading: boolean;
}

export interface EnrolledEvent {
  id: string;
  eventId: string;
  ticketId: string;
  ticketUrl: string;
  createdAt: string;
  updatedAt: string;
  event: {
    name: string;
    timeDate: string;
    venue: string;
    image: string;
  };
}

export interface JoinedClub {
  clubId: string;
  memberId: string;
  club: {
    logoUrl: string;
    name: string;
  };
}

export interface Post {
  id: string;
  content: string;
  image: string;
  user: {
    name: string;
  };
  createdAt: string;
}
