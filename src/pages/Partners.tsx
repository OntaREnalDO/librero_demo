import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Partner } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, Sparkles, Building2, 
  ArrowUpRight, Plus, CheckCircle, ShieldCheck, X
} from 'lucide-react';

const Partners: React.FC = () => {
  const { partners, user, addPartner } = useAppContext();
  const [redeemedPartner, setRedeemedPartner] = useState<Partner | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    description: '',
    logo: '🏪',
    type: 'LocalShop' as Partner['type'],
    discountCode: 'NEWSHOP10',
    creditCost: 100
  });

  const handleRedeem = (partner: Partner) => {
    if (!user || user.credits < (partner.creditCost || 0)) return;
    setRedeemedPartner(partner);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    addPartner(newPartner);
    setShowApplyModal(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 tracking-tighter mb-4"
          >
            Partner Ecosystem
          </motion.h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Redeem credits for exclusive local rewards. Our platform connects thousands of readers with quality local businesses.
          </p>
        </div>
        <button 
          onClick={() => setShowApplyModal(true)}
          className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Buy a Slot
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {partners.map((partner, i) => (
          <motion.div 
            key={partner.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[3rem] p-10 border border-gray-50 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="text-5xl bg-gray-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {partner.logo}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  partner.type === 'University' ? 'bg-indigo-50 text-indigo-600' : 
                  partner.type === 'Bookshop' ? 'bg-rose-50 text-rose-600' : 
                  'bg-green-50 text-green-600'
                }`}>
                  {partner.type}
                </span>
                {partner.isUserSubmitted && (
                  <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter border border-amber-100">Community Ad</span>
                )}
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">{partner.name}</h3>
            <p className="text-gray-500 mb-10 leading-relaxed text-lg">{partner.description}</p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex-1 bg-gray-50 rounded-[1.5rem] p-4 flex items-center justify-between px-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Ticket className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Cost</span>
                </div>
                <span className="text-2xl font-black text-primary-600">{partner.creditCost}c</span>
              </div>

              <button
                onClick={() => handleRedeem(partner)}
                className="bg-gray-900 text-white px-8 py-5 rounded-[1.5rem] font-black hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 group/btn"
              >
                Claim Reward <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}

        <div className="lg:col-span-2 bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl mt-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-primary-600/30">
                <Building2 className="w-4 h-4" /> Merchant Hub
              </div>
              <h2 className="text-5xl font-black mb-6 tracking-tighter leading-tight">Put your shop on the <br /><span className="text-primary-500">Librero Map</span></h2>
              <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-lg">
                Own a coffee shop or bookstore? Reach a high-intent audience of <strong>5,000+</strong> local readers. Buy a slot for just 1,000 credits or 5€.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowApplyModal(true)}
                  className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Buy Slot Now <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Foot Traffic', value: '+24%', desc: 'Verified growth' },
                { label: 'ESG Rating', value: 'AAA', desc: 'Sustainable ad' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <p className="text-primary-500 text-3xl font-black mb-1">{stat.value}</p>
                  <p className="text-white font-black text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-gray-500 text-[10px] leading-tight font-bold">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <Sparkles className="absolute right-[-5rem] top-[-5rem] w-96 h-96 text-white/5 rotate-12" />
        </div>
      </div>

      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] max-w-2xl w-full p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">New Merchant Slot</h2>
                <button onClick={() => setShowApplyModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Name</label>
                    <input 
                      required
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold"
                      placeholder="e.g. Espresso House"
                      value={newPartner.name}
                      onChange={e => setNewPartner({...newPartner, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Emoji Logo</label>
                    <input 
                      required
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold text-2xl text-center"
                      placeholder="☕"
                      value={newPartner.logo}
                      onChange={e => setNewPartner({...newPartner, logo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reward Description</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold"
                    placeholder="e.g. Buy one coffee, get one free for Librero users."
                    value={newPartner.description}
                    onChange={e => setNewPartner({...newPartner, description: e.target.value})}
                  />
                </div>

                <div className="bg-primary-50 p-8 rounded-[2rem] border border-primary-100 flex items-center justify-between">
                  <div>
                    <p className="text-primary-900 font-black">Slot Price</p>
                    <p className="text-primary-600 text-xs font-bold uppercase">1,000 Credits or 5.00€</p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-xl border border-primary-200">
                    <ShieldCheck className="w-6 h-6 text-primary-600" />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  Confirm & Buy Slot <CheckCircle className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {redeemedPartner && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] max-w-md w-full p-12 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="bg-primary-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Ticket className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Code Claimed!</h2>
              <p className="text-gray-500 font-bold mb-10 italic">Ready to use at {redeemedPartner.name}</p>
              
              <div className="bg-primary-600 p-10 rounded-[2.5rem] shadow-2xl shadow-primary-200 mb-10">
                <p className="text-[10px] text-primary-200 uppercase font-black tracking-[0.4em] mb-4">Your Secret Coupon</p>
                <p className="text-5xl font-black text-white tracking-[0.2em] uppercase leading-none">{redeemedPartner.discountCode}</p>
              </div>

              <button
                onClick={() => setRedeemedPartner(null)}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all shadow-xl active:scale-95"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Partners;
