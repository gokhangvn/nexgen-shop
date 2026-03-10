import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Demo Sepet Verisi (Gerçek uygulamada Context veya Redux kullanılabilir)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'NexGen Quantum Watch',
      price: 1299.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Ether Pro Headphones',
      price: 849.50,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Sepet Listesi */}
        <div className="flex-1 space-y-10">
          <div className="flex items-end justify-between border-b pb-8">
             <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">SEPETİNİZ <span className="text-gradient">({cartItems.length})</span></h1>
             <Link to="/shop" className="text-sm font-black uppercase tracking-widest text-primary hover:underline hover:translate-x-1 transition-all">ALIŞVERİŞE DEVAM ET</Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-32 space-y-8">
               <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <ShoppingBag size={40} className="text-muted-foreground" />
               </div>
               <h3 className="text-3xl font-black italic tracking-tighter">SEPETİNİZ ŞU AN BOŞ</h3>
               <Link to="/shop" className="inline-block bg-primary text-white px-10 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all">KOLEKSİYONLARI KEŞFET</Link>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-[2.5rem] bg-muted/40 border hover:bg-muted/60 transition-all"
                  >
                    <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-3xl" />
                    <div className="flex-1 text-center sm:text-left">
                       <h3 className="text-xl font-bold tracking-tight mb-1">{item.name}</h3>
                       <p className="text-primary font-black italic tracking-tighter text-lg mb-4 sm:mb-0">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4 glass px-4 py-2 rounded-2xl border">
                       <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-muted rounded-lg transition-colors"><Minus size={16} /></button>
                       <span className="font-black text-lg w-8 text-center">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-muted rounded-lg transition-colors"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-4 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                       <Trash2 size={24} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Sipariş Özeti */}
        {cartItems.length > 0 && (
          <aside className="lg:w-[400px] glass p-10 rounded-[3rem] border-2 border-primary/20 sticky top-32 space-y-10">
             <h4 className="text-2xl font-black italic tracking-tighter">SİPARİŞ ÖZETİ</h4>
             
             <div className="space-y-4 font-bold">
                <div className="flex justify-between text-muted-foreground">
                   <span>Ara Toplam</span>
                   <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                   <span>Kargo Ücreti</span>
                   <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl pt-4 border-t-2 border-dashed">
                   <span>Toplam</span>
                   <span className="text-primary tracking-tighter italic text-3xl font-black">${total.toFixed(2)}</span>
                </div>
             </div>

             <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 bg-primary text-white py-6 rounded-[2rem] font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all group">
                   ÖDEMEYE GEÇ
                   <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-50">
                   <CreditCard size={24} />
                   <ShieldCheck size={24} />
                   <div className="text-[10px] font-black tracking-widest leading-tight uppercase">GÜVENLİ <br /> ÖDEME ALTYAPISI</div>
                </div>
             </div>
          </aside>
        )}
      </div>
    </div>
  );
}
