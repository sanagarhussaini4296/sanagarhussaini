import React from 'react';
import { X, Play, Copy, Check, Mic2, Share2, Volume2 } from 'lucide-react';

export default function MediaModal({ kalam, onClose, onOpenMimbar, onCopyKalam, copiedId }) {
  if (!kalam) return null;
  const isCopied = copiedId === kalam.id;

  const shareOnWhatsApp = () => {
    const text = `*${kalam.titleUrdu}*\nشاعر: ثناگر حسینی\nآواز: ${kalam.reciter}\n\n${kalam.firstVerse}\n\nمکمل کلام و آڈیو سماعت کریں:\n— پیغامِ ہدایت پورٹل`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-gold-400" />
            <h3 className="font-nastaliq text-2xl font-bold text-gold-300">
              سماعتِ کلام و ویڈیو ریکارڈنگ
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Simulated Video Player Container */}
          <div className="relative w-full aspect-video rounded-2xl bg-black border border-gold-500/30 overflow-hidden flex flex-col items-center justify-center shadow-inner group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#062017] to-black opacity-90" />
            
            <div className="relative z-10 text-center px-4">
              <div className="w-20 h-20 rounded-full bg-red-600/95 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-600/50 hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h4 className="font-nastaliq text-3xl font-bold text-gold-200 mb-1">
                {kalam.titleUrdu}
              </h4>
              <p className="font-naskh text-sm sm:text-base text-gray-300">
                شاعر: <strong className="text-gold-300">ثناگر حسینی</strong> • نوحہ خواں / ذاکر: <span className="text-white font-medium">{kalam.reciter}</span>
              </p>
            </div>

            {/* Simulated audio waveform */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-center gap-1.5 h-8">
              {[40, 70, 30, 90, 60, 80, 45, 100, 50, 75, 30, 85, 60, 40, 90, 55].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}%` }} 
                  className="w-1.5 bg-gold-400/70 rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 p-4 rounded-2xl border border-gold-500/20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenMimbar(kalam)}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold font-naskh text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Mic2 className="w-4 h-4 text-slate-950" />
                <span>منبر موڈ میں پڑھیں</span>
              </button>

              <button
                onClick={() => onCopyKalam(kalam)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-naskh text-xs sm:text-sm border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'کاپی ہو گیا' : 'متن کاپی کریں'}</span>
              </button>

              <button
                onClick={shareOnWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-naskh text-xs sm:text-sm border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>واٹس ایپ شیئر</span>
              </button>
            </div>

            <span className="text-xs font-naskh text-gray-300">
              مناسبت: {kalam.occasion}
            </span>
          </div>

          {/* Verses below the player for following along */}
          <div>
            <h5 className="font-nastaliq text-2xl font-bold text-gold-300 mb-3 border-b border-gold-500/20 pb-2">
              متنِ کلام (شاعری ساتھ ساتھ پڑھیں):
            </h5>
            <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-gold-500/20 text-center font-nastaliq text-2xl text-white leading-[2.6] whitespace-pre-line select-text">
              {kalam.fullKalam}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
