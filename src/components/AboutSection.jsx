import React, { useState } from 'react';
import { User, Feather, Send, Mail, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const [formData, setFormData] = useState({
    name: '',
    role: 'ذاکر / نوحہ خواں',
    phone: '',
    occasion: 'ایامِ فاطمیہ (س)',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', role: 'ذاکر / نوحہ خواں', phone: '', occasion: 'ایامِ فاطمیہ (س)', message: '' });
    }, 4000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Bio / About Section */}
      <div className="royal-card rounded-3xl p-6 sm:p-10 mb-16 relative overflow-hidden border-2 border-gold-500/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Emblem Frame */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-emerald-600 p-1.5 shadow-2xl shadow-gold-500/20 mb-4">
              <div className="w-full h-full rounded-full bg-[var(--bg-main)] flex flex-col items-center justify-center p-4 border border-gold-500/30">
                <Feather className="w-16 h-16 text-gold-400 mb-2 animate-bounce" />
                <span className="font-jameel text-4xl text-gold-300 font-bold leading-tight">
                  پیغامِ ہدایت
                </span>
                <span className="text-xs font-sans text-gold-400/80 uppercase tracking-widest mt-1">
                  Paigham-e-Hidayat
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-naskh font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>پورٹل برائے کلام، مقالات و مطالعہ گاہ</span>
            </div>
          </div>

          {/* About text */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-naskh mb-3 border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>تعارف و ادبی سفر</span>
            </div>

            <h2 className="font-jameel text-4xl sm:text-5xl font-bold text-gold-200 leading-[2.3] mb-4">
              پیغامِ ہدایت: اغراض و مقاصد
            </h2>

            <div className="space-y-4 font-naskh text-gray-200 text-base sm:text-lg leading-relaxed">
              <p>
                <strong>پیغامِ ہدایت</strong> اردو اور سندھی عزائیہ، عقیدتی اور فکری ادب کا ایک باوقار ڈیجیٹل پلیٹ فارم ہے۔ اس کا بنیادی مقصد آلِ محمدؑ کے مقدس کلام، مراثی، نوحہ جات، مناقب، اور تحقیقی مقالات کو ایک خوبصورت، مستند اور جدید انداز میں دنیا بھر کے قارئین، ذاکرین، اور محققین تک پہنچانا ہے۔
              </p>
              <p>
                یہاں موجود کلام پاکستان اور دنیا بھر کے صفِ اول کے ذاکرین اور نوحہ خوانوں (جیسے سجاد حسین سجاد، خوکھر برادرز، ذاکر علی حسن، اور دیگر) نے پاکستان، ہندوستان، عراق، اور یورپی ممالک میں منعقدہ مجالس و محافل میں ترنم اور سوز کے ساتھ پیش کیا ہے۔
              </p>
              <p>
                شاعری کے ساتھ ساتھ تحقیقی مقالات، نقدِ ادب، اور تاریخِ کربلا کے معتبر مآخذ کی تبیین اس پورٹل کا اہم حصہ ہے، تاکہ نئی نسل شعورِ حسینیؑ اور صوفیانہ روایات سے جڑی رہے۔
              </p>
            </div>

            {/* Badges / Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--border-gold)]/40 text-center">
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold-500/15">
                <div className="font-jameel text-3xl text-gold-400 font-bold">200+</div>
                <div className="text-xs font-naskh text-gray-300">کلام و نوحہ جات</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold-500/15">
                <div className="font-jameel text-3xl text-emerald-400 font-bold">3</div>
                <div className="text-xs font-naskh text-gray-300">مطبوعہ شعری مجموعے</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold-500/15">
                <div className="font-jameel text-3xl text-gold-400 font-bold">50+</div>
                <div className="text-xs font-naskh text-gray-300">تحقیقی مقالات</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold-500/15">
                <div className="font-jameel text-3xl text-red-400 font-bold">ملین+</div>
                <div className="text-xs font-naskh text-gray-300">سماعتیں و پذیرائی</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact & Kalam Request Form */}
      <div className="royal-card rounded-3xl p-6 sm:p-10 border border-gold-500/30">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 text-xs font-naskh mb-2.5">
            <Mail className="w-3.5 h-3.5" />
            <span>رابطہ برائے کلام و مجالس</span>
          </div>
          <h3 className="font-jameel text-3xl sm:text-4xl font-bold text-gold-200 leading-[2.2]">
            ذاکرین، نوحہ خوانوں اور محققین کے لیے پیغام رسانی
          </h3>
          <p className="font-naskh text-sm sm:text-base text-gray-300 mt-2">
            اگر آپ کسی خاص مناسبت (محرم، فاطمیہ، ولادت) کے لیے کلام حاصل کرنا چاہتے ہیں یا ادبی رہنمائی درکار ہے تو براہ راست رابطہ فرمائیں:
          </p>
        </div>

        {isSent ? (
          <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center max-w-xl mx-auto">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h4 className="font-jameel text-2xl text-white font-bold mb-2">آپ کا پیغام موصول ہو چکا ہے</h4>
            <p className="font-naskh text-sm text-emerald-200">
              ادارہ پیغامِ ہدایت جلد از جلد آپ کے فراہم کردہ نمبر پر رابطہ فرمائے گا۔ شکریہ!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">آپ کا نامِ گرامی:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="مثال: سید علی رضوی"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">تعلق / منصب:</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                >
                  <option value="ذاکر / نوحہ خواں">ذاکر / نوحہ خواں</option>
                  <option value="بانیِ مجلس / منتظم">بانیِ مجلس / منتظم</option>
                  <option value="محقق / طالبِ علم">محقق / طالبِ علم</option>
                  <option value="دیگر">عام قاری / دیگر</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">واٹس ایپ / رابطہ نمبر:</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="0300-1234567"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">مطلوبہ مناسبت:</label>
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                  placeholder="مثال: ایامِ فاطمیہ (س)، شہادت مولا علیؑ"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">تفصیل / پیغام:</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="آپ کو کس صنف کا کلام درکار ہے یا کوئی ادبی استفسار ہو تو تحریر فرمائیں..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold font-naskh text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/25"
            >
              <Send className="w-4 h-4" />
              <span>پیغام روانہ کریں</span>
            </button>
          </form>
        )}

      </div>

    </section>
  );
}
