import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, Book, Partner, Notification, RentalSession, GlobalStats, LocationDetails } from '../types';

interface AppContextType {
  user: User | null;
  books: Book[];
  partners: Partner[];
  notifications: Notification[];
  rentalSessions: RentalSession[];
  stats: GlobalStats;
  login: (name: string, email: string) => void;
  logout: () => void;
  addCredits: (amount: number) => void;
  rentBook: (bookId: string, durationDays: number, cost: number) => void;
  buyBook: (bookId: string) => void;
  uploadBook: (book: Omit<Book, 'id' | 'ownerId' | 'isAvailable' | 'status'>) => boolean;
  returnBookRequest: (bookId: string, location: LocationDetails, time: number) => void;
  relistBookRequest: (bookId: string, location: LocationDetails, time: number) => void;
  adminVerifyBook: (bookId: string) => void;
  extendRental: (bookId: string, durationDays: number, cost: number) => void;
  donateCredits: (amount: number) => void;
  addPartner: (partner: Omit<Partner, 'id' | 'isUserSubmitted'>) => void;
  removeNotification: (id: string) => void;
  watchAd: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialLocation: LocationDetails = {
  buildingName: 'Science Park',
  address: 'O.S. Bragstads plass 2',
  room: 'Room B302',
  lockerNumber: 'L-42'
};

const initialUser: User = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@librero.com',
  credits: 2000,
  rentedBooks: [],
  uploadedBooks: [],
  boughtBooks: [],
  isLoggedIn: true,
};

const initialBooks: Book[] = [
  {
    id: 'book-1',
    barcode: '9780544003415',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'A magnificent fantasy epic that follows the quest of the hobbit Frodo Baggins to destroy the One Ring.',
    rating: 4.8,
    reviewsCount: 1250,
    condition: 'Excellent',
    hasNotes: false,
    coverCondition: 'Pristine',
    pagesCondition: 'White',
    ownerId: 'user-2',
    lockerLocation: 'Science Park B3',
    locationDetails: initialLocation,
    lockerCode: '821',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    id: 'book-2',
    barcode: '9780132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    rating: 4.6,
    reviewsCount: 840,
    condition: 'Good',
    hasNotes: true,
    coverCondition: 'Slight Wear',
    pagesCondition: 'Cream',
    ownerId: 'user-3',
    lockerLocation: 'University Library A1',
    locationDetails: { ...initialLocation, buildingName: 'University Library', room: 'Floor 1, A1', lockerNumber: 'L-12' },
    lockerCode: '312',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1512428559083-a401c1070e1a?w=400',
  },
  {
    id: 'book-3',
    barcode: '9780451524935',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel and cautionary tale about a future under totalitarianism.',
    rating: 4.7,
    reviewsCount: 2100,
    condition: 'Fair',
    hasNotes: false,
    coverCondition: 'Worn edges',
    pagesCondition: 'Yellowed',
    ownerId: 'user-4',
    lockerLocation: 'Student Hub Main Hall',
    locationDetails: { ...initialLocation, buildingName: 'Student Hub', room: 'Main Hall', lockerNumber: 'S-09' },
    lockerCode: '442',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
  },
  {
    id: 'book-4',
    barcode: '9780141036144',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    rating: 4.4,
    reviewsCount: 1560,
    condition: 'Excellent',
    hasNotes: false,
    coverCondition: 'Pristine',
    pagesCondition: 'White',
    ownerId: 'user-5',
    lockerLocation: 'Science Park B3',
    locationDetails: initialLocation,
    lockerCode: '901',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
  },
  {
    id: 'book-5',
    barcode: '9780316769488',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A story about Holden Caulfield\'s experiences in New York City after being expelled from prep school.',
    rating: 4.0,
    reviewsCount: 980,
    condition: 'Good',
    hasNotes: true,
    coverCondition: 'Faded Spine',
    pagesCondition: 'White',
    ownerId: 'user-6',
    lockerLocation: 'University Library A1',
    locationDetails: { ...initialLocation, buildingName: 'University Library', room: 'Floor 1, A1', lockerNumber: 'L-12' },
    lockerCode: '773',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1543004218-ee141104638e?w=400',
  },
  {
    id: 'book-6',
    barcode: '9780062315007',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A fable about following your dream, narrated through the journey of an Andalusian shepherd boy.',
    rating: 4.7,
    reviewsCount: 3400,
    condition: 'Excellent',
    hasNotes: false,
    coverCondition: 'Pristine',
    pagesCondition: 'White',
    ownerId: 'user-7',
    lockerLocation: 'Student Hub Main Hall',
    locationDetails: { ...initialLocation, buildingName: 'Student Hub', room: 'Main Hall', lockerNumber: 'S-09' },
    lockerCode: '112',
    isAvailable: true,
    status: 'available',
    rentalPrice: 50,
    buyPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
  }
];

