import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Package, MapPin, CreditCard, Settings, LogOut, ChevronRight,
  ShieldCheck, Clock, Star, ExternalLink, ShoppingBag,
  Trash2, Edit2, Plus, CheckCircle2, X, Eye, EyeOff
} from 'lucide-react';

/* ── küçük toast bildirimi ─────────────────────────────────── */
function Toast({ msg, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold tracking-wide"
    >
      <CheckCircle2 size={20} />
      {msg}
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={16} /></button>
    </motion.div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [toast, setToast] = useState('');

  /* kullanıcı */
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('user');
      const defaults = {
        name: 'GÖKHAN GÜVEN', email: 'ggokhan614@gmail.com',
        avatar: '/avatar.png',
        since: 'MART 2024', level: 'PLATINUM ÜYE', phone: '+90 (532) 123 45 67'
      };
      return s ? { ...defaults, ...JSON.parse(s) } : defaults;
    } catch { return { name: 'GÖKHAN GÜVEN', email: 'ggokhan614@gmail.com', avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299531-5210371.png', since: 'MART 2024', level: 'PLATINUM ÜYE', phone: '+90 (532) 123 45 67' }; }
  });

  /* siparişler */
  const [orders] = useState([
    { id: 'ORD-9921', date: '10 Mart 2024', status: 'Kargoda', total: '$1,299', items: ['Novis Quantum Watch', 'Ether Pro Headphones'], image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&h=200&fit=crop' },
    { id: 'ORD-8812', date: '28 Şubat 2024', status: 'Teslim Edildi', total: '$849', items: ['Shadow Slim Laptop'], image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&h=200&fit=crop' }
  ]);

  /* adresler */
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Ev Adresi', address: 'Maslak Plaza No:4, Şişli/İstanbul', type: 'Primary' },
    { id: 2, title: 'Ofis Adresi', address: 'Teknokent B Blok Kat:2, Maslak/İstanbul', type: 'Work' }
  ]);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({ title: '', address: '', type: 'Home' });

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Adres silindi.');
  };
  const saveAddress = () => {
    if (!newAddr.title || !newAddr.address) return;
    setAddresses(prev => [...prev, { id: Date.now(), ...newAddr }]);
    setNewAddr({ title: '', address: '', type: 'Home' });
    setAddingAddress(false);
    showToast('Yeni adres eklendi!');
  };

  /* kartlar */
  const [payments, setPayments] = useState([
    { id: 1, last4: '4242', expiry: '12/26', brand: 'Mastercard' },
    { id: 2, last4: '8812', expiry: '05/25', brand: 'Visa' }
  ]);
  const [addingCard, setAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ last4: '', expiry: '', brand: 'Visa' });

  const deleteCard = (id) => {
    setPayments(prev => prev.filter(p => p.id !== id));
    showToast('Kart silindi.');
  };
  const saveCard = () => {
    if (!newCard.last4 || !newCard.expiry) return;
    setPayments(prev => [...prev, { id: Date.now(), ...newCard }]);
    setNewCard({ last4: '', expiry: '', brand: 'Visa' });
    setAddingCard(false);
    showToast('Yeni kart eklendi!');
  };

  /* güvenlik */
  const [pwForm, setPwForm] = useState({ current: '', next: '' });
  const [showPw, setShowPw] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const updatePassword = (e) => {
    e.preventDefault();
    if (!pwForm.current || !pwForm.next) return;
    setPwForm({ current: '', next: '' });
    showToast('Şifreniz güncellendi!');
  };

  /* ayarlar */
  const [settingsForm, setSettingsForm] = useState({ name: user.name, email: user.email, phone: user.phone, lang: 'tr' });
  const saveSettings = (e) => {
    e.preventDefault();
    const updated = { ...user, name: settingsForm.name, email: settingsForm.email, phone: settingsForm.phone };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    showToast('Hesap bilgileri güncellendi!');
  };

  /* çıkış */
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  /* toast */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const menuItems = [
    { id: 'orders',    name: 'Siparişlerim',       icon: Package },
    { id: 'addresses', name: 'Adres Bilgilerim',    icon: MapPin },
    { id: 'payments',  name: 'Ödeme Yöntemlerim',  icon: CreditCard },
    { id: 'security',  name: 'Güvenlik & Şifre',   icon: ShieldCheck },
    { id: 'settings',  name: 'Hesap Ayarları',     icon: Settings }
  ];

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast} onClose={() => setToast('')} />}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* ── Sol Sidebar ── */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
            <div className="relative z-10 text-center space-y-6">
              <div className="relative inline-block">
                <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-[2.5rem] border-4 border-primary/20 object-cover shadow-2xl" />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">{user.name}</h2>
                <p className="text-muted-foreground font-medium">{user.email}</p>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <div className="bg-primary/10 text-primary border border-primary/20 px-5 py-2 rounded-2xl font-black text-[10px] tracking-widest uppercase">{user.level || 'PLATINUM ÜYE'}</div>
                <div className="bg-muted/30 text-muted-foreground border border-white/5 px-5 py-2 rounded-2xl font-black text-[10px] tracking-widest uppercase">KATILIM: {user.since || 'MART 2024'}</div>
              </div>
            </div>
          </div>

          <nav className="glass p-6 rounded-[3rem] border border-border/50">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-primary transition-colors'} />
                    <span className="font-bold italic tracking-tighter uppercase">{item.name}</span>
                  </div>
                  <ChevronRight size={18} className={`transition-transform ${activeTab === item.id ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold italic tracking-tighter border-t border-border/50 mt-4 pt-8 uppercase"
              >
                <LogOut size={20} />
                Çıkış Yap
              </button>
            </div>
          </nav>
        </div>

        {/* ── Sağ İçerik ── */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">

            {/* ─ Siparişler ─ */}
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-4xl font-black italic tracking-tighter uppercase">Sipariş <span className="text-gradient">Geçmişim</span></h3>
                  <div className="glass px-5 py-2 rounded-full border border-border text-xs font-black tracking-widest uppercase text-muted-foreground">TOPLAM {orders.length}</div>
                </div>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="glass rounded-[3rem] border border-border/50 hover:border-primary/30 transition-all">
                      <div className="p-8 flex flex-col md:flex-row gap-6 items-center">
                        <img src={order.image} alt="order" className="w-28 h-28 rounded-3xl object-cover shadow-xl flex-shrink-0" />
                        <div className="flex-1 space-y-3 text-center md:text-left">
                          <p className="text-[10px] font-black tracking-widest text-primary uppercase">TAKİP: {order.id}</p>
                          <h4 className="text-lg font-bold italic tracking-tighter uppercase">{order.items.join(', ')}</h4>
                          <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground"><Clock size={13} /> {order.date}</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${order.status === 'Kargoda' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>{order.status}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                          <span className="text-2xl font-black italic tracking-tighter">{order.total}</span>
                          <button
                            onClick={() => showToast(`${order.id} siparişi detayı açılıyor...`)}
                            className="p-4 bg-muted rounded-2xl hover:bg-primary hover:text-white transition-all hover:scale-110"
                          >
                            <ExternalLink size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass p-10 rounded-[3rem] border border-border/50 bg-primary/5 flex items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black italic tracking-tighter">YARDIMA MI İHTİYACINIZ VAR?</h4>
                    <p className="text-muted-foreground font-medium text-sm">Siparişlerinizle ilgili sorunlarda 7/24 yanınızdayız.</p>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-black italic uppercase tracking-tighter hover:shadow-xl transition-all flex items-center gap-2 flex-shrink-0"
                  >
                    DESTEK AL <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─ Adresler ─ */}
            {activeTab === 'addresses' && (
              <motion.div key="addresses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-4xl font-black italic tracking-tighter uppercase">ADRES <span className="text-gradient">BİLGİLERİM</span></h3>
                  <button
                    onClick={() => setAddingAddress(true)}
                    className="bg-primary text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-black italic text-xs tracking-widest uppercase hover:shadow-xl transition-all"
                  >
                    <Plus size={16} /> YENİ ADRES
                  </button>
                </div>

                {/* Yeni adres formu */}
                <AnimatePresence>
                  {addingAddress && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass p-8 rounded-[2.5rem] border border-primary/30 space-y-4">
                      <h4 className="font-black italic tracking-tighter uppercase text-lg text-primary">Yeni Adres Ekle</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Adres başlığı (Ev, Ofis...)" value={newAddr.title} onChange={e => setNewAddr(p => ({ ...p, title: e.target.value }))} className="bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all" />
                        <select value={newAddr.type} onChange={e => setNewAddr(p => ({ ...p, type: e.target.value }))} className="bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all">
                          <option>Home</option><option>Work</option><option>Primary</option>
                        </select>
                      </div>
                      <textarea placeholder="Tam adres..." value={newAddr.address} onChange={e => setNewAddr(p => ({ ...p, address: e.target.value }))} rows={2} className="w-full bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all resize-none" />
                      <div className="flex gap-3">
                        <button onClick={saveAddress} className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-tighter hover:shadow-lg transition-all">KAYDET</button>
                        <button onClick={() => setAddingAddress(false)} className="px-6 py-4 bg-muted rounded-2xl font-bold hover:bg-red-500/10 hover:text-red-500 transition-all">İPTAL</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map(addr => (
                    <div key={addr.id} className="glass p-8 rounded-[3rem] border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                        <button onClick={() => deleteAddress(addr.id)} className="p-2.5 bg-card/90 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-border/50"><Trash2 size={15} /></button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"><MapPin size={22} /></div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black tracking-widest text-primary uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />{addr.type} ADRES
                          </p>
                          <h4 className="text-xl font-black italic tracking-tighter uppercase">{addr.title}</h4>
                          <p className="text-muted-foreground font-medium text-sm leading-relaxed">{addr.address}</p>
                        </div>
                        <div className="pt-3 border-t border-border/50 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          <Clock size={11} /> Son Güncelleme: 1 Hafta Önce
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setAddingAddress(true)}
                    className="border-2 border-dashed border-border/50 rounded-[3rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary min-h-[220px]"
                  >
                    <div className="p-4 bg-muted rounded-full group-hover:bg-primary group-hover:text-white transition-all"><Plus size={28} /></div>
                    <span className="font-black italic tracking-tighter uppercase text-sm">YENİ ADRES EKLE</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─ Ödeme ─ */}
            {activeTab === 'payments' && (
              <motion.div key="payments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-4xl font-black italic tracking-tighter uppercase">ÖDEME <span className="text-gradient">YÖNTEMLERİM</span></h3>
                  <button onClick={() => setAddingCard(true)} className="bg-primary text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-black italic text-xs tracking-widest uppercase hover:shadow-xl transition-all">
                    <Plus size={16} /> YENİ KART
                  </button>
                </div>

                <AnimatePresence>
                  {addingCard && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass p-8 rounded-[2.5rem] border border-primary/30 space-y-4">
                      <h4 className="font-black italic tracking-tighter uppercase text-lg text-primary">Yeni Kart Ekle</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input maxLength={4} placeholder="Son 4 hane" value={newCard.last4} onChange={e => setNewCard(p => ({ ...p, last4: e.target.value }))} className="bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all" />
                        <input placeholder="SS/YY" value={newCard.expiry} onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))} className="bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all" />
                        <select value={newCard.brand} onChange={e => setNewCard(p => ({ ...p, brand: e.target.value }))} className="bg-muted/40 border-2 border-border/50 px-5 py-4 rounded-2xl font-bold focus:border-primary outline-none transition-all">
                          <option>Visa</option><option>Mastercard</option><option>Amex</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={saveCard} className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-tighter hover:shadow-lg transition-all">KAYDET</button>
                        <button onClick={() => setAddingCard(false)} className="px-6 py-4 bg-muted rounded-2xl font-bold hover:bg-red-500/10 hover:text-red-500 transition-all">İPTAL</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-5">
                  {payments.map(pay => (
                    <div key={pay.id} className="glass p-7 rounded-[2.5rem] border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-12 bg-muted rounded-xl flex items-center justify-center border border-border/50 group-hover:border-primary/20 transition-all">
                          <span className="text-xs font-black italic text-muted-foreground group-hover:text-primary transition-colors">{pay.brand}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-black italic tracking-tighter uppercase">•••• •••• •••• {pay.last4}</h4>
                          <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest mt-0.5">SON KULLANIM: {pay.expiry}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteCard(pay.id)} className="p-3.5 bg-muted/50 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─ Güvenlik ─ */}
            {activeTab === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase px-2">GÜVENLİK <span className="text-gradient">& ŞİFRE</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <form onSubmit={updatePassword} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-primary uppercase px-1">Mevcut Şifre</label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} placeholder="••••••••" required value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} className="w-full bg-muted/30 border-2 border-border/50 px-6 py-5 pr-14 rounded-3xl font-bold focus:border-primary outline-none transition-all" />
                        <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">{showPw ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-primary uppercase px-1">Yeni Şifre</label>
                      <input type={showPw ? 'text' : 'password'} placeholder="••••••••" required value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} className="w-full bg-muted/30 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary outline-none transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-5 rounded-3xl font-black italic text-lg tracking-tighter uppercase hover:shadow-2xl shadow-primary/20 transition-all">ŞİFREYİ GÜNCELLE</button>
                  </form>

                  <div className="glass p-8 rounded-[3rem] border border-border/50 space-y-6 h-fit bg-primary/5">
                    <div className="flex items-center gap-3 text-primary"><ShieldCheck size={28} /><h4 className="text-xl font-black italic tracking-tighter uppercase">Hesap Güvende</h4></div>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed italic border-l-4 border-primary/30 pl-5">256-bit SSL şifreleme ve gelişmiş koruma katmanları aktiftir. Şifrenizi belirli aralıklarla güncelleyin.</p>
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border">
                      <span className="font-bold text-sm">2 Faktörlü Doğrulama</span>
                      <button
                        onClick={() => { setTwoFA(v => !v); showToast(twoFA ? '2FA devre dışı bırakıldı.' : '2FA aktif edildi!'); }}
                        className={`w-14 h-7 rounded-full relative transition-all ${twoFA ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${twoFA ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─ Ayarlar ─ */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase px-2">HESAP <span className="text-gradient">AYARLARI</span></h3>
                <form onSubmit={saveSettings} className="glass p-10 rounded-[3rem] border border-border/50 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Görünür İsim', key: 'name', type: 'text' },
                      { label: 'E-Posta Adresi', key: 'email', type: 'email' },
                      { label: 'Telefon Numarası', key: 'phone', type: 'text' }
                    ].map(f => (
                      <div key={f.key} className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest text-primary uppercase px-1">{f.label}</label>
                        <input type={f.type} value={settingsForm[f.key]} onChange={e => setSettingsForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary outline-none transition-all" />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-primary uppercase px-1">Dil Seçimi</label>
                      <select value={settingsForm.lang} onChange={e => setSettingsForm(p => ({ ...p, lang: e.target.value }))} className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                        <option value="tr">Türkçe (TR)</option>
                        <option value="en">English (US)</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div>
                      <p className="font-bold italic">Hassas Veriler</p>
                      <p className="text-xs text-muted-foreground font-medium italic mt-1">Değişiklikler kaydedildiğinde hesabınız güncellenir.</p>
                    </div>
                    <button type="submit" className="bg-primary text-white px-10 py-5 rounded-3xl font-black italic tracking-tighter text-lg hover:shadow-2xl shadow-primary/20 transition-all uppercase">DEĞİŞİKLİKLERİ KAYDET</button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
