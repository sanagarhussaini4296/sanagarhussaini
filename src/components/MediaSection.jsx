import React from 'react';
import { Video, Play, Mic2, Eye } from 'lucide-react';

export default function MediaSection({ poetryList, onOpenVideo, onOpenMimbar }) {
  const mediaItems = poetryList.filter(p => p.reciter && p.reciter.length > 0);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-[var(--border-gold)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-naskh mb-2.5">
          <Video className="w-3.5 h-3.5" />
          <span>صدائے ترنم و مجالسِ عزا — کلامِ ثناگر حسینی</span>
        </div>
        <h2 className="font-nastaliq text-4xl sm:text-5xl font-bold text-gold-200 leading-[2.2]">
          ویڈیو و آڈیو ریکارڈنگز
        </h2>
        <p className="font-naskh text-base text-gray-300 mt-1">
          ثناگر حسینی کا کلام جب نامور ذاکرین اور نوحہ خوانوں کی پر سوز آواز میں گونجا
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaItems.map((item) => (
          <div 
            key={item.id}
            className="royal-card rounded-3xl overflow-hidden group flex flex-col justify-between"
          >
            {/* Video Thumbnail Area */}
            <div 
              onClick={() => onOpenVideo(item)}
              className="relative h-52 bg-gradient-to-t from-black via-[#062017] to-black flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-xl shadow-red-600/50 text-white transition-all transform group-hover:scale-110 z-10">
                <Play className="w-7 h-7 fill-white ml-0.5" />
              </div>

              {/* Badges on video */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-naskh text-gold-300 border border-gold-500/30 font-bold">
                  {item.genre}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 text-xs text-gray-300 bg-black/70 px-2.5 py-1 rounded-md">
                <Eye className="w-3.5 h-3.5 text-gold-400" />
                <span>{item.views} مناظر</span>
              </div>
            </div>

            {/* Video Meta */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-nastaliq text-2xl font-bold text-gold-100 leading-[2.3] mb-2 group-hover:text-gold-300">
                  {item.titleUrdu}
                </h3>
                <p className="font-naskh text-sm text-gray-300 mb-3">
                  آواز: <strong className="text-white">{item.reciter}</strong>
                </p>
                <p className="font-naskh text-xs sm:text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                  {item.firstVerse}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenVideo(item)}
                  className="text-xs sm:text-sm font-naskh text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <Play className="w-3.5 h-3.5 fill-red-400" />
                  <span>ریکارڈنگ سنیں</span>
                </button>

                <button
                  onClick={() => onOpenMimbar(item)}
                  className="text-xs sm:text-sm font-naskh text-gray-300 hover:text-gold-300 flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <Mic2 className="w-3.5 h-3.5 text-gold-400" />
                  <span>منبر پر پڑھیں</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