const initialPartners: Partner[] = [
  {
    id: 'partner-1',
    name: 'NTNU Bookstore',
    type: 'Bookshop',
    logo: '🎓',
    description: 'Get exclusive student discounts and pick up rare publications directly via Librero.',
    discountCode: 'NTNU-PREMIUM',
    creditCost: 150,
  },
];

const initialStats: GlobalStats = {
  donatedCredits: 452000,
  donationGoal: 2000000,
  communityCO2Saved: 12450.5,
  treesPlanted: 142
};

const safeParse = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => safeParse('librero_user', initialUser));
  const [books, setBooks] = useState<Book[]>(() => safeParse('librero_books', initialBooks));
  const [partners, setPartners] = useState<Partner[]>(() => safeParse('librero_partners', initialPartners));
  const [rentalSessions, setRentalSessions] = useState<RentalSession[]>(() => safeParse('librero_rentals', []));
  const [stats, setStats] = useState<GlobalStats>(() => safeParse('librero_stats', initialStats));
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type, timestamp: Date.now() }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const login = (name: string, email: string) => {
    const newUser: User = { ...initialUser, name, email, isLoggedIn: true };
    setUser(newUser);
    addNotification(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('librero_user');
  };

  const addCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
      addNotification(`Added ${amount} credits to your account.`, 'success');
    }
  };

  const watchAd = () => {
    if (user) {
      setUser({ ...user, credits: user.credits + 3 });
      addNotification('Watched ad! +3 Credits gained.', 'success');
    }
  };

  const donateCredits = (amount: number) => {
    if (user && user.credits >= amount) {
      setUser({ ...user, credits: user.credits - amount });
      setStats(prev => ({ ...prev, donatedCredits: prev.donatedCredits + amount }));
      addNotification(`Thank you! ${amount} credits donated.`, 'success');
    }
  };

  const rentBook = (bookId: string, durationDays: number, cost: number) => {
    if (user && user.credits >= cost) {
      const book = books.find(b => b.id === bookId);
      if (book && book.status === 'available') {
        const expiresAt = Date.now() + (durationDays * 24 * 60 * 60 * 1000);
        setRentalSessions(prev => [...prev, { bookId, userId: user.id, expiresAt, isExtended: false }]);
        setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'rented', isAvailable: false } : b));
        setUser(prev => prev ? { ...prev, credits: prev.credits - cost, rentedBooks: [...prev.rentedBooks, bookId] } : null);
        setStats(prev => ({ ...prev, communityCO2Saved: prev.communityCO2Saved + 2.5 }));
        addNotification(`Book rented for ${durationDays} days! Code: ${book.lockerCode}`, 'success');
      }
    }
  };

  const buyBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (user && book && user.credits >= book.buyPrice) {
      const isRentedByMe = user.rentedBooks.includes(bookId);
      
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'owned', isAvailable: false, ownerId: user.id } : b));
      setUser(prev => {
        if (!prev) return null;
        const rentedBooks = isRentedByMe ? prev.rentedBooks.filter(id => id !== bookId) : prev.rentedBooks;
        return { 
          ...prev, 
          credits: prev.credits - book.buyPrice, 
          boughtBooks: [...prev.boughtBooks, bookId],
          rentedBooks
        };
      });

      if (isRentedByMe) {
        setRentalSessions(prev => prev.filter(s => s.bookId !== bookId));
      }

      setStats(prev => ({ ...prev, communityCO2Saved: prev.communityCO2Saved + 5.0 }));
      addNotification(`Book purchased! It's now yours.`, 'success');
    }
  };

  const uploadBook = (bookData: Omit<Book, 'id' | 'ownerId' | 'isAvailable' | 'status'>) => {
    if (user) {
      if (books.some(b => b.barcode === bookData.barcode)) {
        addNotification('Barcode already exists!', 'warning');
        return false;
      }
      const newBook: Book = {
        ...bookData,
        id: `book-${Date.now()}`,
        ownerId: user.id,
        isAvailable: false,
        status: 'pending_verification',
      };
      setBooks(prev => [newBook, ...prev]);
      setUser(prev => prev ? { ...prev, credits: prev.credits + 250, uploadedBooks: [...prev.uploadedBooks, newBook.id] } : null);
      addNotification('Book submitted for verification!', 'success');
      return true;
    }
    return false;
  };

  const returnBookRequest = (bookId: string, location: LocationDetails, time: number) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { 
      ...b, 
      status: 'pending_verification', 
      locationDetails: location,
      returnSchedule: { scheduledAt: time, lockerId: location.lockerNumber }
    } : b));
    setRentalSessions(prev => prev.filter(s => s.bookId !== bookId));
    if (user) {
      setUser(prev => prev ? { ...prev, rentedBooks: prev.rentedBooks.filter(id => id !== bookId) } : null);
    }
    addNotification('Return scheduled! Developers notified.', 'info');
  };

  const relistBookRequest = (bookId: string, location: LocationDetails, time: number) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { 
      ...b, 
      status: 'pending_verification',
      locationDetails: location,
      returnSchedule: { scheduledAt: time, lockerId: location.lockerNumber }
    } : b));
    if (user) {
      setUser(prev => prev ? { ...prev, boughtBooks: prev.boughtBooks.filter(id => id !== bookId) } : null);
    }
    addNotification('Relisting scheduled! Developers notified.', 'info');
  };

  const adminVerifyBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'available', isAvailable: true } : b));
    addNotification('Book verified and published!', 'success');
  };

  const extendRental = (bookId: string, durationDays: number, cost: number) => {
    if (user && user.credits >= cost) {
      const session = rentalSessions.find(s => s.bookId === bookId);
      if (session) {
        setRentalSessions(prev => prev.map(s => s.bookId === bookId ? { ...s, expiresAt: s.expiresAt + (durationDays * 24 * 60 * 60 * 1000), isExtended: true } : s));
        setUser(prev => prev ? { ...prev, credits: prev.credits - cost } : null);
        addNotification(`Extended by ${durationDays} days!`, 'success');
      }
    }
  };

  const addPartner = (partnerData: Omit<Partner, 'id' | 'isUserSubmitted'>) => {
    setPartners(prev => [{ ...partnerData, id: `p-${Date.now()}`, isUserSubmitted: true }, ...prev]);
  };

  useEffect(() => {
    if (user) localStorage.setItem('librero_user', JSON.stringify(user));
    localStorage.setItem('librero_books', JSON.stringify(books));
    localStorage.setItem('librero_rentals', JSON.stringify(rentalSessions));
    localStorage.setItem('librero_stats', JSON.stringify(stats));
    localStorage.setItem('librero_partners', JSON.stringify(partners));
  }, [user, books, rentalSessions, stats, partners]);

  return (
    <AppContext.Provider value={{ 
      user, books, partners, notifications, rentalSessions, stats,
      login, logout, addCredits, rentBook, buyBook, uploadBook, 
      returnBookRequest, relistBookRequest, adminVerifyBook, extendRental, donateCredits, addPartner, removeNotification, watchAd 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
