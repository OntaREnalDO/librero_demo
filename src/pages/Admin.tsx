import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

const Admin: React.FC = () => {
  const { books, adminVerifyBook } = useAppContext();
  const pendingBooks = books.filter(b => b.status === 'pending_verification');

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Developer Panel</h1>
        <p className="text-gray-500 text-lg mt-2">Verify physical book conditions before publishing to the network.</p>
      </header>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-black text-gray-900">Verification Queue ({pendingBooks.length})</h2>
          <ShieldCheck className="w-6 h-6 text-primary-600" />
        </div>

        <div className="divide-y divide-gray-100">
          {pendingBooks.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-widest text-xs">Queue is clear</p>
            </div>
          ) : (
            pendingBooks.map(book => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 flex flex-col md:flex-row items-start gap-8 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-32 aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{book.title}</h3>
                    <p className="text-gray-500 font-bold">{book.author}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Reported Condition</p>
                      <p className="text-xs font-black text-primary-600">{book.condition}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Barcode</p>
                      <p className="text-xs font-mono font-bold">{book.barcode}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Locker Location</p>
                      <p className="text-xs font-bold">{book.locationDetails.buildingName} - {book.locationDetails.lockerNumber}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Scheduled At</p>
                      <p className="text-xs font-bold">{book.returnSchedule ? new Date(book.returnSchedule.scheduledAt).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => adminVerifyBook(book.id)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve & Publish
                    </button>
                    <button className="bg-white text-rose-500 border border-rose-100 px-6 py-3 rounded-xl text-xs font-black uppercase flex items-center gap-2 hover:bg-rose-50 transition-all active:scale-95">
                      <XCircle className="w-4 h-4" /> Reject (Notify User)
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
