import React, { useState, useEffect } from 'react';
import { X, Clock, User, Share2, ZoomIn, ZoomOut, Bookmark, Check, Sparkles } from 'lucide-react';

export default function ArticleModal({ article, onClose }) {
  const [fontSize, setFontSize] = useState(18);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    const text = `*${article.titleUrdu}*\nتحریر: ${article.author}\n\n${article.summaryUrdu}\n\nمکمل مضمون کا مطالعہ کریں:`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col gold-card rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-gold-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-naskh">
              {article.category}
            </span>
            <span className="text-xs text-gray-400 font-naskh flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size control */}
            <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
              <button 
                onClick={() => setFontSize(prev => Math.max(prev - 2, 14))}
                className="p-1 hover:text-gold-300 cursor-pointer text-gray-400"
                title="فونٹ چھوٹا کریں"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-gold-300">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(prev + 2, 28))}
                className="p-1 hover:text-gold-300 cursor-pointer text-gray-400"
                title="فونٹ بڑا کریں"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600/30 text-emerald-400 border border-white/10 cursor-pointer"
              title="واٹس ایپ پر شیئر کریں"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Reader */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-6">
          {/* Article Header */}
          <div className="border-b border-gold-500/20 pb-6 text-center">
            <h1 className="font-nastaliq text-2xl sm:text-3xl md:text-4xl font-bold text-white light:text-slate-900 leading-[2.3] mb-3">
              {article.titleUrdu}
            </h1>
            <p className="font-sans text-xs text-gold-400/80 tracking-widest uppercase mb-4">
              {article.titleEnglish}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-naskh text-gray-400">
              <span className="flex items-center gap-1 text-gold-300">
                <User className="w-3.5 h-3.5" />
                تحریر: {article.author}
              </span>
              <span>•</span>
              <span>تاریخِ اشاعت: {article.date}</span>
            </div>
          </div>

          {/* Lead Summary Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-200 font-naskh text-base leading-relaxed">
            <span className="font-bold text-gold-400 block mb-1">خلاصۂ مضمون:</span>
            {article.summaryUrdu}
          </div>

          {/* Body Content with Dynamic Font Size */}
          <div 
            style={{ fontSize: `${fontSize}px` }}
            className="font-naskh text-gray-200 light:text-gray-800 leading-[2.4] space-y-6 select-text"
          >
            {article.content.split('\n\n').map((block, index) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="font-nastaliq text-2xl sm:text-3xl font-bold text-gold-300 leading-[2.2] pt-4 pb-1 border-b border-gold-500/20"
                  >
                    {trimmed.replace(/^##\s+/, '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('> ')) {
                const lines = trimmed
                  .split('\n')
                  .map(line => line.replace(/^>\s?/, '').trim());
                return (
                  <div
                    key={index}
                    className="bg-black/40 border-r-4 border-gold-400 rounded-xl p-5 my-3 shadow-inner space-y-2"
                  >
                    {lines.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className={
                          lIdx === 0
                            ? 'font-amiri text-xl sm:text-2xl text-gold-200 leading-[2.2] text-center'
                            : 'font-naskh text-sm sm:text-base text-gray-200 leading-relaxed text-center'
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={index} className="whitespace-pre-line">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-gold-500/20 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-naskh">متعلقہ موضوعات:</span>
            {article.tags.map(t => (
              <span key={t} className="text-xs text-gold-300 bg-black/40 px-3 py-1 rounded-full border border-gold-500/20">
                #{t}
              </span>
            ))}
          </div>

          {/* Author footer box */}
          <div className="p-4 rounded-xl bg-black/30 border border-gold-500/15 flex items-center justify-between text-xs font-naskh text-gray-400">
            <span>حقوق محفوظ ہیں © ثناگر حسینی پورٹل</span>
            <button
              onClick={handleShare}
              className="text-gold-400 hover:text-gold-200 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>احباب کے ساتھ شیئر کریں</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

