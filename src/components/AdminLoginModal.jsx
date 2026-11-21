import React, { useState, useEffect } from 'react';
import { Lock, X, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setUsername('');
      setPassword('');
      setShowPassword(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === 'sanagar' && password === 'Sanagar4296') {
      setError('');
      onLoginSuccess();
    } else {
      setError('غلط یوزر نیم یا پاسورڈ! براہِ کرم درست تفصیلات درج کریں۔');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-md royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-jameel text-2xl font-bold text-gold-300 leading-none">
                ایڈمن لاگ ان (Admin Access)
              </h3>
              <span className="text-[11px] font-naskh text-gray-400">
                صرف مجاز منتظم کے لیے
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs sm:text-sm font-naskh text-gray-300 leading-relaxed">
            کلام یا مقالات شامل کرنے، ترمیم کرنے، یا حذف کرنے کے لیے براہِ کرم ایڈمن تصدیق مکمل کریں۔
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-naskh">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
              یوزر نیم (Username):
            </label>
            <input
              type="text"
              required
              autoFocus
              dir="ltr"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
            />
          </div>

          <div>
            <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
              پاسورڈ (Password):
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-300 cursor-pointer"
                title={showPassword ? 'پاسورڈ چھپائیں' : 'پاسورڈ دیکھیں'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-naskh text-sm cursor-pointer"
            >
              منسوخ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-slate-950 font-bold font-naskh text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>لاگ ان کریں</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

