import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', 
    zip: '', cardName: '', cardNumber: '', cardExp: '', cardCVV: ''
  });

  const handleComplete = (e) => {
    e.preventDefault();
    // Simulate payment
    navigate('/success');
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sol Kolon: Ödeme Formu */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">GÜVENLİ <span className="text-gradient">ÖDEME</span></h1>
              <p className="text-lg text-muted-foreground font-semibold">Siparişinizi tamamlamak için bilgilerinizi girin.</p>
            </div>

            <div className="flex items-center gap-4 mb-12">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center gap-2">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${step >= i ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>{i}</div>
                   <span className={`text-xs font-black uppercase tracking-widest ${step >= i ? 'text-foreground' : 'text-muted-foreground'}`}>{i === 1 ? 'Adres' : i === 2 ? 'Kargo' : 'Ödeme'}</span>
                   {i < 3 && <div className="w-10 h-px bg-border mx-2" />}
                 </div>
               ))}
            </div>

            <form onSubmit={handleComplete} className="space-y-8">
               {step === 1 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Ad Soyad</label>
                        <input type="text" placeholder="Gökhan NexGen" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Email</label>
                        <input type="email" placeholder="email@nexgen.com" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none" required />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Adres</label>
                      <textarea placeholder="Tam adresiniz..." rows="3" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-none" required></textarea>
                   </div>
                   <button type="button" onClick={() => setStep(2)} className="w-full lg:w-max bg-primary text-white px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-3">DEVAM ET <ArrowRight size={20} /></button>
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="glass p-8 rounded-[2rem] border border-primary/20 flex items-center justify-between group cursor-pointer hover:bg-primary/5 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="p-4 bg-primary/20 text-primary rounded-2xl"><Truck size={32} /></div>
                          <div>
                             <h4 className="text-xl font-bold">Standart Teslimat</h4>
                             <p className="text-sm text-muted-foreground font-medium">3-5 İş Günü İçinde Kapınızda</p>
                          </div>
                       </div>
                       <span className="text-xl font-black italic">ÜCRETSİZ</span>
                    </div>
                    <button type="button" onClick={() => setStep(3)} className="w-full lg:w-max bg-primary text-white px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-3">ÖDEMEYE GEÇ <ArrowRight size={20} /></button>
                 </motion.div>
               )}

               {step === 3 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="p-8 rounded-[2rem] bg-card border shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 text-primary/10"><CreditCard size={120} /></div>
                       <div className="space-y-8 relative z-10">
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Kart Numarası</label>
                             <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-black text-2xl tracking-widest focus:ring-2 focus:ring-primary/50 transition-all outline-none" required />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">S.K.T</label>
                                <input type="text" placeholder="MM/YY" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none" required />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">CVV</label>
                                <input type="text" placeholder="000" className="w-full bg-muted/40 border-none px-6 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none" required />
                             </div>
                          </div>
                       </div>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-6 rounded-full font-black text-2xl hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-4">SİPARİŞİ TAMAMLA <ShieldCheck size={24} /></button>
                 </motion.div>
               )}
            </form>
          </div>

          {/* Sağ Kolon: Sipariş Özeti */}
          <div className="lg:w-96">
            <div className="glass p-10 rounded-[3rem] border border-border/50 shadow-2xl space-y-8 sticky top-32">
               <h3 className="text-2xl font-black italic tracking-tighter">SİPARİŞ ÖZETİ</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-muted-foreground font-bold">
                     <span>Ara Toplam</span>
                     <span>$2,149.49</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground font-bold">
                     <span>Kargo</span>
                     <span className="text-green-500">Ücretsiz</span>
                  </div>
                  <div className="h-px bg-border/50 my-6" />
                  <div className="flex justify-between items-end">
                     <span className="text-xl font-bold">Toplam</span>
                     <span className="text-4xl font-black italic text-primary tracking-tighter">$2,149.49</span>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-border/50 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                     <ShieldCheck size={16} className="text-green-500" />
                     256-bit SSL Güvenli Ödeme Sitemi
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
