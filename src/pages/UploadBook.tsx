import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { BookCondition, LocationDetails } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ShieldCheck, 
  Book as BookIcon, Scan, Search, Loader2, MapPin, Key
} from 'lucide-react';

const UploadBook: React.FC = () => {
  const { uploadBook } = useAppContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');

  const [formData, setFormData] = useState({
    barcode: '',
    title: '',
    author: '',
    description: '',
    rating: 4.5,
    reviewsCount: 120,
    condition: 'Good' as BookCondition,
    hasNotes: false,
    coverCondition: 'Good',
    pagesCondition: 'Clean',
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', // Placeholder
  });

  const locations: LocationDetails[] = [
    { buildingName: 'Science Park', address: 'O.S. Bragstads plass 2', room: 'B302', lockerNumber: 'L-42' },
    { buildingName: 'University Library', address: 'Høgskoleringen 1', room: 'Floor 1, A1', lockerNumber: 'L-12' },
    { buildingName: 'Student Hub', address: 'Kolbjørn Hejes vei 4', room: 'Main Hall', lockerNumber: 'S-09' },
  ];

  const [selectedLocation, setSelectedLocation] = useState<LocationDetails>(locations[0]);

  const handleVerify = () => {
    if (!formData.barcode || !formData.title) return;
    setIsVerifying(true);
    setVerifyStep(1);
    
    // Generate a random 3-digit code
    const code = Math.floor(100 + Math.random() * 900).toString();
    setGeneratedCode(code);

    setTimeout(() => setVerifyStep(2), 1500);
    setTimeout(() => setVerifyStep(3), 3000);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyStep(0);
      const success = uploadBook({
        ...formData,
        lockerLocation: `${selectedLocation.buildingName} ${selectedLocation.room}`,
        locationDetails: selectedLocation,
        lockerCode: code,
        rentalPrice: 50,
        buyPrice: formData.condition === 'Excellent' ? 100 : formData.condition === 'Good' ? 85 : 70,
      });
      if (success) setIsSuccess(true);
    }, 4500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center space-y-8">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-white"><CheckCircle className="w-16 h-16 text-green-600" /></motion.div>
        
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Inventory Added!</h1>
          <p className="text-xl text-gray-500 font-bold">AI matched the cover. You've earned <span className="text-primary-600">250 credits</span>.</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 max-w-md mx-auto">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Assigned Locker</p>
            <p className="text-2xl font-black text-gray-900">{selectedLocation.buildingName}</p>
            <p className="text-sm font-bold text-primary-600">{selectedLocation.room} - Locker {selectedLocation.lockerNumber}</p>
          </div>

          <div className="bg-primary-600 p-8 rounded-[2.5rem] shadow-xl text-white">
            <p className="text-[10px] uppercase font-black mb-2 opacity-60">Locker Access Code</p>
            <p className="text-6xl font-black tracking-[0.5em] ml-8">{generatedCode}</p>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-amber-900 text-xs font-bold leading-relaxed">
            Please drop the book off within 24 hours. Your credits will be finalized after human review.
          </div>
        </div>

        <button onClick={() => window.location.href = '/'} className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-gray-800 transition-all shadow-xl active:scale-95">Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header className="max-w-2xl">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Share a Book</h1>
        <p className="text-gray-500 text-lg leading-relaxed">AI-powered condition verification ensures a fair network for everyone. Select a locker and generate your drop-off code.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ISBN / Barcode</label>
                <div className="relative">
                  <input required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={formData.barcode} onChange={e => setFormData({ ...formData, barcode: e.target.value })} />
                  <Scan className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                <input required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Author</label>
              <input required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Condition</label>
              <div className="grid grid-cols-3 gap-4">
                {['Excellent', 'Good', 'Fair'].map(cond => (
                  <button key={cond} type="button" onClick={() => setFormData({ ...formData, condition: cond as BookCondition })} className={`py-4 rounded-2xl text-xs font-black border-2 transition-all ${formData.condition === cond ? 'bg-primary-600 border-primary-600 text-white shadow-xl' : 'bg-white border-gray-100 text-gray-400'}`}>{cond}</button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-2 mb-4"><MapPin className="w-5 h-5 text-primary-600" /><h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Drop-off Location</h3></div>
              <div className="grid grid-cols-1 gap-4">
                {locations.map(loc => (
                  <button 
                    key={loc.lockerNumber} 
                    type="button"
                    onClick={() => setSelectedLocation(loc)} 
                    className={`p-6 rounded-[2rem] border-2 transition-all text-left flex justify-between items-center ${selectedLocation.lockerNumber === loc.lockerNumber ? 'border-primary-600 bg-white shadow-lg' : 'border-transparent bg-white/50 hover:bg-white'}`}
                  >
                    <div>
                      <p className="text-lg font-black text-gray-900">{loc.buildingName}</p>
                      <p className="text-xs text-gray-500 font-bold">{loc.address} • {loc.room}</p>
                    </div>
                    {selectedLocation.lockerNumber === loc.lockerNumber && <CheckCircle className="w-6 h-6 text-primary-600" />}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={handleVerify} disabled={isVerifying} className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50">
              {isVerifying ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
              {isVerifying ? 'Analyzing Book...' : 'Verify & List (Earn 250c)'}
            </button>
          </motion.div>
        </div>

        <aside className="space-y-8">
          <div className="bg-primary-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-6">AI Scan Profile</h3>
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mb-6"><motion.div className="h-full bg-white" animate={{ width: isVerifying ? `${(verifyStep / 3) * 100}%` : '0%' }} /></div>
            <ul className="space-y-4 opacity-80 font-bold text-sm">
              <li className="flex items-center gap-3"><Search className="w-4 h-4" /> Metadata Sync</li>
              <li className="flex items-center gap-3"><BookIcon className="w-4 h-4" /> Cover Matching</li>
              <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> Barcode Audit</li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-amber-600"><Key className="w-5 h-5" /><h4 className="font-black text-xs uppercase tracking-widest">Drop-off Policy</h4></div>
            <p className="text-xs font-bold text-gray-500 leading-relaxed">Your book will be held in the locker until verified by our community leads. Once approved, it joins the Marketplace!</p>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {isVerifying && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[4rem] max-w-md w-full p-12 text-center shadow-2xl">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-primary-100 rounded-full" />
                <motion.div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                <div className="absolute inset-0 flex items-center justify-center"><Scan className="w-10 h-10 text-primary-600" /></div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">AI Verification</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Processing Layer {verifyStep}...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadBook;
