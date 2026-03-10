import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Shield, Zap, Globe, Heart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Standart');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <div className="container mx-auto px-6 py-32 text-center text-2xl font-black italic">YÜKLENİYOR...</div>;
  if (!product) return <div className="container mx-auto px-6 py-32 text-center text-2xl font-black italic">ÜRÜN BULUNAMADI.</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 group mb-12 text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm">
        <div className="p-2 bg-muted rounded-full group-hover:bg-primary/10 transition-all">
           <ArrowLeft size={16} />
        </div>
        Mağazaya Geri Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Ürün Görseli */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative aspect-square rounded-[3rem] overflow-hidden bg-muted/40 border border-border/50 group"
        >
           <img
             src={product.image}
             alt={product.name}
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
           />
           <div className="absolute top-8 left-8 glass px-4 py-2 rounded-full border flex items-center gap-2 backdrop-blur-md">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-black italic">{product.rating}</span>
           </div>
           <button className="absolute top-8 right-8 p-4 glass rounded-full border hover:bg-white hover:text-red-500 transition-all group/heart">
              <Heart size={24} className="group-active/heart:scale-125 transition-transform" />
           </button>
        </motion.div>

        {/* Ürün Bilgileri */}
        <div className="space-y-10">
           <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.2em]">
                 {product.category}
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight italic">{product.name}</h1>
              <p className="text-4xl font-black text-primary tracking-tighter italic">${product.price}</p>
           </div>

           <p className="text-xl text-muted-foreground leading-relaxed font-medium pb-8 border-b">
              {product.description}
              <br /><br />
              NexGen serisi, sadece en yüksek kalite standartlarını karşılayan materyaller kullanılarak üretilir. Her bir parça, mükemmellik için elden geçirilmiş ve titizlikle tasarlanmıştır.
           </p>

           <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest">Seçenekler</h4>
              <div className="flex gap-4">
                 {['Standart', 'Pro', 'Elite'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-8 py-4 rounded-2xl border-2 font-black transition-all ${selectedSize === size ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                    >
                       {size}
                    </button>
                 ))}
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-6">
              <button className="flex-1 flex items-center justify-center gap-3 bg-primary text-white py-6 rounded-[2rem] font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 group">
                 <ShoppingBag size={24} />
                 SEPETE EKLE
              </button>
              <button className="p-6 rounded-[2rem] border-2 border-border hover:bg-muted transition-all group">
                 <Heart size={24} className="group-hover:text-red-500 transition-colors" />
              </button>
           </div>

           {/* Avantajlar */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border">
                 <div className="p-3 bg-primary/20 text-primary rounded-xl"><Shield size={24} /></div>
                 <span className="font-bold text-sm">2 Yıl Global Garanti</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border">
                 <div className="p-3 bg-green-500/20 text-green-500 rounded-xl"><Zap size={24} /></div>
                 <span className="font-bold text-sm">Hızlı Express Kargo</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
