import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const [items, setItems] = useState([
     { id: 1, name: "NexGen Quantum Watch", price: 1299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", category: "Aksesuar" },
     { id: 2, name: "Ether Pro Headphones", price: 849.50, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", category: "Ses" }
  ]);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
         <div className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic">FAVORİ <span className="text-gradient">LİSTENİZ</span></h1>
            <p className="text-lg text-muted-foreground font-semibold max-w-lg">Arzuladığınız teknolojileri burada saklayın ve dilediğiniz an koleksiyonunuza katın.</p>
         </div>
         <div className="glass px-10 py-5 rounded-full border border-primary/20 flex items-center gap-4">
            <Heart size={24} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-2xl font-black italic tracking-tighter">{items.length} ÜRÜN</span>
         </div>
      </div>

      <AnimatePresence mode="popLayout">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative bg-card p-4 rounded-[2.5rem] border border-border/50 hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
              >
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 bg-muted/30">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button 
                    onClick={() => removeItem(product.id)}
                    className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-red-500 hover:text-white rounded-full glass transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="px-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</p>
                    <p className="text-lg font-black tracking-tighter">${product.price}</p>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight line-clamp-1">{product.name}</h3>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs hover:bg-primary hover:text-white transition-all">SEPETE EKLE</button>
                    <Link to={`/product/${product.id}`} className="bg-muted p-4 rounded-2xl hover:bg-white transition-colors"><ArrowRight size={18} /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 space-y-8">
            <div className="w-32 h-32 bg-muted rounded-full mx-auto flex items-center justify-center text-muted-foreground animate-float">
               <Heart size={48} />
            </div>
            <h3 className="text-4xl font-black italic tracking-tighter">FAVORİ LİSTENİZ BOŞ</h3>
            <p className="text-xl text-muted-foreground font-medium">Beğendiğiniz ürünlerin kalbine tıklayarak onları buraya ekleyebilirsiniz.</p>
            <Link to="/shop" className="bg-primary text-white px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all inline-block">MAĞAZAYI KEŞFET</Link>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
