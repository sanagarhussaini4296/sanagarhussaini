import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Printer, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Mic2, 
  Moon, 
  Sun,
  Type
} from 'lucide-react';

export default function MimbarModal({ kalam, onClose, onCopyKalam, copiedId }) {
  const [fontSize, setFontSize] = useState(34); // prominent size for stage reading
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [modalDark, setModalDark] = useState(true);
  const [fontChoice, setFontChoice] = useState(
    kalam && (kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam') 
      ? 'font-lateefi' 
      : 'font-jameel'
  );
  const scrollContainerRef = useRef(null);

  // Auto-scroll loop
  useEffect(() => {
    let scrollInterval = null;
    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed;
        }
      }, 50);
    } else {
      clearInterval(scrollInterval);
    }
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling, scrollSpeed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!kalam) return null;
  const isCopied = copiedId === kalam.id;

  return (
    <div className="fixed inset-0 z-50 flex flex-col backdrop-blur-md bg-black/95">
      
      {/* Top Floating Control Bar */}
      <div className={`no-print px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b ${
        modalDark ? 'bg-[#04140e] border-gold-500/30 text-white' : 'bg-amber-50 border-amber-300 text-slate-900'
      }`}>
        
        {/* Left: Title & Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
            <Mic2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jameel text-2xl font-bold leading-tight text-gold-300">
              اسٹیج و منبر ریڈنگ موڈ
            </h3>
            <span className="text-xs text-gray-300 font-naskh">
              {kalam.genre} • مناسبت: {kalam.occasion} • پورٹل: <strong className="text-white">پیغامِ ہدایت</strong>
            </span>
          </div>
        </div>

        {/* Center: Controls for Font, Font Size, Auto-scroll & Theme */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Font Selector on Stage */}
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-gold-500/20 text-xs font-naskh">
            <button
              onClick={() => setFontChoice('font-jameel')}
              className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                fontChoice === 'font-jameel' ? 'bg-gold-500 text-slate-950 font-bold' : 'text-gray-300'
              }`}
            >
              جمیل نوری
            </button>
            <button
              onClick={() => setFontChoice('font-lateefi')}
              className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                fontChoice === 'font-lateefi' ? 'bg-gold-500 text-slate-950 font-bold' : 'text-gray-300'
              }`}
            >
              ایم بی لطیفی
            </button>
          </div>

          {/* Font Zoom Controls */}
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-gold-500/20">
            <button
              onClick={() => setFontSize(prev => Math.max(prev - 2, 22))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              title="فونٹ چھوٹا کریں"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-gold-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(prev + 3, 62))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              title="فونٹ بڑا کریں"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFontSize(34)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              title="دوبارہ عمومی سائز"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`px-3 py-1.5 rounded-xl text-xs font-naskh flex items-center gap-1.5 cursor-pointer border transition-all ${
              isAutoScrolling 
                ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
            }`}
            title="خودکار اسکرولنگ (ہاتھ لگائے بغیر پڑھیں)"
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoScrolling ? 'اسکرول جاری' : 'آٹو اسکرول'}</span>
          </button>

          {/* Theme Toggle within Reader */}
          <button
            onClick={() => setModalDark(!modalDark)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gold-400 cursor-pointer"
            title={modalDark ? "روشن پس منظر" : "تاریک پس منظر"}
          >
            {modalDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            title="پرنٹ کریں یا پی ڈی ایف محفوظ کریں"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Copy Button */}
          <button
            onClick={() => onCopyKalam(kalam)}
            className="px-3.5 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-xs font-naskh font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'کاپی ہو گیا' : 'کاپی'}</span>
          </button>
        </div>

        {/* Right: Close button */}
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 cursor-pointer transition-colors"
          title="بند کریں (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Fullscreen Scrollable Content */}
      <div 
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-6 sm:px-16 py-12 transition-colors duration-300 ${
          modalDark ? 'bg-[#03110b] text-[#faf7f0]' : 'bg-[#fcfaf5] text-[#1c1917]'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Header Title in Reader */}
          <div className="mb-12 pb-6 border-b border-gold-500/20">
            <span className="text-xs uppercase font-sans tracking-widest text-gold-400 mb-2 block">
              پیغامِ ہدایت • باضابطہ پورٹل
            </span>
            <h1 className={`${fontChoice} text-4xl sm:text-5xl font-bold leading-[2.4] text-gold-300`}>
              {kalam.titleUrdu}
            </h1>
            <p className="font-naskh text-sm text-gray-300 mt-2">
              نوحہ خواں / ذاکر: {kalam.reciter}
            </p>
          </div>

          {/* The Verses with Dynamic Font Size and Generous Line Height */}
          <div 
            style={{ fontSize: `${fontSize}px` }}
            className={`${fontChoice} leading-[2.7] space-y-10 select-text`}
          >
            {kalam.fullKalam.split('\n\n').map((stanza, index) => (
              <div 
                key={index}
                className={`py-6 px-8 rounded-2xl transition-all ${
                  modalDark ? 'bg-black/30 border border-white/5' : 'bg-amber-100/40 border border-amber-900/10'
                }`}
              >
                <p className="whitespace-pre-line tracking-wide drop-shadow-sm">
                  {stanza}
                </p>
                {index < kalam.fullKalam.split('\n\n').length - 1 && (
                  <div className="w-16 h-0.5 bg-gold-500/30 mx-auto mt-6" />
                )}
              </div>
            ))}
          </div>

          {/* Footer attribution */}
          <div className="mt-20 pt-8 border-t border-gold-500/20 text-xs font-naskh text-gray-400">
            <p>پورٹل: پیغامِ ہدایت</p>
          </div>

        </div>
      </div>

    </div>
  );
}
