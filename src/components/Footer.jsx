import React from 'react';
import { Feather, Sparkles, Youtube, MessageCircle, Mail } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenSubmitModal }) {
  return (
    <footer className="border-t border-[var(--border-gold)] bg-black/60 text-gray-300 font-naskh pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Identity & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Feather className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-jameel text-3xl text-gold-300 font-bold leading-tight">پیغامِ ہدایت</h3>
                <span className="font-jameel text-2xl text-white font-bold block -mt-1">ثناگر حسینی</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              اردو و سندھی عزائیہ شاعری، مراثی، نوحہ جات، مناقب، اور ادبی و فکری مقالات کا باضابطہ و مستند پورٹل۔
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSubmitModal}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-naskh font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>نیا کلام شامل کریں (ایڈمن)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (Without video/audio as requested) */}
          <div>
            <h4 className="font-jameel text-2xl text-gold-300 font-bold mb-4 border-b border-white/10 pb-2">
              اہم شعبہ جات
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <button onClick={() => setActiveTab('poetry')} className="hover:text-gold-400 transition-colors cursor-pointer">
                  • دیوانِ کلام (نوحہ، منقبت، سلام)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-gold-400 transition-colors cursor-pointer">
                  • مقالات و مضامین (تحقیق و نقد)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('library')} className="hover:text-gold-400 transition-colors cursor-pointer">
                  • کتب ڈاؤنلوڈ و مطالعہ گاہ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-gold-400 transition-colors cursor-pointer">
                  • تعارف و سوانح
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Occasions Overview */}
          <div>
            <h4 className="font-jameel text-2xl text-gold-300 font-bold mb-4 border-b border-white/10 pb-2">
              موضوعات و مناسبات
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>• ایامِ فاطمیہ (س) و مصائبِ سیدہؑ</li>
              <li>• محرم الحرام و معرکۂ عاشورہ</li>
              <li>• اربعینِ حسینی و سفرِ شام</li>
              <li>• عیدِ غدیر و مدحتِ امیرالمومنینؑ</li>
              <li>• سنڌي صوفياڻو ۽ ماتمي ڪلام</li>
            </ul>
          </div>

          {/* Col 4: Community & Contact */}
          <div>
            <h4 className="font-jameel text-2xl text-gold-300 font-bold mb-4 border-b border-white/10 pb-2">
              رابطہ و چینلز
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              کلام کے حصول، محافل و مجالس میں شرکت اور ادبی استفسار کے لیے ثناگر حسینی سے رابطہ فرمائیں:
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 flex items-center justify-center text-red-400 transition-colors"
                title="یوٹیوب چینل"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"
                title="واٹس ایپ چینل"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setActiveTab('about')}
                className="w-11 h-11 rounded-xl bg-gold-500/20 hover:bg-gold-500/40 border border-gold-500/30 flex items-center justify-center text-gold-400 transition-colors cursor-pointer"
                title="پیغام بھیجیں"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            جملہ حقوق محفوظ ہیں © {new Date().getFullYear()} — پیغامِ ہدایت (ثناگر حسینی)
          </p>
          <div className="flex items-center gap-2 text-gold-400/90 font-medium">
            <span>طراحی برائے عاشقانِ ادب و عزاداری</span>
            <span>•</span>
            <span>باضابطہ پورٹل</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
