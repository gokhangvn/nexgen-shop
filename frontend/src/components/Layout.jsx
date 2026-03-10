import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Moon, Sun, Heart, ChevronRight, Instagram, Linkedin, Facebook, Watch, Headphones, Laptop, Smartphone, ArrowRight, Home, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return { ...parsed, avatar: parsed.avatar || '/avatar.png' };
      }
      return null;
    } catch (e) {
      return null;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Mağaza', path: '/shop' },
    { name: 'Trendler', path: '/trending' },
    { name: 'Envanter', path: '/inventory' },
    ...(user ? [{ name: 'Profilim', path: '/profile' }] : []),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Premium Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-3 border-b' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="group relative flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all opacity-0 group-hover:opacity-100" />
              <img 
                src="/logo.png" 
                alt="NexGen Logo" 
                className="w-10 h-10 object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <span className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">
              NEXGEN<span className="text-primary group-hover:text-foreground italic">SHOP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-black tracking-widest transition-all hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>Ana Sayfa</Link>
            
            {/* Mağaza Mega Menu Dropdown */}
            <div className="relative group py-4">
              <Link to="/shop" className={`text-sm font-black tracking-widest transition-all hover:text-primary flex items-center gap-1 ${location.pathname === '/shop' ? 'text-primary' : 'text-muted-foreground'}`}>
                Mağaza <ChevronRight size={14} className="rotate-90 group-hover:rotate-[270deg] transition-transform" />
              </Link>
              {/* Mega Menu Container */}
              <div className="absolute top-full -left-20 glass min-w-[500px] p-10 rounded-[3rem] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl z-50">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-4">POPÜLER KATELOGLAR</h4>
                       <div className="space-y-2">
                          {[
                            { name: 'Aksesuar', desc: 'Zamanın ötesinde tasarımlar', icon: <Watch size={18} /> },
                            { name: 'Ses', desc: 'Ether serisi premium kulaklıklar', icon: <Headphones size={18} /> },
                            { name: 'Bilgisayar', desc: 'Shadow Slim fütüristik laptoplar', icon: <Laptop size={18} /> },
                            { name: 'Ev Otomasyonu', desc: 'Akıllı yaşam üniteleri', icon: <Smartphone size={18} /> }
                          ].map(cat => (
                            <Link key={cat.name} to={`/shop?category=${cat.name}`} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group/item">
                               <div className="p-3 bg-muted rounded-xl text-muted-foreground group-hover/item:text-primary group-hover/item:bg-primary/10 transition-colors">
                                  {cat.icon}
                               </div>
                               <div>
                                  <p className="text-sm font-bold tracking-tight">{cat.name}</p>
                                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{cat.desc}</p>
                               </div>
                            </Link>
                          ))}
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60 border-b border-primary/10 pb-4">ÖZELLER &İNDİRİMLER</h4>
                       <div className="space-y-4 pt-2">
                          <Link to="/trending" className="block glass p-6 rounded-3xl border border-primary/20 bg-primary/5 hover:scale-105 transition-transform group/trend">
                             <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black tracking-widest text-primary">TRENDING NOW</span>
                                <ArrowRight size={14} className="group-hover/trend:translate-x-1 transition-transform" />
                             </div>
                             <p className="font-black italic tracking-tighter text-lg underline decoration-primary/30">QUANTUM SERİSİNDE %30 FIRSAT</p>
                          </Link>
                          <div className="p-6 rounded-3xl bg-muted/30 border border-white/5 space-y-2">
                             <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-widest">Tüm yeni üyelere ilk alışverişte geçerli özel indirim kodu!</p>
                             <span className="text-primary font-black italic tracking-tighter cursor-pointer hover:underline text-lg">KOD: NEXGEN2026</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <Link to="/shop" className="block mt-8 p-4 bg-primary text-white text-center rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-lg hover:shadow-primary/30 transition-shadow">TÜM MAĞAZAYI KEŞFET</Link>
              </div>
            </div>

            <Link to="/trending" className={`relative text-sm font-black tracking-widest transition-all hover:text-primary flex items-center gap-2 ${location.pathname === '/trending' ? 'text-primary' : 'text-muted-foreground'}`}>
              Trendler
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
            </Link>

            <Link to="/inventory" className={`text-sm font-black tracking-widest transition-all hover:text-primary flex items-center gap-2 ${location.pathname === '/inventory' ? 'text-primary' : 'text-muted-foreground'}`}>
              Envanter
              <span className="px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[8px] font-black border border-green-500/20">LIVE</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative group cursor-pointer p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
              <Search size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <Link to="/wishlist" className="relative p-2 hover:bg-muted rounded-full transition-colors group hidden sm:block">
              <Heart size={20} className="group-hover:scale-110 transition-transform text-red-500" />
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors group">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </Link>
            <button className="md:hidden p-2 hover:bg-muted rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <AnimatePresence mode="wait">
              {user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden md:flex items-center gap-4 bg-muted/40 pr-2 py-1.5 rounded-full border border-primary/20 group/user"
                >
                   <Link to="/profile" className="flex items-center gap-3 pl-1 group/link">
                      <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-white text-xs group-hover/link:scale-110 transition-transform overflow-hidden">
                        {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name[0]}
                      </div>
                      <span className="text-xs font-black tracking-tight group-hover/link:text-primary transition-all uppercase italic truncate max-w-[100px]">{user.name}</span>
                   </Link>
                   <button 
                     onClick={handleLogout}
                     className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors"
                   >
                     <X size={14} />
                   </button>
                </motion.div>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-black hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest italic">
                  <span>GİRİŞ YAP</span>
                </Link>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] glass flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <img 
                  src="/logo.png" 
                  alt="NexGen Logo" 
                  className="w-10 h-10 object-contain" 
                />
                <span className="text-2xl font-black tracking-tighter">NEXGEN</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-full">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black tracking-tight hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t">
               <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center gap-2 font-bold">
                 {isDarkMode ? <Sun /> : <Moon />} {isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 min-h-screen">
        {/* Ana Sayfa geri butonu - sadece / dışındaki sayfalarda göster */}
        {location.pathname !== '/' && (
          <div className="container mx-auto px-6 pt-2 pb-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all font-bold text-sm group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft size={16} />
              </span>
              <Home size={15} className="group-hover:scale-110 transition-transform" />
              <span className="italic tracking-tight">Ana Sayfa</span>
            </Link>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Footer - FAQ sayfasında gizlenir */}
      {location.pathname !== '/faq' && (
      <footer className="bg-muted/50 border-t py-20 mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="NexGen Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-xl font-black tracking-tighter">NEXGENSHOP</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Geleceğin teknolojileri ve lüks tasarımlarıyla e-ticaret deneyimini yeniden tanımlıyoruz. NexGen, şıklığı ve hızı bir araya getirir.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Facebook size={20} />, label: 'Facebook' },
                { icon: <Instagram size={20} />, label: 'Instagram' }
              ].map(social => (
                <a key={social.label} href="#" className="w-11 h-11 rounded-full bg-background border border-border flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 underline decoration-primary/30 decoration-2 italic tracking-tighter uppercase">Hızlı Menü</h4>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li><Link to="/shop" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Mağaza</Link></li>
              <li><Link to="/trending" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Trendler</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Envanter</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Sıkça Sorulanlar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 underline decoration-primary/30 decoration-2 italic tracking-tighter uppercase">Müşteri İlişkileri</h4>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li><Link to="/faq" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> SSS</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Kargo Takip</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> İade Politikası</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" /> Destek Hattı</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t text-center text-sm text-muted-foreground font-medium">
          © {new Date().getFullYear()} NexGen E-Ticaret A.Ş. Tüm Hakları Saklıdır.
        </div>
      </footer>
      )}
    </div>
  );
}
