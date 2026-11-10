import React, { useState } from 'react';
import { 
  Feather, 
  Copy, 
  Check, 
  Mic2, 
  Heart, 
  ChevronDown, 
  Image as ImageIcon,
  Calendar,
  Sparkles,
  ArrowLeft,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { GENRES_LIST, OCCASIONS_LIST_1, OCCASIONS_LIST_2 } from '../data/poetryData';

export default function PoetrySection({ 
  poetryList, 
  onSelectKalam, 
  onOpenMimbar, 
  onOpenCardGenerator,
  onCopyKalam,
  copiedId,
  favorites,
  onToggleFavorite,
  fontMode
}) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleOpenYoutube = (kalam) => {
    if (kalam.youtubeUrl) {
      window.open(kalam.youtubeUrl, '_blank', 'noopener,noreferrer');
    } else {
      const query = encodeURIComponent(`${kalam.titleUrdu} ثناگر حسینی`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter logic
  const filteredList = poetryList.filter((item) => {
    const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre || item.genreSlug === selectedGenre;
    const matchesOccasion = selectedOccasion === 'all' || item.occasion === selectedOccasion;
    const matchesSearch = 
      item.titleUrdu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstVerse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reciter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.occasion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesOccasion && matchesSearch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[var(--border-gold)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-naskh mb-2.5">
            <Feather className="w-3.5 h-3.5 text-gold-400" />
            <span>دیوانِ کلام و منظوم نذرانہ ہائے عقیدت — پیغامِ ہدایت</span>
          </div>
          <h2 className="font-jameel text-4xl sm:text-5xl font-bold text-gold-200 leading-[2.2]">
            کلام و شاعری کا مجموعہ
          </h2>
          <p className="font-naskh text-base text-gray-300 mt-1">
            جمیل نوری نستعلیق اور ایم بی لطیفی خطوط میں مزین کلام، یوٹیوب لنکس، منبر موڈ اور تصویری کارڈ کے ساتھ
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="کلام، مطلع یا ذاکر کے نام سے تلاش کریں..."
            className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gold-500/30 text-white placeholder:text-gray-400 text-sm font-naskh focus:outline-none focus:border-gold-400 shadow-inner"
          />
        </div>
      </div>

      {/* Filter Row: Genres (Horizontal Pills) + Occasions (DROPDOWN LIST) */}
      <div className="space-y-4 mb-10">
        
        {/* 1. Genre Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-naskh text-gold-300 shrink-0 font-bold ml-2">صنفِ سخن:</span>
          {GENRES_LIST.map((g) => {
            const isSelected = selectedGenre === (g.value === 'all' ? 'all' : g.value);
            return (
              <button
                key={g.value}
                onClick={() => setSelectedGenre(g.value === 'all' ? 'all' : g.value)}
                className={`px-4 py-2 rounded-xl text-sm font-naskh whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-bold shadow-md shadow-gold-500/20 scale-105'
                    : 'bg-black/30 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Occasions DROPDOWN LIST (Grouped by LIST 2 and LIST 1) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-black/30 border border-gold-500/20">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-gold-400 shrink-0" />
            <div>
              <span className="text-sm font-naskh text-gold-300 font-bold block">
                مناسبت منتخب فرمائیں (تمام مناسبات کی ڈراپ ڈاؤن فہرست):
              </span>
              <span className="text-xs text-gray-400 font-naskh">
                (عزاداری و شہادت اور ولادت و اعیاد کی تفصیلی فہرست)
              </span>
            </div>
          </div>

          <div className="w-full sm:w-96">
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-gold-500/40 text-gold-200 text-sm font-naskh focus:outline-none focus:border-gold-300 shadow-md cursor-pointer"
            >
              <option value="all" className="bg-[#08261c] text-white">
                تمام مناسبات (All Occasions)
              </option>

              <optgroup label="LIST 2: محرم الحرام، مصائب و شہادت (Aza & Mourning)">
                {OCCASIONS_LIST_2.map((occ) => (
                  <option key={`filter2-${occ}`} value={occ} className="bg-[#08261c] text-white">
                    {occ}
                  </option>
                ))}
              </optgroup>

              <optgroup label="LIST 1: ولادت، اعیاد، جشن و خوشی (Wiladat & Jashan)">
                {OCCASIONS_LIST_1.map((occ) => (
                  <option key={`filter1-${occ}`} value={occ} className="bg-[#08261c] text-white">
                    {occ}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

      </div>

      {/* Poetry Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 royal-card rounded-2xl p-8">
          <Feather className="w-12 h-12 text-gold-500/40 mx-auto mb-3" />
          <h3 className="font-jameel text-2xl text-white mb-2">اس انتخاب کے تحت کوئی کلام دستیاب نہیں ہے</h3>
          <p className="font-naskh text-gray-400 text-sm">براہ کرم ڈراپ ڈاؤن سے مناسبت یا صنف تبدیل کر کے دیکھیں۔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredList.map((kalam) => {
            const isCopied = copiedId === kalam.id;
            const isFav = favorites.includes(kalam.id);
            const isExpanded = expandedId === kalam.id;
            
            const isSindhi = kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam';
            const poemFontClass = fontMode !== 'font-jameel' 
              ? fontMode 
              : (isSindhi ? 'font-lateefi' : 'font-jameel');

            return (
              <div 
                key={kalam.id}
                className="royal-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group"
              >
                {/* Top card metadata */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-naskh font-semibold">
                        {kalam.genre}
                      </span>
                      <span className="text-xs text-gray-300 font-naskh bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                        {kalam.occasion}
                      </span>
                      <span className="text-[11px] text-gold-400/80 font-sans px-2 py-0.5 rounded bg-white/5">
                        {isSindhi ? 'سنڌي (MB Lateefi)' : 'اردو (Jameel Noori)'}
                      </span>
                    </div>

                    {/* Bookmark favorite button */}
                    <button
                      onClick={() => onToggleFavorite(kalam.id)}
                      className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                      title={isFav ? "پسندیدہ سے ہٹائیں" : "پسندیدہ میں شامل کریں"}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className={`${poemFontClass} text-2xl sm:text-3xl font-bold text-gold-100 leading-[2.4] mb-2 group-hover:text-gold-300 transition-colors`}>
                    {kalam.titleUrdu}
                  </h3>

                  {/* Stanza Box with generous spacing & authentic font */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-gold-500/20 mb-5 shadow-inner">
                    <p className={`${poemFontClass} text-xl sm:text-2xl text-white leading-[2.6] whitespace-pre-line text-center`}>
                      {isExpanded ? kalam.fullKalam : kalam.firstVerse}
                    </p>
                  </div>

                  {/* Reciter info */}
                  <div className="text-xs text-gray-300 font-naskh mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span>نوحہ خواں / ذاکر: </span>
                      <strong className="text-white font-medium">{kalam.reciter}</strong>
                    </div>
                    <span className="text-gold-400/90 font-medium font-sans">
                      {kalam.year}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Copy Button */}
                    <button
                      onClick={() => onCopyKalam(kalam)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-naskh font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCopied 
                          ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' 
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                      }`}
                      title="مکمل کلام کاپی کریں (شعر بمع حوالہ)"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'کاپی ہو گیا' : 'کاپی'}</span>
                    </button>

                    {/* Mimbar / Stage Mode */}
                    <button
                      onClick={() => onOpenMimbar(kalam)}
                      className="px-3.5 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 text-xs font-naskh font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="اسٹیج و منبر پر پڑھنے کے لیے فل اسکرین موڈ"
                    >
                      <Mic2 className="w-3.5 h-3.5 text-gold-400" />
                      <span>منبر موڈ</span>
                    </button>

                    {/* Social Media Image Card Generator */}
                    <button
                      onClick={() => onOpenCardGenerator(kalam)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border border-purple-500/30 text-xs font-naskh transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="واٹس ایپ اسٹیٹس کے لیے تصویری کارڈ بنائیں"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span>تصویری کارڈ</span>
                    </button>

                    {/* DIRECT YOUTUBE LINKING BUTTON (Directly opens YouTube, no audio popup) */}
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

                  {/* Expand / Collapse toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : kalam.id)}
                    className="text-xs font-naskh text-gold-400 hover:text-gold-200 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>{isExpanded ? 'مختصر کریں' : 'مکمل کلام'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
