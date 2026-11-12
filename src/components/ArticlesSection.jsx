import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';
import { ARTICLES_DATABASE } from '../data/articlesData';

export default function ArticlesSection({ onOpenArticle }) {
  const [selectedTag, setSelectedTag] = useState('all');

  const uniqueTags = Array.from(new Set(ARTICLES_DATABASE.flatMap(a => a.tags)));
  const allTags = ['all', ...uniqueTags];

  const filteredArticles = selectedTag === 'all'
    ? ARTICLES_DATABASE
    : ARTICLES_DATABASE.filter(a => a.tags.includes(selectedTag));

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--border-gold)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-naskh mb-2.5">
            <FileText className="w-3.5 h-3.5" />
            <span>فکر، شعور اور نقد و نظر کے دریچے — ثناگر حسینی</span>
          </div>
          <h2 className="font-nastaliq text-4xl sm:text-5xl font-bold text-gold-200 leading-[2.2]">
            مقالات و تحقیقی مضامین
          </h2>
          <p className="font-naskh text-base text-gray-300 mt-1">
            ثناگر حسینی کے قلم سے ادبی جائزے، فنِ شاعری، زبان و بیان اور تاریخی موضوعات پر فکری مقالات
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-naskh transition-all cursor-pointer font-semibold ${
                selectedTag === t
                  ? 'bg-gold-500 text-slate-950 font-bold shadow-md'
                  : 'bg-black/30 hover:bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {t === 'all' ? 'تمام مضامین' : `#${t}`}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Article Banner */}
      {ARTICLES_DATABASE[0] && (
        <div className="royal-card rounded-3xl p-6 sm:p-10 mb-10 relative overflow-hidden border-2 border-gold-500/40">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-naskh font-bold">
              خاص مقالہ
            </span>
            <span className="text-xs text-gray-300 font-naskh flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              {ARTICLES_DATABASE[0].readTime}
            </span>
            <span className="text-xs text-gray-300 font-naskh flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gold-400" />
              تحریر: <strong className="text-white">{ARTICLES_DATABASE[0].author}</strong>
            </span>
          </div>

          <h3 className="font-nastaliq text-3xl sm:text-4xl font-bold text-gold-200 leading-[2.4] mb-4">
            {ARTICLES_DATABASE[0].titleUrdu}
          </h3>

          <p className="font-naskh text-base sm:text-lg text-gray-200 leading-relaxed max-w-4xl mb-6">
            {ARTICLES_DATABASE[0].summaryUrdu}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              {ARTICLES_DATABASE[0].tags.map((tag) => (
                <span key={tag} className="text-xs text-gold-300 font-naskh bg-black/40 px-3 py-1 rounded-lg border border-gold-500/20">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => onOpenArticle(ARTICLES_DATABASE[0])}
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold font-naskh text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
            >
              <span>مکمل مقالہ پڑھیں</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid (shown when multiple articles exist) */}
      {ARTICLES_DATABASE.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div 
              key={article.id}
              className="royal-card rounded-2xl p-6 flex flex-col justify-between group hover:border-gold-500/60 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-300 font-naskh mb-3">
                  <span className="text-gold-300 font-bold">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    {article.readTime}
                  </span>
                </div>

                <h4 className="font-nastaliq text-2xl font-bold text-white leading-[2.3] mb-3 group-hover:text-gold-300 transition-colors">
                  {article.titleUrdu}
                </h4>

                <p className="font-naskh text-sm sm:text-base text-gray-300 leading-relaxed mb-5 line-clamp-3">
                  {article.summaryUrdu}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-naskh">{article.date}</span>
                <button
                  onClick={() => onOpenArticle(article)}
                  className="text-xs sm:text-sm font-naskh text-gold-300 hover:text-gold-200 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>مطالعہ کریں</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
