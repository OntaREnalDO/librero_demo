import React from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, TrendingUp, Users, 
  Zap, Heart, LayoutGrid, CheckCircle, Store 
} from 'lucide-react';

const Pitch: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 md:p-20 font-sans selection:bg-primary-500 pb-40">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Slide 1: Intro */}
        <section className="min-h-[60vh] flex flex-col justify-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Zap className="w-4 h-4" /> Startup Pitch 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
          >
            LIBRERO <br />
            <span className="text-primary-500 italic text-5xl md:text-7xl">The Circular Reading Network</span>
          </motion.h1>
          <p className="text-gray-400 text-2xl max-w-2xl font-medium">
            Building the world's first automated, community-owned library through smart lockers and a green credit economy.
          </p>
        </section>

        {/* Slide 2: The Problem */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-black tracking-tight">The Problem</h2>
            <div className="space-y-6">
              {[
                { title: 'High Cost', desc: 'University textbooks and new releases are expensive, creating an education barrier.' },
                { title: 'Environmental Waste', desc: 'The publishing industry is a massive CO2 contributor. 320 million books are landfilled annually.' },
                { title: 'Logistics Friction', desc: 'Second-hand markets (eBay/Vinted) are slow and high-carbon due to shipping.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <p className="text-rose-500 font-black mb-2 uppercase text-xs tracking-widest">Pain Point {i+1}</p>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-rose-500/10 rounded-[4rem] aspect-square flex items-center justify-center p-20 border border-rose-500/20">
            <div className="text-center">
              <p className="text-9xl font-black text-rose-500">320M</p>
              <p className="text-xl font-bold text-rose-200 mt-4 uppercase tracking-widest">Books Landfilled / Year</p>
            </div>
          </div>
        </section>

        {/* Slide 3: The Solution */}
        <section className="space-y-12">
          <h2 className="text-5xl font-black tracking-tight text-center">The Librero Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: LayoutGrid, title: 'Smart Lockers', desc: '24/7 automated exchange points in universities and hubs.' },
              { icon: TrendingUp, title: 'Credit Economy', desc: 'A self-sustaining currency that incentivizes sharing over buying.' },
              { icon: TreePine, title: 'ESG Mission', desc: 'Gamified tree-planting challenges that drive collective user action.' },
            ].map((item, i) => (
              <div key={i} className="bg-primary-600 p-10 rounded-[3rem] text-center space-y-6 shadow-2xl shadow-primary-900/20">
                <item.icon className="w-16 h-16 mx-auto" />
                <h3 className="text-3xl font-black">{item.title}</h3>
                <p className="text-primary-100 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Slide 4: Business Model */}
        <section className="bg-white text-gray-900 rounded-[4rem] p-12 md:p-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black tracking-tighter">Profitability & Growth</h2>
            <p className="text-gray-500 text-xl font-medium">Dual-revenue stream model for maximum scalability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-4 rounded-2xl text-primary-600">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">B2C: Credit Sales</h3>
                  <p className="text-gray-500">Users buy credits (1€, 2€, 5€) to rent books or donate to challenges.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                  <Store className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">B2B: Merchant Slots</h3>
                  <p className="text-gray-500">Local shops pay 5€/month to be featured in our high-traffic Partner Hub.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Investor Highlights</h4>
              <ul className="space-y-6">
                {[
                  'Negative Working Capital (Paid upfront)',
                  'Zero Inventory Acquisition Cost',
                  'High User Retention via Community Goals',
                  'Low Maintenance (Automated Infrastructure)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-bold">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Slide 5: The Challenge */}
        <section className="text-center space-y-12">
          <div className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            <Heart className="w-4 h-4" /> The 2M Credit Mission
          </div>
          <h2 className="text-7xl font-black tracking-tighter">Planting the Future</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-2xl text-gray-400 leading-relaxed">
              We aren't just an app. We are a forest. Our community challenge system turns digital transactions into physical ecological impact.
            </p>
            <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10">
              <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[42%]" />
              </div>
            </div>
            <p className="text-green-500 font-black text-xl uppercase tracking-widest">Goal: 2,000,000 Credits = 500 Trees</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary-600 rounded-[4rem] p-20 text-center space-y-8">
          <h2 className="text-6xl font-black tracking-tighter italic">Join the Sharing Revolution.</h2>
          <p className="text-2xl text-primary-100 font-medium">Invest in Librero today.</p>
          <div className="flex justify-center gap-4 pt-8">
            <button className="bg-white text-primary-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-primary-50 transition-all">
              Contact Founder
            </button>
            <button className="bg-gray-900 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-gray-800 transition-all">
              View Roadmap
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Pitch;
