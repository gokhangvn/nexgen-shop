import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, Star, ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendTicker = () => (
  <div className="bg-primary/10 border-b border-primary/20 py-3 overflow-hidden whitespace-nowrap relative">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 items-center text-[10px] font-black tracking-[0.3em] uppercase text-primary/80"
    >
      {[1, 2, 3, 4, 5].map(i => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-2"><Flame size={12} fill="currentColor" /> QUANTUM WATCH %40 ARTIŞTA</span>
          <span className="flex items-center gap-2"><TrendingUp size={12} /> ETHER PRO YENİ REKOR KIRDI</span>
          <span className="flex items-center gap-2 text-orange-500 font-bold"><Zap size={12} fill="currentColor" /> FLAŞ İNDİRİM BAŞLADI</span>
          <span className="flex items-center gap-2"><Star size={12} fill="currentColor" /> NOVA SMART HUB 5 YILDIZ ALDI</span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const TrendCard = ({ product, index }) => {
  const trendScore = Math.floor(Math.random() * 20) + 80; // 80-100 arası skor
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-[480px] w-full rounded-[3.5rem] overflow-hidden border border-white/10 glass shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="glass px-4 py-2 rounded-full border border-orange-500/50 text-orange-400 flex items-center gap-2 font-black text-[10px]">
                <Flame size={12} fill="currentColor" />
                POPÜLER
              </div>
              <div className="glass px-4 py-2 rounded-full border border-primary/50 text-primary flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                #{index + 1} TREND
              </div>
            </div>
            {/* Trend Score Metric */}
            <div className="glass px-6 py-4 rounded-3xl border border-white/10 space-y-2 mt-2 group-hover:bg-primary/5 transition-colors">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-white/60">TREND SKORU</span>
                  <span className="text-xl font-black italic text-primary">%{trendScore}</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${trendScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  />
               </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-10 right-10 space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-primary font-bold text-xs uppercase tracking-[0.4em]">{product.category}</p>
                <h3 className="text-3xl font-black tracking-tighter text-white">{product.name}</h3>
              </div>
              <p className="text-3xl font-black text-white italic tracking-tighter">${product.price}</p>
            </div>
            
            <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <Link 
                to={`/product/${product.id}`}
                className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-center text-sm hover:bg-primary hover:text-white transition-all shadow-xl"
              >
                DETAYLARI İNCELE
              </Link>
              <button className="p-4 bg-primary text-white rounded-2xl hover:scale-110 transition-transform shadow-xl">
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Trending() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/products/trending/list')
      .then(res => res.json())
      .then(data => {
        setTrends(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TrendTicker />
      <div className="container mx-auto px-6 pt-12">
        {/* Header Bölümü */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-orange-500/20 text-orange-500 font-bold text-sm tracking-widest"
            >
              <TrendingUp size={16} />
              BU HAFTANIN EN İYİLERİ
            </motion.div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic">
              TRENDLERİ <span className="text-gradient">YAKALAYIN</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-xl">
              Dünya çapında en çok ilgi gören, teknoloji ve zarafetin zirvesindeki ürünler burada.
            </p>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative glass p-10 rounded-[4rem] border-2 border-primary/20 transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
               <div className="space-y-2 text-center">
                  <span className="text-5xl font-black text-primary italic tracking-tighter">HOT</span>
                  <p className="font-bold text-muted-foreground uppercase text-xs tracking-[0.4em]">Sezonun Favorileri</p>
               </div>
            </div>
          </div>
        </div>

        {/* Trend Kartları */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[480px] bg-muted/40 rounded-[3.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trends.map((product, idx) => (
              <TrendCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

        {/* Aksiyon Çağrısı */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 lg:p-20 rounded-[4rem] premium-gradient relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:bg-white/10 transition-colors duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter italic">KAÇIRMAYIN <br /> %20 İNDİRİM</h2>
              <p className="text-lg text-white/70 font-bold max-w-md">Trend ürünlerde NexGen üyelerine özel anlık indirim fırsatları devam ediyor.</p>
            </div>
            <Link to="/shop" className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-white/20">
              TÜM ÜRÜNLERİ GÖR
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
