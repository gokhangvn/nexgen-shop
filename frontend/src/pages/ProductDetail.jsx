import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Shield, Zap, Heart, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('Standart');
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

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

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, variant: selectedVariant });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) return (
    <div className="container mx-auto px-6 py-32 text-center">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
    </div>
  );
  if (!product) return (
    <div className="container mx-auto px-6 py-32 text-center space-y-6">
      <h2 className="text-4xl font-black italic tracking-tighter">ÜRÜN BULUNAMADI</h2>
      <Link to="/shop" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-black">Mağazaya Dön</Link>
    </div>
  );

  const wishlisted = isWishlisted(product._id || product.id);

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 group mb-12 text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm">
        <div className="p-2 bg-muted rounded-full group-hover:bg-primary/10 transition-all"><ArrowLeft size={16} /></div>
        Mağazaya Geri Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Ürün Görseli */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-[3rem] overflow-hidden bg-muted/40 border border-border/50 group"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute top-8 left-8 glass px-4 py-2 rounded-full border flex items-center gap-2 backdrop-blur-md">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-black italic">{product.rating}</span>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-8 right-8 p-4 glass rounded-full border transition-all ${wishlisted ? 'bg-red-500/20 border-red-500/40' : 'hover:bg-white hover:text-red-500'}`}
          >
            <Heart size={24} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </motion.div>

        {/* Ürün Bilgileri */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.2em]">
              {product.category}
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight italic">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-4xl font-black text-primary tracking-tighter italic">${product.price}</p>
              {product.oldPrice && (
                <p className="text-xl text-muted-foreground line-through font-bold">${product.oldPrice}</p>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed font-medium border-b pb-8">
            {product.description}<br /><br />
            NexGen serisi, sadece en yüksek kalite standartlarını karşılayan materyaller kullanılarak üretilir.
          </p>

          {/* Varyant Seçimi */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest">Seçenekler</h4>
            <div className="flex gap-4 flex-wrap">
              {['Standart', 'Pro', 'Elite'].map(v => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-8 py-4 rounded-2xl border-2 font-black transition-all ${selectedVariant === v ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-3 py-6 rounded-[2rem] font-black text-lg transition-all group ${addedToCart ? 'bg-green-500 text-white' : 'bg-primary text-white hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1'}`}
            >
              {addedToCart ? (
                <><CheckCircle2 size={24} /> SEPETE EKLENDİ!</>
              ) : (
                <><ShoppingBag size={24} /> SEPETE EKLE</>
              )}
            </button>
            <button
              onClick={() => { handleAddToCart(); navigate('/cart'); }}
              className="px-8 py-6 rounded-[2rem] border-2 border-primary text-primary font-black hover:bg-primary hover:text-white transition-all flex items-center gap-2"
            >
              <ShoppingCart size={22} /> HEMEN AL
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-6 rounded-[2rem] border-2 transition-all ${wishlisted ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border hover:bg-muted'}`}
            >
              <Heart size={24} className={wishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Avantajlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
