import React, { useState, useEffect } from 'react';
import { Package, RefreshCw, AlertCircle, Search, Edit3, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', quantity: '', category: 'Genel' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({ name: '', quantity: '', category: 'Genel' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="glass w-full max-w-lg p-10 rounded-[3rem] relative z-10 border border-white/20 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black italic tracking-tighter">YENİ STOK <span className="text-gradient">EKLE</span></h3>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-muted rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Ürün Adı</label>
                <input 
                  required
                  className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Kategori</label>
                   <select 
                    className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                   >
                     <option value="Aksesuar">Aksesuar</option>
                     <option value="Ses">Ses</option>
                     <option value="Bilgisayar">Bilgisayar</option>
                     <option value="Ev Otomasyonu">Ev Otomasyonu</option>
                   </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Miktar</label>
                  <input 
                    type="number"
                    required
                    className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>
              <button className="w-full bg-primary text-white py-6 rounded-3xl font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">STOKU KAYDET</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/inventory');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (newItem) => {
    try {
      const res = await fetch('http://localhost:3001/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.success) fetchInventory();
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/inventory/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) fetchInventory();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
         <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">ENVANTER <span className="text-gradient">MERKEZİ</span></h1>
            <p className="text-lg text-muted-foreground font-semibold max-w-lg">Stok durumunuzu gerçek zamanlı olarak izleyin ve optimize edin.</p>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-black hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1"
            >
               <Plus size={20} />
               YENİ STOK
            </button>
            <button 
              onClick={fetchInventory}
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-8 py-4 rounded-full font-black transition-all"
            >
               <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
               YENİLE
            </button>
         </div>
      </div>

      {/* Envanter Kart Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         <AnimatePresence>
            {items.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative glass p-8 rounded-[3.5rem] border border-border/50 hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/10 overflow-hidden flex flex-col justify-between min-h-[320px]"
              >
                 {/* Kart Başı: İkon ve Aksiyonlar */}
                 <div className="flex justify-between items-start">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:rotate-12 transition-transform duration-500">
                       <Package size={28} />
                    </div>
                    {/* Hover Aksiyonları - Sadece maus ile üzerine gelince gözükür */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                       <button className="p-3 bg-white text-black hover:bg-primary hover:text-white rounded-xl transition-all shadow-lg active:scale-95">
                          <Edit3 size={16} />
                       </button>
                       <button 
                        onClick={() => deleteItem(item.id)}
                        className="p-3 bg-red-500 text-white hover:bg-red-600 rounded-xl transition-all shadow-lg active:scale-95"
                       >
                          <Trash2 size={16} />
                       </button>
                    </div>
                 </div>

                 {/* Kart Ortası: İsim ve Kategori */}
                 <div className="mt-8 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">{item.category}</span>
                    <h3 className="text-2xl font-black italic tracking-tighter leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                 </div>

                 {/* Kart Sonu: Stok ve Durum */}
                 <div className="mt-10 border-t border-border/50 pt-6 flex items-end justify-between">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">GÜNCEL STOK</p>
                       <span className="text-4xl font-black italic tracking-tighter text-foreground">{item.quantity}</span>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.quantity > 5 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'}`}>
                       {item.quantity > 5 ? 'GÜVENLİ' : 'KRİTİK STOK'}
                    </div>
                 </div>

                 {/* Arka Plan Dekorasyonu */}
                 <div className="absolute -bottom-6 -right-6 text-primary/5 -z-10 group-hover:scale-110 transition-transform duration-1000">
                    <Package size={140} />
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>

         {/* Boş Durum Görünümü */}
         {!isLoading && items.length === 0 && (
           <div className="col-span-full text-center py-40 glass rounded-[4rem] border border-dashed border-border/50 space-y-6">
              <div className="w-20 h-20 bg-muted/40 rounded-full mx-auto flex items-center justify-center text-muted-foreground">
                 <Package size={32} />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase tracking-widest opacity-40">ENVANTER LİSTENİZ BOŞ</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-primary font-black hover:underline"
              >
                HEMEN İLK STOKU EKLEYİN
              </button>
           </div>
         )}
      </div>
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addItem} />
    </div>
  );
}
