import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Book as BookType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Tag, Key, Star, X, 
  Info, ArrowRight, Wallet, PlayCircle
} from 'lucide-react';

const Marketplace: React.FC = () => {
  const { books, user, rentBook, buyBook, addCredits, watchAd } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(7);
  const [transactionMode, setTransactionMode] = useState<'rent' | 'buy'>('rent');
  const [showShop, setShowShop] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const isAvailable = book.status === 'available' || (user && user.rentedBooks.includes(book.id));
    return matchesSearch && isAvailable;
  });

  // Price calculation: 50 for 1 day, up to 200 for 14 days.
  // Using a simple scale: 50 + (duration - 1) * (150/13)
  const calculateRentPrice = (days: number) => {
    if (days === 1) return 50;
    if (days === 14) return 200;
    return Math.round(50 + (days - 1) * (150 / 13));
  };

  const handleConfirmTransaction = () => {
    if (!user || !selectedBook) return;
    
    const cost = transactionMode === 'rent' ? calculateRentPrice(rentalDuration) : selectedBook.buyPrice;
    if (user.credits < cost) return; 

    if (transactionMode === 'rent') {
      rentBook(selectedBook.id, rentalDuration, cost);
      setShowAccessCode(true);
    } else {
      buyBook(selectedBook.id);
      setSelectedBook(null); 
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 tracking-tighter mb-4"
          >
            Marketplace
          </motion.h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            AI-verified community books. Rent for a session or buy to keep forever.
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setShowShop(true)}
            className="bg-primary-600 text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-primary-700 transition-all active:scale-95"
          >
            <Wallet className="w-4 h-4" /> Credit Shop
          </button>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-80 pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none transition-all text-sm font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredBooks.map((book, i) => {
            const isRentedByMe = user?.rentedBooks.includes(book.id);
            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelectedBook(book);
                  setTransactionMode(isRentedByMe ? 'buy' : 'rent');
                  setShowAccessCode(false);
                }}
                className="group bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden transition-all hover:shadow-2xl cursor-pointer relative"
              >
                {isRentedByMe && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white shadow-lg">
                      Currently Renting
                    </span>
                  </div>
                )}
                <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                  {book.thumbnail ? (
                    <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <Tag className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white shadow-lg text-primary-600">
                      {book.condition}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="min-h-[4rem]">
                    <h3 className="font-black text-gray-900 text-xl leading-tight">{book.title}</h3>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase">{book.author}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-black text-gray-900">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-black uppercase">
                      <MapPin className="w-3 h-3 text-primary-500" />
                      {book.locationDetails.buildingName}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {!isRentedByMe && <div className="flex-1 bg-primary-50 text-primary-600 p-3 rounded-2xl text-[10px] font-black uppercase text-center">Rent 50c</div>}
                    <div className="flex-1 bg-gray-900 text-white p-3 rounded-2xl text-[10px] font-black uppercase text-center">Buy {book.buyPrice}c</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedBook && !showAccessCode && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="bg-white rounded-[3rem] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              <div className="md:w-1/3 bg-gray-50 p-10 border-r border-gray-100 flex flex-col items-center">
                <img src={selectedBook.thumbnail} alt={selectedBook.title} className="w-full aspect-[3/4] rounded-3xl object-cover shadow-xl mb-6" />
                <div className="w-full space-y-2">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Condition</p>
                    <p className="text-sm font-black text-gray-900">{selectedBook.condition}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-10 md:p-12 overflow-y-auto space-y-8 relative">
                <button onClick={() => setSelectedBook(null)} className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">{selectedBook.title}</h2>
                  <p className="text-xl font-bold text-primary-600 uppercase">{selectedBook.author}</p>
                </div>
                <p className="text-gray-600 leading-relaxed italic">{selectedBook.description}</p>

                <div className="bg-gray-50 p-8 rounded-[2.5rem] space-y-6">
                  <div className="flex bg-white p-1 rounded-2xl border border-gray-200">
                    {!user?.rentedBooks.includes(selectedBook.id) && (
                      <button onClick={() => setTransactionMode('rent')} className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${transactionMode === 'rent' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400'}`}>Rent</button>
                    )}
                    <button onClick={() => setTransactionMode('buy')} className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${transactionMode === 'buy' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400'}`}>Buy ({selectedBook.buyPrice}c)</button>
                  </div>
                  {transactionMode === 'rent' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><label className="text-xs font-black text-gray-500 uppercase">Rental Duration</label><span className="text-sm font-black text-primary-600">{rentalDuration} Days</span></div>
                      <input type="range" min="1" max="14" value={rentalDuration} onChange={(e) => setRentalDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                        <span className="text-xs font-black text-gray-400 uppercase">Cost</span>
                        <span className="text-xl font-black text-gray-900">{calculateRentPrice(rentalDuration)} Credits</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-amber-600 font-bold uppercase tracking-tighter">
                        <Info className="w-3 h-3" /> Rentals are between 1 day and 2 weeks. Extension possible later.
                      </div>
                    </div>
                  )}
                  {transactionMode === 'buy' && user?.rentedBooks.includes(selectedBook.id) && (
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-700 leading-relaxed">
                        You are currently renting this book. Purchasing it will end your rental and add it to your collection forever.
                      </p>
                    </div>
                  )}
                  <button onClick={handleConfirmTransaction} className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-700 transition-all shadow-xl flex items-center justify-center gap-2">
                    Confirm {transactionMode === 'rent' ? 'Rental' : 'Purchase'} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shop Modal */}
      <AnimatePresence>
        {showShop && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[150] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] max-w-2xl w-full p-12 shadow-2xl relative overflow-hidden">
              <button onClick={() => setShowShop(false)} className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              
              <div className="text-center mb-10">
                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><Wallet className="w-10 h-10 text-primary-600" /></div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Credit Shop</h2>
                <p className="text-gray-500 font-bold">Top up your balance to keep reading.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <button onClick={() => { addCredits(200); setShowShop(false); }} className="p-8 rounded-[2.5rem] border-2 border-gray-100 hover:border-primary-600 hover:bg-primary-50 transition-all text-left group">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Starter Pack</p>
                  <p className="text-3xl font-black text-gray-900">200 <span className="text-sm font-bold opacity-40">Credits</span></p>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black">10 NOK</span>
                    <ArrowRight className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
                <button onClick={() => { addCredits(1000); setShowShop(false); }} className="p-8 rounded-[2.5rem] border-2 border-primary-100 bg-primary-50/30 hover:border-primary-600 hover:bg-primary-50 transition-all text-left group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase">Best Value</div>
                  <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-2">Power Reader</p>
                  <p className="text-3xl font-black text-gray-900">1,000 <span className="text-sm font-bold opacity-40">Credits</span></p>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black">50 NOK</span>
                    <ArrowRight className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </div>

              <div className="bg-gray-50 p-8 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:bg-gray-100 transition-all" onClick={() => { watchAd(); setShowShop(false); }}>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform"><PlayCircle className="w-6 h-6 text-primary-600" /></div>
                  <div>
                    <p className="font-black text-gray-900">Watch Advertisement</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gain +3 Credits</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Access Code Modal */}
      <AnimatePresence>
        {showAccessCode && selectedBook && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[4rem] max-w-md w-full p-12 text-center shadow-2xl">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><Key className="w-10 h-10 text-green-600" /></div>
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Access Ready</h2>
              <div className="space-y-4 mb-10">
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-2 tracking-widest">Address & Locker</p>
                  <p className="text-lg font-black text-gray-900">{selectedBook.locationDetails.buildingName}, {selectedBook.locationDetails.room}</p>
                  <p className="text-sm font-bold text-primary-600">Locker: {selectedBook.locationDetails.lockerNumber}</p>
                </div>
                <div className="bg-primary-600 p-8 rounded-[2.5rem] shadow-2xl text-white">
                  <p className="text-[10px] text-primary-200 uppercase font-black mb-2 tracking-widest text-center">Lock Code</p>
                  <p className="text-6xl font-black tracking-[0.5em] ml-8">{selectedBook.lockerCode}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedBook(null); setShowAccessCode(false); }} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black shadow-xl">Go to Dashboard</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
