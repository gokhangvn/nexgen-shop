import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Chrome, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, error: '', success: true });
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Refresh to update navbar
        }, 1500);
      } else {
        setStatus({ loading: false, error: data.message, success: false });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Sunucu hatası, lütfen tekrar deneyin.', success: false });
    }
  };

  const handleGoogleLogin = () => {
    setStatus({ loading: true, error: '', success: false });
    setTimeout(() => {
      const mockUser = {
        name: 'GÖKHAN GÜVEN',
        email: 'ggokhan614@gmail.com',
        avatar: '/avatar.png',
        since: 'MART 2024',
        level: 'PLATINUM ÜYE',
        phone: '+90 (532) 123 45 67'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'google-mock-token');
      setStatus({ loading: false, error: '', success: true });
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="glass rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden p-12 lg:p-16 relative">
          <div className="text-center space-y-4 mb-12">
            <motion.h1 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl font-black tracking-tighter italic"
            >
              {isLogin ? 'HOŞ ' : 'KATIL '} 
              <span className="text-gradient">{isLogin ? 'GELDİNİZ' : 'BİZE'}</span>
            </motion.h1>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
              {isLogin ? 'Premium Hesabınıza Giriş Yapın' : 'Geleceğin Parçası Olun'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      className="w-full bg-muted/40 border-none px-14 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Email Adresi</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  required
                  placeholder="email@ornek.com"
                  className="w-full bg-muted/40 border-none px-14 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest px-4 text-muted-foreground">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-muted/40 border-none px-14 py-5 rounded-3xl font-bold focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {status.error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 text-red-500 rounded-2xl text-center text-sm font-bold border border-red-500/20">
                {status.error}
              </motion.div>
            )}

            {status.success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-500/10 text-green-500 rounded-2xl text-center text-sm font-bold border border-green-500/20 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Giriş Başarılı, Yönlendiriliyorsunuz...
              </motion.div>
            )}

            <button
              disabled={status.loading || status.success}
              className="group relative w-full bg-primary text-white py-6 rounded-3xl font-black text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
               {status.loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : (
                 <>
                   {isLogin ? 'GİRİŞ YAP' : 'KAYIT OL'}
                   <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </>
               )}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <span className="px-5 bg-card/10 z-10 relative text-xs font-black tracking-widest text-muted-foreground uppercase">VE YA</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50 -z-0" />
          </div>

          <div className="space-y-4 mb-10">
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-4 bg-white text-gray-800 hover:bg-neutral-100 p-5 rounded-3xl font-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
            >
              {/* Google SVG Logo */}
              <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <span className="text-lg italic tracking-tighter">Google ile Devam Et</span>
            </button>
          </div>

          <p className="text-center font-bold text-muted-foreground">
            {isLogin ? 'Hesabınız yok mu?' : 'Zaten üye misiniz?'} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary hover:underline italic font-black"
            >
              {isLogin ? 'Hemen Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
