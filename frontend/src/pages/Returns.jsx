import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle, Package, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Returns() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
         <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
               <RotateCcw size={40} />
            </div>
            <h1 className="text-6xl font-black tracking-tighter italic uppercase tracking-tighter">İADE VE <span className="text-gradient font-bold italic">GERİ ÖDEME</span></h1>
            <p className="text-xl text-muted-foreground font-medium italic underline decoration-primary/20 decoration-4">Müşteri memnuniyeti bizim için her şeyden daha önemlidir. Şeffaf ve hızlı iade süreçlerimizle yanınızdayız.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><RotateCcw size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">14 GÜN İADE HAKKI</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">Ambalajı bozulmamış ve kullanılmamış tüm ürünleri, teslim aldığınız tarihten itibaren 14 gün içinde sorgusuz sualsiz iade edebilir veya değişim talep edebilirsiniz.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><ShieldCheck size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">KOLAY SÜREÇ</h3>
               <ul className="space-y-4 text-muted-foreground font-medium">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Müşteri panelinden hızlı talep oluşturun.</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Ürünü faturasıyla birlikte güvenli paketleyin.</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Ücretsiz anlaşmalı kargo koduyla gönderin.</li>
               </ul>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><Zap size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">HIZLI GERİ ÖDEME</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">İadeniz onaylandığı an bankanıza bildirim yapılır. Ücret iadesi, bankanıza bağlı olarak 2-5 iş günü içerisinde kartınıza yansıtılır.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
               <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform"><Package size={24} /></div>
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">DEĞİŞİM SEÇENEĞİ</h3>
               <p className="text-muted-foreground font-medium leading-relaxed">Beğenmediğiniz bir ürünü farklı bir model veya renk ile hızlıca değiştirebilirsiniz. Stok durumuna göre anında işlem yapılır.</p>
            </div>
         </div>

         <div className="glass p-12 lg:p-16 rounded-[4rem] border border-border/50 space-y-10">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase tracking-tighter">SIKÇA <span className="text-primary italic">SORULANLAR</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <h4 className="text-xl font-bold italic tracking-tight uppercase tracking-tighter underline decoration-primary/20 decoration-2">Kullanılan ürünler iade edilebilir mi?</h4>
                  <p className="text-muted-foreground font-medium">Kişisel bakım, hijyen ve tek kullanımlık dijital lisanslar dışındaki ürünler, hasarlı veya eksik içerikli değilse iade edilebilir.</p>
               </div>
               <div className="space-y-3">
                  <h4 className="text-xl font-bold italic tracking-tight uppercase tracking-tighter underline decoration-primary/20 decoration-2">Kargo ücreti kime ait?</h4>
                  <p className="text-muted-foreground font-medium">Anlaşmalı kargo firmalarımızla yapacağınız tüm iade ve değişim gönderileri NexGen tarafından karşılanır.</p>
               </div>
               <div className="space-y-3">
                  <h4 className="text-xl font-bold italic tracking-tight uppercase tracking-tighter underline decoration-primary/20 decoration-2">Faturamı kaybettim ne yapmalıyım?</h4>
                  <p className="text-muted-foreground font-medium">Endişelenmeyin. Elektronik faturanız sistemimizde kayıtlıdır. Müşteri temsilcimizden kopya talep edebilirsiniz.</p>
               </div>
               <div className="space-y-3">
                  <h4 className="text-xl font-bold italic tracking-tight uppercase tracking-tighter underline decoration-primary/20 decoration-2">Kampanyalı ürünlerde iade var mı?</h4>
                  <p className="text-muted-foreground font-medium">Tüm kampanya ve indirimli ürünlerimiz, yasal iade haklarınız kapsamında güvence altındadır.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
