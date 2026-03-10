import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Package, Truck, CreditCard, RotateCcw, Globe } from 'lucide-react';

const FAQItem = ({ id, question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      id={id}
      className="glass rounded-[2rem] border border-border/50 overflow-hidden shadow-2xl transition-all hover:bg-muted/10 scroll-mt-32"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <div className="flex items-center gap-6">
           <div className="p-3 bg-primary/20 text-primary rounded-xl"><Icon size={24} /></div>
           <h3 className="text-xl font-bold tracking-tight italic uppercase tracking-tighter">{question}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0">
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8 text-lg text-muted-foreground font-medium border-t border-border/50 pt-8"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    { id: 'teslimat', q: 'Teslimat süreleriniz nedir?', a: 'İstanbul içi siparişler 24 saat, Türkiye genelinde ise 1-3 iş günü içinde lüks paketleme ile kurye ortaklarımız (UPS, DHL) aracılığıyla kapınıza ulaşır. Express kurye seçeneğimizle bazı bölgelerde aynı gün teslimat mümkündür.', i: Truck },
    { id: 'iade',     q: 'İade politikası nasıldır?', a: 'Müşteri memnuniyeti bizim için esastır. Ambalajı bozulmamış ürünleri 14 gün içinde sorgusuz sualsiz ücretsiz bir şekilde iade edebilirsiniz. İade kargo ücreti NexGen tarafından karşılanır.', i: RotateCcw },
    { id: 'garanti',  q: 'Ürünleriniz garantili mi?', a: 'NexGen üzerinden alınan tüm teknolojik ürünler 2 yıl resmi Türkiye/Üretici garantisi ve NexGen VIP destek hattı güvencesi altındadır.', i: Package },
    { id: 'odeme',    q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a: 'Tüm kredi/banka kartları (Visa, Mastercard, AMEX), Apple Pay, Google Pay ve güvenli ödeme sistemimiz üzerinden sınırlı bölgelerde kripto para ile ödeme kabul edilmektedir.', i: CreditCard },
    { id: 'taksit',   q: 'Taksit seçenekleri mevcut mu?', a: 'Anlaşmalı bankalarımızla tüm kredi kartlarına vade farksız 3, 6 veya 9 taksit imkanı sunuyoruz. Ödeme sayfasında kart bilgilerinizi girerek size özel seçenekleri görebilirsiniz.', i: CreditCard },
    { id: 'destek',   q: 'Teknik destek hizmetiniz var mı?', a: 'Evet, NexGen üzerinden aldığınız her ürün için uzman teknik ekibimizden canlı destek alabilir veya yetkili servis süreçlerinde öncelikli randevu talebi oluşturabilirsiniz.', i: HelpCircle },
    { id: 'yurtdisi', q: 'Yurtdışına gönderim yapıyor musunuz?', a: "Şu an için 50'den fazla ülkeye DHL Global Express ile sigortalı gönderim yapmaktayız. Uluslararası gönderim ücretleri ve gümrük süreçleri hakkında destek hattımızdan bilgi alabilirsiniz.", i: Globe },
  ];

  // URL hash varsa ilgili soruya smooth scroll yap
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Soruyu otomatik aç için küçük bir event dispatch de yapabiliriz
        el.querySelector('button')?.click();
      }, 300);
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
       <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
          <HelpCircle size={48} className="mx-auto text-primary animate-float" />
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic uppercase">SIKÇA <span className="text-gradient">SORULANLAR</span></h1>
          <p className="text-xl text-muted-foreground font-medium">Platformumuz hakkında merak ettiğiniz her şey burada.</p>
       </div>
       
       <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map(faq => (
            <FAQItem key={faq.id} id={faq.id} question={faq.q} answer={faq.a} icon={faq.i} />
          ))}
       </div>
    </div>
  );
}
