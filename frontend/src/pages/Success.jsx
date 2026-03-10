import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="container mx-auto px-6 py-40 min-h-screen text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: 'spring', damping: 20 }}
        className="max-w-2xl mx-auto space-y-12"
      >
        <div className="relative inline-block">
           <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full animate-pulse" />
           <motion.div 
             initial={{ rotate: -20 }} 
             animate={{ rotate: 0 }} 
             className="relative p-10 bg-green-500 text-white rounded-[3rem] shadow-2xl shadow-green-500/40"
           >
              <CheckCircle size={80} />
           </motion.div>
        </div>

        <div className="space-y-6">
           <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic uppercase tracking-tighter">SİPARİŞİNİZ <span className="text-gradient">ALINDI</span></h1>
           <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">Teşekkürler! Siparişiniz başarıyla onaylandı ve lüks hazırlık sürecimiz başladı.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
           <div className="glass p-8 rounded-[2.5rem] border border-green-500/30 flex items-center gap-6">
              <div className="p-4 bg-green-500/20 text-green-500 rounded-2xl"><Package size={24} /></div>
              <div className="text-left">
                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sipariş No</p>
                 <p className="text-lg font-black italic tracking-tighter">#NXG-2026-88</p>
              </div>
           </div>
           <div className="glass p-8 rounded-[2.5rem] border border-primary/30 flex items-center gap-6">
              <div className="p-4 bg-primary/20 text-primary rounded-2xl"><Truck size={24} /></div>
              <div className="text-left">
                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Durum</p>
                 <p className="text-lg font-black italic tracking-tighter text-primary">Hazırlanıyor</p>
              </div>
           </div>
        </div>

        <div className="pt-20 flex flex-wrap items-center justify-center gap-8 text-center">
           <Link to="/shop" className="group flex items-center gap-4 text-2xl font-black italic tracking-tighter hover:text-primary transition-colors">
              ALIŞVERİŞE DEVAM ET
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
