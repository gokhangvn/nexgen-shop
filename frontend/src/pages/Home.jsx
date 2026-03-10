import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, ShoppingBag, Star, HelpCircle, RotateCcw, ShieldCheck, Package, Truck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Animasyonlu bölüm sarmalayıcı ── */
const Section = ({ id, className = '', children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/* ── Hero ── */
const Hero = () => (
  <section id="hero" className="relative overflow-hidden min-h-screen flex items-center pt-20">
    <div className="absolute inset-0 bg-background -z-10">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
    </div>

    <div className="container mx-auto px-6 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Sol Metin */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 text-primary font-bold text-xs"
          >
            <Zap size={14} fill="currentColor" />
            <span>GELECEĞİN TEKNOLOJİSİ BURADA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight"
          >
            Sınırları <span className="text-gradient italic">Zorlayın</span>, <br />
            Tarzınızı <span className="underline decoration-primary/40 underline-offset-4">Keşfedin</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
          >
            NexGen E-Ticaret ile teknoloji ve lüksün mükemmel uyumunu hissedin. Sadece ürün değil, bir yaşam tarzı sunuyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/shop" className="group flex items-center gap-3 bg-primary text-white border-2 border-primary px-8 py-4 rounded-full font-black text-base hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
              Hemen Alışverişe Başla
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/trending" className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border font-black text-base hover:bg-muted transition-all">
              Trendleri Gör
            </Link>
          </motion.div>

          {/* İstatistikler */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-border/50 max-w-sm mx-auto lg:mx-0">
            {[['15K+', 'Müşteri'], ['200+', 'Marka'], ['4.9/5', 'Puan']].map(([val, label], i) => (
              <div key={i} className={`text-center ${i === 1 ? 'border-l border-r border-border px-6' : ''}`}>
                <span className="block text-2xl font-black">{val}</span>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Görsel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="flex-1 relative max-w-[45%] hidden lg:flex items-center justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[150px] group-hover:bg-primary/50 transition-all duration-700" />
            <img
              src="/premium_gadget_hero_1773103759031.png"
              alt="Premium Gadget"
              className="mx-auto w-full max-h-[60vh] object-contain object-center z-10 animate-float drop-shadow-2xl"
            />
          </div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="absolute -right-8 top-1/4 glass p-4 rounded-2xl border shadow-2xl z-20 flex items-center gap-4 max-w-[200px]">
            <div className="p-3 bg-green-500/20 text-green-500 rounded-xl"><Shield size={24} /></div>
            <div><p className="text-xs font-bold text-muted-foreground">Güvence</p><p className="text-sm font-black italic">2 Yıl Garanti</p></div>
          </motion.div>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} className="absolute -left-8 bottom-1/4 glass p-4 rounded-2xl border shadow-2xl z-20 flex items-center gap-4 max-w-[200px]">
            <div className="p-3 bg-primary/20 text-primary rounded-xl"><ShoppingBag size={24} /></div>
            <div><p className="text-xs font-bold text-muted-foreground">Stok</p><p className="text-sm font-black italic">Sınırlı Adet</p></div>
          </motion.div>
        </motion.div>
      </div>
    </div>

  </section>
);

/* ── Özellik Kartı ── */
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 rounded-3xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all group">
    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
  </div>
);

export default function Home() {
  // Sayfa içi smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }, []);

  return (
    <div className="bg-background">
      {/* ── 1. BÖLÜM: HERO ── */}
      <Hero />

      {/* ── 2. BÖLÜM: NEDEN NEXGEN ── */}
      <Section id="neden-nexgen" className="py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">Neden NexGen?</span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
            Geleneksel Alışverişe <span className="italic text-gradient">Lüks Bir Alternatif</span>
          </h2>
          <p className="text-muted-foreground font-medium text-lg">Yüzlerce markayla, milyonlarca ürüne erişin.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={Zap} title="Ultra Hızlı Teslimat" desc="Siparişleriniz en son lojistik teknolojileriyle 24 saat içinde kapınızda." />
          <FeatureCard icon={Globe} title="Global Markalar" desc="Dünyanın her yerinden seçkin markalar ve özel tasarım ürünler." />
          <FeatureCard icon={Star} title="Premium Deneyim" desc="Kişiselleştirilmiş alışveriş asistanları ve lüks paketleme seçenekleri." />
        </div>
      </Section>

      {/* ── 3. BÖLÜM: RAKAMLAR ── */}
      <Section id="rakamlar" className="py-32 border-t border-border/30">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">Güven ve Kalite</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
              Rakamlar <span className="italic text-gradient">Her Şeyi Anlatıyor</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { val: '15K+', label: 'Mutlu Müşteri', icon: Star },
              { val: '200+', label: 'Premium Marka', icon: Globe },
              { val: '50+', label: 'Ülkeye Gönderim', icon: Truck },
              { val: '4.9/5', label: 'Ortalama Puan', icon: ShieldCheck },
            ].map(({ val, label, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-10 rounded-[3rem] border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>
                <p className="text-5xl font-black italic tracking-tighter text-gradient mb-2">{val}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. BÖLÜM: SSS ÖZETİ ── */}
      <Section id="sss" className="py-32 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase">
                <HelpCircle size={14} />
                <span>DESTEK MERKEZİ</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter italic leading-[0.9]">
                AKLINDA <br /><span className="text-gradient">SORU KALMASIN</span>
              </h2>
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
        </div>
      </Section>

      {/* ── 5. BÖLÜM: CTA ── */}
      <Section id="cta" className="py-32 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="glass rounded-[4rem] border border-primary/20 p-16 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-0" />
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10 space-y-8">
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">Hemen Başlayın</span>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter italic">
                Premium Alışverişe <br /><span className="text-gradient">Hazır mısınız?</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                Binlerce premium ürün, hızlı teslimat ve üstün müşteri hizmetleriyle fark yaratın.
              </p>
              <div className="flex flex-wrap gap-6 justify-center pt-4">
                <Link to="/shop" className="group flex items-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-black text-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Alışverişe Başla <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-12 py-6 rounded-full border-2 border-border font-black text-xl hover:bg-muted transition-all">
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
