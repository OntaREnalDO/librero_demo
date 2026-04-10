export type BookCondition = 'Excellent' | 'Good' | 'Fair';
export type BookStatus = 'available' | 'rented' | 'owned' | 'pending_verification';

export interface LocationDetails {
  buildingName: string;
  address: string;
  room: string;
  lockerNumber: string;
}

export interface ReturnSchedule {
  scheduledAt: number;
  lockerId: string;
}

export interface Book {
  id: string;
  barcode: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviewsCount: number;
  condition: BookCondition;
  hasNotes: boolean;
  coverCondition: string;
  pagesCondition: string;
  ownerId: string;
  lockerLocation: string; // Legacy field for simpler logic
  locationDetails: LocationDetails;
  lockerCode: string;
  isAvailable: boolean; // Legacy but kept for simple filtering
  status: BookStatus;
  rentalPrice: number; // credits
  buyPrice: number; // credits
  thumbnail?: string;
  returnSchedule?: ReturnSchedule;
}

export interface RentalSession {
  bookId: string;
  userId: string;
  expiresAt: number;
  isExtended: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  rentedBooks: string[]; // book ids
  uploadedBooks: string[]; // book ids
  boughtBooks: string[]; // book ids currently owned
  isLoggedIn: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: 'Bookshop' | 'University' | 'LockerHost' | 'LocalShop';
  logo: string;
  description: string;
  discountCode?: string;
  creditCost?: number;
  isUserSubmitted?: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: number;
}

export interface GlobalStats {
  donatedCredits: number;
  donationGoal: number;
  communityCO2Saved: number;
  treesPlanted: number;
}
