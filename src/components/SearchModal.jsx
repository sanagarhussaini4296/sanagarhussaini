import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Feather, FileText, BookOpen, ArrowLeft, Sparkles } from 'lucide-react';
import { ARTICLES_DATABASE } from '../data/articlesData';
import { BOOKS_AND_RESOURCES } from '../data/libraryData';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  poetryList, 
  onSelectKalam, 
  onSelectArticle,
  onSelectBook 
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results
  const matchedPoetry = trimmed 
    ? poetryList.filter(p => 
        p.titleUrdu.toLowerCase().includes(trimmed) || 
        p.firstVerse.toLowerCase().includes(trimmed) || 
        p.reciter.toLowerCase().includes(trimmed) ||
        p.genre.toLowerCase().includes(trimmed) ||
        p.titleRoman.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedArticles = trimmed
    ? ARTICLES_DATABASE.filter(a => 
        a.titleUrdu.toLowerCase().includes(trimmed) ||
        a.summaryUrdu.toLowerCase().includes(trimmed) ||
        a.tags.some(t => t.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedBooks = trimmed
    ? BOOKS_AND_RESOURCES.filter(b => 
        b.titleUrdu.toLowerCase().includes(trimmed) ||
        b.description.toLowerCase().includes(trimmed)
      )
    : [];

  const hasResults = matchedPoetry.length > 0 || matchedArticles.length > 0 || matchedBooks.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 backdrop-blur-md bg-black/80">
      <div className="relative w-full max-w-2xl gold-card rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gold-500/20 flex items-center gap-3 bg-black/40">
          <Search className="w-5 h-5 text-gold-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="کلام، مطلع، نوحہ خواں، مقالہ یا کتاب تلاش کریں..."
            className="w-full bg-transparent text-white font-naskh text-base focus:outline-none placeholder:text-gray-500"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-xs font-mono bg-white/10 text-gray-400 hover:text-white"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!trimmed && (
            <div className="text-center py-10 text-gray-400 font-naskh">
              <Sparkles className="w-8 h-8 text-gold-500/30 mx-auto mb-2" />
              <p className="text-sm">کوئی لفظ لکھیں (مثلاً: زہراؑ، علیؑ، سجاد حسین، مرثیہ، دیوان)</p>
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="text-center py-10 text-gray-400 font-naskh">
              <p className="text-base">اس تلاش سے مطابقت رکھنے والا کوئی مواد نہیں ملا۔</p>
            </div>
          )}

          {/* Matched Poetry */}
          {matchedPoetry.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-naskh text-gold-400 mb-3 font-bold">
                <Feather className="w-3.5 h-3.5" />
                <span>کلام و شاعری ({matchedPoetry.length})</span>
              </div>
              <div className="space-y-2">
                {matchedPoetry.map(p => (
                  <div
                    key={p.id}
                    onClick={() => { onSelectKalam(p); onClose(); }}
                    className="p-3.5 rounded-xl bg-black/30 hover:bg-gold-500/10 border border-gold-500/10 hover:border-gold-500/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-naskh">
                          {p.genre}
                        </span>
                        <span className="text-xs text-gray-400 font-naskh">{p.occasion}</span>
                      </div>
                      <h4 className="font-nastaliq text-lg font-bold text-white group-hover:text-gold-300">
                        {p.titleUrdu}
                      </h4>
                      <p className="font-naskh text-xs text-gray-400 line-clamp-1">{p.firstVerse}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-gold-400 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Articles */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-naskh text-emerald-400 mb-3 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>مقالات و مضامین ({matchedArticles.length})</span>
              </div>
              <div className="space-y-2">
                {matchedArticles.map(a => (
                  <div
                    key={a.id}
                    onClick={() => { onSelectArticle(a); onClose(); }}
                    className="p-3.5 rounded-xl bg-black/30 hover:bg-emerald-500/10 border border-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-naskh">
                        {a.category}
                      </span>
                      <h4 className="font-nastaliq text-lg font-bold text-white group-hover:text-emerald-300 mt-1">
                        {a.titleUrdu}
                      </h4>
                      <p className="font-naskh text-xs text-gray-400 line-clamp-1">{a.summaryUrdu}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Books */}
          {matchedBooks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-naskh text-gold-400 mb-3 font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>کتب خانہ ({matchedBooks.length})</span>
              </div>
              <div className="space-y-2">
                {matchedBooks.map(b => (
                  <div
                    key={b.id}
                    onClick={() => { onSelectBook(b); onClose(); }}
                    className="p-3.5 rounded-xl bg-black/30 hover:bg-gold-500/10 border border-gold-500/10 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] text-gold-400 font-naskh">{b.pages} • {b.language}</span>
                      <h4 className="font-nastaliq text-lg font-bold text-white group-hover:text-gold-300">
                        {b.titleUrdu}
                      </h4>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-gold-400 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

