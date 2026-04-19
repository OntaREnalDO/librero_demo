import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import UploadBook from './pages/UploadBook';
import Partners from './pages/Partners';
import Login from './pages/Login';
import Toast from './components/Toast';
import { Book as BookIcon, LogOut, PlusCircle, LayoutDashboard, Store, Users, Presentation, ShieldAlert } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout, books } = useAppContext();
  const pendingCount = books.filter(b => b.status === 'pending_verification').length;
  
  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary-600 font-black text-2xl tracking-tighter">
              <BookIcon className="w-8 h-8" />
              <span>Librero</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {[
                { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
                { to: '/marketplace', icon: Store, label: 'Marketplace' },
                { to: '/partners', icon: Users, label: 'Partners' },
                { to: '/pitch', icon: Presentation, label: 'Pitch Deck' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all relative"
              >
                <ShieldAlert className="w-4 h-4" /> Verify
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {pendingCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user.name}</span>
              <span className="text-sm font-black text-primary-600">{user.credits} Credits</span>
            </div>
            <Link to="/upload" className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Share Book
            </Link>
            <button 
              onClick={logout}
              className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route path="/marketplace" element={user ? <Marketplace /> : <Login />} />
          <Route path="/upload" element={user ? <UploadBook /> : <Login />} />
          <Route path="/partners" element={user ? <Partners /> : <Login />} />
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/admin" element={user ? <Admin /> : <Login />} />
        </Routes>
      </main>
      {user && (
        <footer className="bg-white border-t border-gray-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-primary-600 font-black text-xl mb-4">
                <BookIcon className="w-6 h-6" />
                <span>Librero</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                The sustainable platform for community book sharing. Built for a better, more readable future.
              </p>
            </div>
            <div className="text-left md:text-right text-gray-400 text-xs">
              <p>&copy; 2026 Librero Startup Demo. All rights reserved.</p>
              <p className="mt-2 text-primary-500 font-black italic uppercase tracking-widest">Powered by Circular Economy</p>
            </div>
          </div>
        </footer>
      )}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
