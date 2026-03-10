import React from 'react';
import { Truck, MapPin, Package, ShieldCheck, Clock, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Shipping() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
         <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
               <Truck size={40} />
            </div>
            <h1 className="text-6xl font-black tracking-tighter italic uppercase tracking-tighter">KARGO VE <span className="text-gradient font-bold italic">TESLİMAT</span></h1>
            <p className="text-xl text-muted-foreground font-medium italic underline decoration-primary/20 decoration-4">Siparişlerinizin size en hızlı ve güvenli şekilde ulaşması için lüks lojistik altyapımızı kullanıyoruz.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><Clock size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">TESLİMAT SÜRESİ</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">İstanbul içi siparişlerinizde 24 saat, diğer illerde ise 1-3 iş günü içerisinde teslimat garantisi sunuyoruz. express kurye seçeneğimizle aynı gün teslimat mümkündür.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><ShieldCheck size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">GÜVENLİ PAKETLEME</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">Tüm ürünlerimiz darbelere dayanıklı, NexGen özel koleksiyon kutularında ve mühürlü olarak gönderilir. Her paket açılana kadar bizim güvencemiz altındadır.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><Globe size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">LOJİSTİK AĞIMIZ</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">Dünya çapında 50'den fazla ülkede geçerli olan lojistik ağımızla sınırları kaldırıyoruz. Gümrük ve vergi süreçleri tarafımızca yönetilir.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><Shield size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">TAM SİGORTA</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">Her gönderi, fatura tutarı üzerinden tam sigortalıdır. Taşıma sırasında oluşabilecek her türlü aksaklıkta değişim veya iade hakkınız korunur.</p>
            </div>
         </div>

         <div className="p-12 lg:p-16 rounded-[4rem] bg-muted/20 border border-border/50 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 -z-10"><Package size={200} /></div>
            <h2 className="text-4xl font-black tracking-tighter italic uppercase tracking-tighter">SİPARİŞ <span className="text-primary italic">TAKİBİ</span></h2>
            <p className="text-lg text-muted-foreground font-medium">Kargo takip numaranız, siparişiniz yola çıktığında anlık bildirim olarak SMS ve E-posta yoluyla size iletilecektir.</p>
            
            <form className="flex flex-col md:flex-row gap-4">
               <input 
                 type="text" 
                 placeholder="Kargo Takip Numarası (Örn: NXG1234567)" 
                 className="flex-1 bg-background border-2 border-border/50 px-8 py-5 rounded-3xl font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
               />
               <button className="bg-primary text-white px-12 py-5 rounded-3xl font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all uppercase tracking-widest italic">SORGULA</button>
            </form>
         </div>
      </div>
    </div>
  );
}
