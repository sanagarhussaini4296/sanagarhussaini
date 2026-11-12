import React from 'react';
import { 
  Feather, 
  BookOpen, 
  FileText, 
  ArrowLeft,
  Clock,
  Mic2,
  Copy,
  Check,
  Youtube,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

export default function Hero({ 
  onSelectKalam, 
  onOpenMimbar, 
  onOpenCardGenerator,
  onCopyKalam,
  copiedId,
  setActiveTab,
  latestPoetry,
  fontMode
}) {
  const handleOpenYoutube = (kalam) => {
    if (kalam.youtubeUrl) {
      window.open(kalam.youtubeUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Direct YouTube search for this specific kalam if no direct URL is saved yet
      const query = encodeURIComponent(`${kalam.titleUrdu} ثناگر حسینی`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 bg-islamic-pattern">
      
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 right-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Identity: ثناگر حسینی in grand calligraphy */}
        <div className="text-center max-w-4xl mx-auto mb-8 pt-2">

          {/* Grand Calligraphic Heading: ثناگر حسینی */}
          <h1
            className="font-jameel text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gold-300 tracking-wide leading-[1.45] py-1 drop-shadow-[0_6px_28px_rgba(212,175,55,0.45)] select-none"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.65), 0 0 35px rgba(212,175,55,0.35)' }}
          >
            ثناگر حسینی
          </h1>

          {/* Ornamental Calligraphic Flourish */}
          <div className="flex items-center justify-center gap-3 my-2 opacity-90">
            <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-gold-400 to-transparent" />
            <Feather className="w-5 h-5 text-gold-400" />
            <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-gold-400 to-transparent" />
          </div>

          <p className="font-naskh text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mt-3">
            اردو اور سندھی نوحہ جات، مناقب، مراثی، سلام، فکری مقالات اور نایاب کتب کا جامع ڈیجیٹل مخزن، خاص طور پر ذاکرین اور شائقینِ ادب کے لیے۔
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('poetry')}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-slate-950 font-bold font-naskh text-base transition-all shadow-lg shadow-gold-500/20 flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Feather className="w-5 h-5 text-slate-950" />
              <span>دیوانِ کلام ملاحظہ کریں</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-[var(--border-gold)] text-white font-naskh text-base transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gold-400" />
              <span>تحقیقی مقالات و مضامین</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className="px-6 py-2.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-[var(--border-gold)] text-gold-300 font-naskh text-base transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>کتب ڈاؤنلوڈز و مطالعہ گاہ</span>
            </button>
          </div>
        </div>

        {/* LATEST POETRY SHOWCASE (Without number 4) */}
        <div className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[var(--border-gold)]/40">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-gold-400" />
              <h2 className="font-jameel text-3xl font-bold text-gold-200">
                تازہ ترین کلام (Latest Poetry)
              </h2>
            </div>
            
            <button
              onClick={() => setActiveTab('poetry')}
              className="text-xs sm:text-sm font-naskh text-gold-400 hover:text-gold-200 flex items-center gap-1 font-bold cursor-pointer transition-colors"
            >
              <span>تمام کلام دیکھیں</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPoetry && latestPoetry.map((kalam, idx) => {
              const isSindhi = kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam';
              const poemFontClass = fontMode !== 'font-jameel' 
                ? fontMode 
                : (isSindhi ? 'font-lateefi' : 'font-jameel');
              const isCopied = copiedId === kalam.id;

              return (
                <div 
                  key={kalam.id || idx}
                  className="royal-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-gold-500/60 transition-all shadow-xl"
                >
                  <div>
                    {/* Top tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-naskh font-bold">
                          {kalam.genre}
                        </span>
                        <span className="text-xs text-gray-300 font-naskh bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                          {kalam.occasion}
                        </span>
                      </div>
                      <span className="text-[11px] text-gold-400/80 font-sans px-2 py-0.5 rounded bg-white/5">
                        {isSindhi ? 'سنڌي (MB Lateefi)' : 'اردو (Jameel Noori)'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`${poemFontClass} text-2xl sm:text-3xl font-bold text-gold-100 leading-[2.4] mb-2 group-hover:text-gold-300 transition-colors`}>
                      {kalam.titleUrdu}
                    </h3>

                    {/* Opening Verse Stanza */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-gold-500/20 mb-4 shadow-inner">
                      <p className={`${poemFontClass} text-xl sm:text-2xl text-white leading-[2.6] whitespace-pre-line text-center`}>
                        {kalam.firstVerse}
                      </p>
                    </div>

                    {/* Reciter info */}
                    <div className="text-xs text-gray-300 font-naskh mb-4 flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div>
                        <span>آواز / نوحہ خواں: </span>
                        <strong className="text-white font-medium">{kalam.reciter}</strong>
                      </div>
                      <span className="text-gold-400/90 font-medium font-sans">
                        {kalam.year}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Copy */}
                      <button
                        onClick={() => onCopyKalam(kalam)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-naskh font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' 
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        }`}
                        title="کلام کاپی کریں"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'کاپی ہو گیا' : 'کاپی'}</span>
                      </button>

                      {/* Mimbar */}
                      <button
                        onClick={() => onOpenMimbar(kalam)}
                        className="px-3.5 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 text-xs font-naskh font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="منبر موڈ"
                      >
                        <Mic2 className="w-3.5 h-3.5 text-gold-400" />
                        <span>منبر موڈ</span>
                      </button>

                      {/* Card Generator */}
                      <button
                        onClick={() => onOpenCardGenerator(kalam)}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border border-purple-500/30 text-xs font-naskh transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="تصویری کارڈ بنائیں"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                        <span>تصویری کارڈ</span>
                      </button>

                      {/* DIRECT YOUTUBE LINKING BUTTON (As requested in Image 1) */}
                      <button
                        onClick={() => handleOpenYoutube(kalam)}
                        className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/35 text-red-300 border border-red-500/40 text-xs font-naskh font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
                        title="یوٹیوب پر ویڈیو و آڈیو دیکھیں"
                      >
                        <Youtube className="w-4 h-4 text-red-400" />
                        <span>یوٹیوب</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectKalam(kalam)}
                      className="text-xs font-naskh text-gold-400 hover:text-gold-200 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>مکمل کلام</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
