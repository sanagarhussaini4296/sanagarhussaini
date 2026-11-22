import React, { useState, useEffect } from 'react';
import { X, BookOpen, Check, Save, Calendar, FileText, Layers, Link2 } from 'lucide-react';

const COVER_THEMES = [
  { label: 'امبر و زرّیں (Amber / Gold)', value: 'from-amber-900 to-amber-950', preview: 'bg-amber-800' },
  { label: 'زمردی سبز (Emerald Green)', value: 'from-emerald-900 to-emerald-950', preview: 'bg-emerald-800' },
  { label: 'سیاہ و سلیٹ (Dark Slate)', value: 'from-slate-900 to-slate-950', preview: 'bg-slate-800' },
  { label: 'یاقوتی سرخ (Royal Crimson)', value: 'from-red-950 to-rose-950', preview: 'bg-rose-900' },
  { label: 'شاہانہ جامنی (Royal Purple)', value: 'from-purple-950 to-indigo-950', preview: 'bg-purple-900' },
  { label: 'فیروزی نیلا (Cyan / Navy)', value: 'from-cyan-950 to-blue-950', preview: 'bg-cyan-900' },
];

const EMPTY_BOOK = {
  titleUrdu: '',
  titleEnglish: '',
  author: 'ثناگر حسینی',
  pages: '200 صفحات',
  fileSize: '10 MB',
  type: 'کتاب (پی ڈی ایف ڈاؤنلوڈ)',
  language: 'اردو و سندھی',
  publishedYear: new Date().getFullYear().toString(),
  badge: 'مستند کتاب',
  coverColor: 'from-amber-900 to-amber-950',
  downloadUrl: '',
  description: ''
};

export default function BookSubmitModal({ isOpen, onClose, bookToEdit, onSaveBook }) {
  const [formData, setFormData] = useState(EMPTY_BOOK);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSaved(false);
      if (bookToEdit) {
        setFormData({
          titleUrdu: bookToEdit.titleUrdu || '',
          titleEnglish: bookToEdit.titleEnglish || '',
          author: bookToEdit.author || 'ثناگر حسینی',
          pages: bookToEdit.pages || '200 صفحات',
          fileSize: bookToEdit.fileSize || '10 MB',
          type: bookToEdit.type || 'کتاب (پی ڈی ایف ڈاؤنلوڈ)',
          language: bookToEdit.language || 'اردو و سندھی',
          publishedYear: bookToEdit.publishedYear || new Date().getFullYear().toString(),
          badge: bookToEdit.badge || 'مستند کتاب',
          coverColor: bookToEdit.coverColor || 'from-amber-900 to-amber-950',
          downloadUrl: bookToEdit.downloadUrl || '',
          description: bookToEdit.description || ''
        });
      } else {
        setFormData({
          ...EMPTY_BOOK,
          publishedYear: new Date().getFullYear().toString()
        });
      }
    }
  }, [isOpen, bookToEdit]);

  if (!isOpen) return null;

  const isEditMode = Boolean(bookToEdit);

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedBook = {
      id: bookToEdit?.id || `book-${Date.now()}`,
      titleUrdu: formData.titleUrdu.trim(),
      titleEnglish: formData.titleEnglish.trim() || formData.titleUrdu.trim(),
      author: formData.author.trim() || 'ثناگر حسینی',
      pages: formData.pages.trim() || '200 صفحات',
      fileSize: formData.fileSize.trim() || '10 MB',
      type: formData.type.trim() || 'کتاب (پی ڈی ایف ڈاؤنلوڈ)',
      language: formData.language.trim() || 'اردو و سندھی',
      publishedYear: formData.publishedYear.trim() || new Date().getFullYear().toString(),
      badge: formData.badge.trim() || 'مستند کتاب',
      coverColor: formData.coverColor || 'from-amber-900 to-amber-950',
      downloadUrl: formData.downloadUrl.trim() || '#download',
      description: formData.description.trim()
    };

    onSaveBook(savedBook, isEditMode);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-3xl royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold-400" />
            <h3 className="font-jameel text-2xl font-bold text-gold-300">
              {isEditMode ? 'کتاب کی تفصیلات میں ترمیم کریں' : 'نئی کتاب / دیوان کتب خانہ میں شامل کریں'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {saved ? (
            <div className="text-center py-12">
              <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-jameel text-3xl text-white font-bold mb-1">
                {isEditMode ? 'کتاب کی تفصیلات کامیابی سے اپڈیٹ ہو گئیں!' : 'نئی کتاب کامیابی سے کتب خانہ میں شامل کر دی گئی!'}
              </h4>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Urdu Title */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                  عنوانِ کتاب / دیوان (اردو / سنڌي): *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titleUrdu}
                  onChange={(e) => setFormData({ ...formData, titleUrdu: e.target.value })}
                  placeholder="مثال: دیوانِ ثناگر (مجموعۂ مراثی و نوحہ جات)"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* English Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    انگریزی عنوان (English Title - اختیاری):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={formData.titleEnglish}
                    onChange={(e) => setFormData({ ...formData, titleEnglish: e.target.value })}
                    placeholder="e.g. Diwan-e-Sanagar: Collected Elegies"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    مصنف / شاعر / مرتب: *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Year, Pages & File Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>سالِ اشاعت / تاریخ: *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                    placeholder="مثال: 2024 یا 1445ھ"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    صفحات کی تعداد:
                  </label>
                  <input
                    type="text"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    placeholder="مثال: 320 صفحات"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    فائل کا حجم (سائز):
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="مثال: 14.2 MB"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Language, Type & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    زبان (Language):
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    <option value="اردو و سندھی">اردو و سندھی</option>
                    <option value="اردو">اردو</option>
                    <option value="سنڌي">سنڌي</option>
                    <option value="پنجابي">پنجابي</option>
                    <option value="سرائیکی">سرائیکی</option>
                    <option value="عربی">عربی</option>
                    <option value="دیگر">دیگر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    نوعیتِ مواد:
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="کتاب (پی ڈی ایف ڈاؤنلوڈ) یا کتابچہ"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    امتیازی بیج (Badge):
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="مثال: مستند کتاب یا مقبول مجموعہ"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Cover Color Theme & Download URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-gold-400" />
                    <span>سرورق کا رنگ / تھیم (Book Cover Gradient):</span>
                  </label>
                  <select
                    value={formData.coverColor}
                    onChange={(e) => setFormData({ ...formData, coverColor: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    {COVER_THEMES.map((theme) => (
                      <option key={theme.value} value={theme.value}>
                        {theme.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>پی ڈی ایف ڈاؤنلوڈ لنک (URL - اختیاری):</span>
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    placeholder="https://drive.google.com/... یا ڈائریکٹ پی ڈی ایف لنک"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                  کتاب کا تفصیلی تعارف و تبصرہ: *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="کتاب کے مندرجات، اہم خصوصیات اور قارئین کے لیے وضاحتی نوٹ درج فرمائیں..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-naskh text-sm cursor-pointer"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-slate-950 font-bold font-naskh text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditMode ? 'تبدیلیاں محفوظ کریں' : 'کتاب شامل کریں'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
