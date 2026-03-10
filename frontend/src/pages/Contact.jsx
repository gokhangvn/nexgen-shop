import React from 'react';
import { Mail, Phone, MapPin, Send, MessagesSquare, MessageCircle, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col lg:flex-row items-start gap-20">
        <div className="flex-1 space-y-12">
            <div className="space-y-6 text-center lg:text-left">
               <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic uppercase tracking-tighter">BİZE <span className="text-gradient text-primary italic font-bold">ULAŞIN</span></h1>
               <p className="text-xl text-muted-foreground font-medium max-w-xl italic underline decoration-primary/20 decoration-4">7/24 kesintisiz destek ve profesyonel çözüm merkezimizle her zaman yanınızdayız.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-4 p-8 glass rounded-[3rem] border border-border/50 hover:border-primary/40 transition-all group">
                  <div className="p-4 bg-primary text-white w-fit rounded-2xl group-hover:rotate-12 transition-transform"><Mail size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 underline decoration-primary/10">E-POSTA DESTEK</p>
                     <p className="text-xl font-black italic tracking-tighter group-hover:text-primary transition-colors">destek@nexgen-shop.com</p>
                  </div>
               </div>
               <div className="flex flex-col gap-4 p-8 glass rounded-[3rem] border border-border/50 hover:border-primary/40 transition-all group">
                  <div className="p-4 bg-primary text-white w-fit rounded-2xl group-hover:rotate-12 transition-transform"><Phone size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 underline decoration-primary/10">MÜŞTERİ HATTI</p>
                     <p className="text-xl font-black italic tracking-tighter group-hover:text-primary transition-colors">+90 (212) 555 0102</p>
                  </div>
               </div>
               <div className="flex flex-col gap-4 p-8 glass rounded-[3rem] border border-border/50 hover:border-primary/40 transition-all group">
                  <div className="p-4 bg-green-500 text-white w-fit rounded-2xl group-hover:rotate-12 transition-transform"><MessageCircle size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 underline decoration-primary/10">WHATSAPP HATTI</p>
                     <p className="text-xl font-black italic tracking-tighter group-hover:text-primary transition-colors">+90 (532) 123 4567</p>
                  </div>
               </div>
               <div className="flex flex-col gap-4 p-8 glass rounded-[3rem] border border-border/50 hover:border-primary/40 transition-all group">
                  <div className="p-4 bg-orange-500 text-white w-fit rounded-2xl group-hover:rotate-12 transition-transform"><Clock size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 underline decoration-primary/10">ÇALIŞMA SAATLERİ</p>
                     <p className="text-xl font-black italic tracking-tighter group-hover:text-primary transition-colors">7/24 Aktif Destek</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6 p-8 bg-muted/20 rounded-[3rem] border border-border/50 group hover:bg-muted/30 transition-all">
               <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform"><MapPin size={24} /></div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">GENEL MERKEZ</p>
                  <p className="text-lg font-bold italic tracking-tighter leading-tight uppercase">NexGen Teknoloji Vadisi, Maslak Plaza No:4, İstanbul</p>
               </div>
            </div>
        </div>

        <div className="flex-1 w-full lg:sticky lg:top-32">
            <div className="glass p-12 lg:p-16 rounded-[4rem] border border-border/50 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 -z-10"><MessagesSquare size={200} /></div>
               <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest px-4 text-primary/60">ADINIZ SOYADINIZ</label>
                        <input type="text" placeholder="Gökhan..." className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary transition-all outline-none" required />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest px-4 text-primary/60">E-POSTA ADRESİ</label>
                        <input type="email" placeholder="email@nexgen.com" className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary transition-all outline-none" required />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black tracking-widest px-4 text-primary/60">MESAJ KONUSU</label>
                     <input type="text" placeholder="Size nasıl yardımcı olabiliriz?" className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary transition-all outline-none" required />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black tracking-widest px-4 text-primary/60">MESAJINIZ</label>
                     <textarea placeholder="Detayları buraya yazın..." rows="4" className="w-full bg-background/50 border-2 border-border/50 px-6 py-5 rounded-3xl font-bold focus:border-primary transition-all outline-none resize-none" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 uppercase tracking-widest italic">MESAJI GÖNDER <Send size={24} /></button>
               </form>
            </div>
        </div>
      </div>
    </div>
  );
}
