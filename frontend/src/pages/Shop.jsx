import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingCart, Star, Search, ChevronRight, X, Eye, Zap, ArrowRight, ArrowDownNarrowWide, Heart, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass w-full max-w-4xl rounded-[3rem] overflow-hidden border shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-3 hover:bg-muted rounded-full transition-colors z-10">
          <X size={24} />
        </button>
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto">
          <div className="lg:w-1/2 aspect-square lg:aspect-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="lg:w-1/2 p-10 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest">{product.category}</span>
              <h2 className="text-4xl font-black tracking-tighter italic">{product.name}</h2>
              <div className="flex items-center gap-2 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="font-black italic text-foreground">{product.rating}</span>
                <span className="text-muted-foreground text-sm font-medium">({product.reviews || 0} yorum)</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed font-medium">{product.description}</p>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary italic tracking-tighter">${product.price}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { addToCart(product); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
              >
                <ShoppingBag size={20} /> SEPETE EKLE
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-5 rounded-2xl border-2 transition-all ${ isWishlisted(product._id || product.id) ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border hover:border-red-500 hover:text-red-500' }`}
              >
                <Heart size={22} className={isWishlisted(product._id || product.id) ? 'fill-red-500' : ''} />
              </button>
              <Link to={`/product/${product.id}`} className="bg-muted p-5 rounded-2xl hover:bg-primary/10 hover:text-primary transition-colors">
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id || product.id);
  return (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-card p-4 rounded-[2.5rem] border border-border/50 hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
  >
    <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6 bg-muted/30">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md border">
        <Star size={14} className="text-yellow-500 fill-yellow-500" />
        <span className="text-xs font-black">{product.rating}</span>
      </div>
      {/* Favori butonu */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-4 left-4 p-2.5 rounded-full glass border transition-all ${ wishlisted ? 'bg-red-500/20 border-red-500/40 text-red-500' : 'hover:bg-white hover:text-red-500' }`}
      >
        <Heart size={16} className={wishlisted ? 'fill-red-500' : ''} />
      </button>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 p-6">
        <button
          onClick={() => onQuickView(product)}
          className="p-4 bg-white text-black rounded-2xl hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-center text-sm hover:scale-105 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
        >
          SEPETE EKLE
        </button>
      </div>
    </div>
    <div className="px-2 space-y-2">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</p>
        <p className="text-lg font-black tracking-tighter">${product.price}</p>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
      </Link>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">{product.description}</p>
    </div>
  </motion.div>
  );
};

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, mins: 45, secs: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 p-8 lg:p-12 rounded-[3.5rem] premium-gradient relative overflow-hidden group shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 text-center lg:text-left text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 font-black text-xs uppercase tracking-widest border border-orange-500/20">
            <Zap size={14} fill="currentColor" /> Sınırlı Teklif
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter italic">FLAŞ <span className="text-orange-400">İNDİRİM</span></h2>
          <p className="font-bold text-white/70">Tüm "Quantum" serisi ürünlerde anında %30 indirim fırsatı.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {Object.entries(timeLeft).map(([unit, val]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-20 h-20 glass flex items-center justify-center rounded-[2rem] border-white/20 text-3xl font-black italic text-white">
                  {val.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest mt-2 text-white/60">{unit === 'hours' ? 'Saat' : unit === 'mins' ? 'Dk' : 'Sn'}</span>
              </div>
            ))}
          </div>
          <button className="bg-white text-black h-20 px-10 rounded-[2rem] font-black text-lg hover:bg-orange-400 hover:text-white transition-all shadow-xl active:scale-95">ŞİMDİ AL</button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
         setIsLoading(true);
         const pRes = await fetch(`http://localhost:3001/api/products${selectedCategory ? `?category=${selectedCategory}` : ''}`);
         const pData = await pRes.json();
         
         // Sorting logic
         let sortedData = [...pData];
         if (sortBy === 'priceLow') sortedData.sort((a, b) => a.price - b.price);
         if (sortBy === 'priceHigh') sortedData.sort((a, b) => b.price - a.price);
         
         setProducts(sortedData);

         const cRes = await fetch('http://localhost:3001/api/products/categories');
         const cData = await cRes.json();
         setCategories(cData);
      } catch (err) {
         console.error('Fetch error:', err);
      } finally {
         setIsLoading(false);
      }
    };
    fetchContent();
  }, [selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-6 py-12">
      <FlashSale />

      {/* Sayfa Başlığı */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
         <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">KOLEKSİYONU <span className="text-gradient">İNCELE</span></h1>
            <p className="text-lg text-muted-foreground font-semibold max-w-lg">Geleceğin teknolojisini bugün yaşamaya başlayın. En seçkin ürünlerimizi sizin için süzdük.</p>
         </div>
         <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 glass p-2 rounded-full border">
               <div className="p-3 bg-muted rounded-full text-muted-foreground">
                  <Search size={20} />
               </div>
               <input
                 type="text"
                 placeholder="Ürün Ara..."
                 className="bg-transparent border-none focus:ring-0 font-bold placeholder:text-muted-foreground w-40 lg:w-48"
               />
            </div>
            <div className="flex items-center gap-3 glass p-2 rounded-full border pr-6">
               <div className="p-3 bg-muted rounded-full">
                  <ArrowDownNarrowWide size={20} />
               </div>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="bg-transparent border-none focus:ring-0 font-bold text-sm cursor-pointer outline-none"
               >
                  <option value="newest">En Yeniler</option>
                  <option value="priceLow">Fiyat (Düşük - Yüksek)</option>
                  <option value="priceHigh">Fiyat (Yüksek - Düşük)</option>
               </select>
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
         {/* Sidebar Filtreler */}
         <aside className="lg:w-64 space-y-10">
            <div className="glass p-8 rounded-[2.5rem] border shadow-sm">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Filter size={14} /> Kategoriler
               </h4>
               <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-between group ${!selectedCategory ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    Tüm Ürünler
                    <ChevronRight size={16} className={`transition-transform ${!selectedCategory ? 'translate-x-0' : '-translate-x-2 opacity-0'}`} />
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-between group ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                      {cat}
                      <ChevronRight size={16} className={`transition-transform ${selectedCategory === cat ? 'translate-x-0' : '-translate-x-2 opacity-0'}`} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] premium-gradient text-white space-y-6 shadow-2xl overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center italic font-black text-white">%30</div>
               <h4 className="text-2xl font-black italic tracking-tighter">İNDİRİM FIRSATI</h4>
               <p className="text-xs font-bold text-white/70 leading-relaxed uppercase tracking-widest">Quantum serisinde geçerli özel indirim.</p>
               <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:scale-105 transition-all">HEMEN GÖR</button>
            </div>
         </aside>

         {/* Ürün Listesi */}
         <div className="flex-1">
            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-muted/40 rounded-[2.5rem] animate-pulse" />
                  ))}
               </div>
            ) : (
               <motion.div
                 layout
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               >
                 <AnimatePresence>
                   {products.map(product => (
                     <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                   ))}
                 </AnimatePresence>
               </motion.div>
            )}
            
            {!isLoading && products.length === 0 && (
               <div className="text-center py-32 space-y-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                     <Search size={40} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-black italic tracking-tighter">ARADIĞINIZ ÜRÜN BULUNAMADI</h3>
                  <p className="text-muted-foreground font-bold">Lütfen farklı bir kategori veya arama terimi deneyin.</p>
               </div>
            )}
         </div>
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
