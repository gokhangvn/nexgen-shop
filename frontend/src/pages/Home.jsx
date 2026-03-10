import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, ShoppingBag, Star, HelpCircle, RotateCcw, ShieldCheck, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative overflow-hidden pt-20 pb-32 lg:pt-48 lg:pb-52">
    {/* Dark Gradient Arka Plan */}
    <div className="absolute inset-0 bg-background -z-10">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
    </div>

    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary font-bold text-sm"
          >
            <Zap size={16} fill="currentColor" />
            <span>GELECEĞİN TEKNOLOJİSİ BURADA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight"
          >
            Sınırları <span className="text-gradient italic">Zorlayın</span>, <br />
            Tarzınızı <span className="underline decoration-primary/40 underline-offset-8">Keşfedin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
          >
            NexGen E-Ticaret ile teknoloji ve lüksün mükemmel uyumunu hissedin. Sadece ürün değil, bir yaşam tarzı sunuyoruz.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
          >
            <Link to="/shop" className="group flex items-center gap-3 bg-primary text-white border-2 border-primary px-10 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
              Hemen Alışverişe Başla
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/trending" className="flex items-center gap-2 px-10 py-5 rounded-full border-2 border-border font-black text-lg hover:bg-muted transition-all">
              Trendleri Gör
            </Link>
          </motion.div>
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border/50 max-w-sm mx-auto lg:mx-0">
             <div className="text-center">
                <span className="block text-3xl font-black">15K+</span>
                <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Müşteri</span>
             </div>
             <div className="text-center border-l border-r border-border px-8">
                <span className="block text-3xl font-black">200+</span>
                <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Marka</span>
             </div>
             <div className="text-center">
                <span className="block text-3xl font-black">4.9/5</span>
                <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Puan</span>
             </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="flex-1 relative"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[150px] group-hover:bg-primary/50 transition-all duration-700" />
            <img
              src="/premium_gadget_hero_1773103759031.png"
              alt="Premium Gadget"
              className="relative w-full z-10 animate-float drop-shadow-2xl"
            />
            {/* Ürün İsmi ve Açıklaması */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2 }}
               className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center space-y-2 z-30"
            >
               <h3 className="text-3xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">NEXGEN NOVA CORE</h3>
               <p className="text-xs font-bold text-white/70 uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/10">Dijital Yaşamınızın Kalbi</p>
            </motion.div>
          </div>
          {/* Süzülen Küçük Bilgi Kartları */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-8 top-1/4 glass p-4 rounded-2xl border shadow-2xl z-20 flex items-center gap-4 max-w-[200px]"
          >
            <div className="p-3 bg-green-500/20 text-green-500 rounded-xl">
               <Shield size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-muted-foreground">Güvence</p>
               <p className="text-sm font-black italic">2 Yıl Garanti</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -left-8 bottom-1/4 glass p-4 rounded-2xl border shadow-2xl z-20 flex items-center gap-4 max-w-[200px]"
          >
            <div className="p-3 bg-primary/20 text-primary rounded-xl">
               <ShoppingBag size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-muted-foreground">Stok</p>
               <p className="text-sm font-black italic">Sınırlı Adet</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="p-8 rounded-3xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all group">
     <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
        <Icon size={32} />
     </div>
     <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
     <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
  </div>
);

const Features = () => (
  <section className="py-24 container mx-auto px-6">
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
       <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">Neden NexGen?</span>
       <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Geleneksel Alışverişe <span className="italic text-gradient">Lüks Bir Alternatif</span></h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <Feature
         icon={Zap}
         title="Ultra Hızlı Teslimat"
         desc="Siparişleriniz en son lojistik teknolojileriyle 24 saat içinde kapınızda."
       />
       <Feature
         icon={Globe}
         title="Global Markalar"
         desc="Dünyanın her yerinden seçkin markalar ve özel tasarım ürünler."
       />
       <Feature
         icon={Star}
         title="Premium Deneyim"
         desc="Kişiselleştirilmiş alışveriş asistanları ve lüks paketleme seçenekleri."
       />
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <Features />

      {/* SSS Özet Bölümü (Footer Üstü) */}
      <section className="py-24 container mx-auto px-6 border-t border-border/50">
         <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase">
                  <HelpCircle size={14} />
                  <span>DESTEK MERKEZİ</span>
               </div>
               <h2 className="text-5xl font-black tracking-tighter italic leading-[0.9]">AKLINIZDA <br /><span className="text-gradient">SORU KALMASIN</span></h2>
               <p className="text-muted-foreground font-medium leading-relaxed">NexGen deneyimi hakkında en çok merak edilen konuları sizin için özetledik.</p>
               <Link to="/faq" className="inline-flex items-center gap-2 text-primary font-black italic tracking-tighter hover:underline group text-lg">
                  TÜM SORULARI GÖR <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                  { icon: <Truck />, title: 'HIZLI TESLİMAT', desc: 'İstanbul içi 24 saat, tüm Türkiye 1-3 iş günü.', href: '/faq#teslimat' },
                  { icon: <RotateCcw />, title: 'KOLAY İADE', desc: '14 gün içinde koşulsuz, ücretsiz iade garantisi.', href: '/faq#iade' },
                  { icon: <ShieldCheck />, title: 'GÜVENLİ ÖDEME', desc: 'Uçtan uca şifreli, 256-bit SSL korumalı altyapı.', href: '/faq#odeme' },
                  { icon: <Package />, title: 'HEDİYE PAKETİ', desc: 'Tüm ürünlerde ücretsiz lüks paketleme seçeneği.', href: '/faq#garanti' }
               ].map((item, i) => (
                  <Link key={i} to={item.href} className="glass p-8 rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all group cursor-pointer">
                     <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-rotate-6">
                        {item.icon}
                     </div>
                     <h4 className="text-xl font-black italic tracking-tighter mb-2">{item.title}</h4>
                     <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                  </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
