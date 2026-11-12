import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Layers, 
  Check, 
  Globe
} from 'lucide-react';
import { BOOKS_AND_RESOURCES, EXTERNAL_READING_LINKS } from '../data/libraryData';

export default function LibrarySection({ onTriggerDownload }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = (book) => {
    setDownloadingId(book.id);
    onTriggerDownload(book);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-[var(--border-gold)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-naskh mb-2.5">
          <BookOpen className="w-3.5 h-3.5 text-gold-400" />
          <span>علمی و فکری ذخیرہ — پیغامِ ہدایت</span>
        </div>
        <h2 className="font-nastaliq text-4xl sm:text-5xl font-bold text-gold-200 leading-[2.2]">
          کتب خانہ و مطالعہ گاہ
        </h2>
        <p className="font-naskh text-base text-gray-300 mt-1">
          ثناگر حسینی کی تصانیف، دیوان کے پی ڈی ایف نسخے، اور اسلامی و ادبی تحقیق کے لیے منتخب مآخذ و مراجع
        </p>
      </div>

      {/* Part 1: Downloadable Published Books & Diwans */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-gold-400" />
          <h3 className="font-nastaliq text-3xl font-bold text-gold-200 leading-normal">
            مطبوعہ کتب و مجموعۂ کلام (پی ڈی ایف ڈاؤنلوڈز)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOOKS_AND_RESOURCES.map((book) => {
            const isDownloading = downloadingId === book.id;
            return (
              <div 
                key={book.id}
                className="royal-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-gold-500/60 transition-all shadow-xl"
              >
                {/* 3D-styled Book Spine Graphic */}
                <div className={`h-52 rounded-2xl bg-gradient-to-br ${book.coverColor} p-6 flex flex-col justify-between border-2 border-gold-500/40 relative overflow-hidden shadow-2xl mb-6 group-hover:scale-[1.02] transition-transform`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-500/30 to-transparent pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-naskh text-gold-300 bg-black/60 px-3 py-1 rounded-full border border-gold-500/30 font-bold">
                      {book.badge}
                    </span>
                    <span className="text-xs text-gray-300 font-sans">{book.publishedYear}</span>
                  </div>

                  <div className="text-center py-2">
                    <h4 className="font-nastaliq text-2xl sm:text-3xl text-gold-100 font-bold leading-[2.3] drop-shadow-md">
                      {book.titleUrdu}
                    </h4>
                    <p className="font-sans text-[11px] text-gold-400/90 tracking-widest uppercase">
                      {book.titleEnglish}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-naskh text-gray-200 border-t border-gold-500/30 pt-2 font-medium">
                    <span>{book.author}</span>
                    <span>{book.pages}</span>
                  </div>
                </div>

                {/* Book Details */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-gold-300 font-naskh mb-3 font-semibold">
                    <span>حجم: {book.fileSize}</span>
                    <span>•</span>
                    <span>زبان: {book.language}</span>
                  </div>

                  <p className="font-naskh text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                    {book.description}
                  </p>
                </div>

                {/* Download CTA */}
                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => handleDownload(book)}
                    className={`w-full py-3 px-4 rounded-xl text-sm sm:text-base font-naskh font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDownloading
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 shadow-md shadow-gold-500/20 hover:scale-[1.02]'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>ڈاؤنلوڈ شروع ہو گیا...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-slate-950" />
                        <span>پی ڈی ایف مفت ڈاؤنلوڈ کریں</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Curated External Reading Links & Digital Libraries */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-emerald-400" />
          <h3 className="font-nastaliq text-3xl font-bold text-gold-200 leading-normal">
            تحقیقی و مطالعاتی مآخذ (معتبر بیرونی علمی روابط)
          </h3>
        </div>

        <p className="font-naskh text-sm sm:text-base text-gray-300 mb-6 max-w-2xl">
          طلبہ، ذاکرین اور محققین کی آسانی کے لیے تاریخِ اسلام، مراثی، اور صوفیانہ کلام کی معروف آن لائن لائبریریاں:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXTERNAL_READING_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="royal-card rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/60 transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-naskh px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {link.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </div>

                <h4 className="font-nastaliq text-xl font-bold text-white leading-[2.2] mb-2 group-hover:text-gold-300">
                  {link.title}
                </h4>

                <p className="font-naskh text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {link.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-gray-400 font-sans">
                <span>{link.language}</span>
                <span className="text-gold-300 group-hover:underline flex items-center gap-1 font-naskh font-bold">
                  ویب سائٹ ملاحظہ کریں
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
