import React, { useState, useEffect } from 'react';
import { X, FileText, Check, Plus, Save } from 'lucide-react';

const EMPTY_ARTICLE = {
  titleUrdu: '',
  titleEnglish: '',
  author: 'ثناگر حسینی',
  category: 'فکری و اسلامی مقالات',
  readTime: '5 منٹ مطالعہ',
  tagsText: 'دینِ اسلام، تحقیق و فکر',
  summaryUrdu: '',
  content: ''
};

export default function ArticleSubmitModal({ isOpen, onClose, articleToEdit, onSaveArticle }) {
  const [formData, setFormData] = useState(EMPTY_ARTICLE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSaved(false);
      if (articleToEdit) {
        setFormData({
          titleUrdu: articleToEdit.titleUrdu || '',
          titleEnglish: articleToEdit.titleEnglish || '',
          author: articleToEdit.author || 'ثناگر حسینی',
          category: articleToEdit.category || 'فکری و اسلامی مقالات',
          readTime: articleToEdit.readTime || '5 منٹ مطالعہ',
          tagsText: (articleToEdit.tags || []).join('، '),
          summaryUrdu: articleToEdit.summaryUrdu || '',
          content: articleToEdit.content || ''
        });
      } else {
        setFormData(EMPTY_ARTICLE);
      }
    }
  }, [isOpen, articleToEdit]);

  if (!isOpen) return null;

  const isEditMode = Boolean(articleToEdit);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedTags = formData.tagsText
      .split(/[،,]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const savedArticle = {
      id: articleToEdit?.id || `article-${Date.now()}`,
      titleUrdu: formData.titleUrdu.trim(),
      titleEnglish: formData.titleEnglish.trim() || formData.titleUrdu.trim(),
      author: formData.author.trim() || 'ثناگر حسینی',
      date: articleToEdit?.date || 'نومبر 2026',
      readTime: formData.readTime.trim() || '5 منٹ مطالعہ',
      category: formData.category.trim() || 'فکری و اسلامی مقالات',
      categorySlug: articleToEdit?.categorySlug || 'islamic-thought',
      summaryUrdu: formData.summaryUrdu.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['مقالہ'],
      content: formData.content.trim()
    };

    onSaveArticle(savedArticle, isEditMode);
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
            <FileText className="w-5 h-5 text-gold-400" />
            <h3 className="font-jameel text-2xl font-bold text-gold-300">
              {isEditMode ? 'مقالہ میں ترمیم کریں' : 'نیا مقالہ پورٹل میں شامل کریں'}
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
                {isEditMode ? 'مقالہ کامیابی سے اپڈیٹ ہو گیا!' : 'نیا مقالہ کامیابی سے شامل کر دیا گیا!'}
              </h4>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Urdu Title */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                  عنوانِ مقالہ (اردو / سندھی):
                </label>
                <input
                  type="text"
                  required
                  value={formData.titleUrdu}
                  onChange={(e) => setFormData({ ...formData, titleUrdu: e.target.value })}
                  placeholder="مقالے کا مکمل عنوان درج کریں..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* English Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    انگریزی عنوان (اختیاری):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={formData.titleEnglish}
                    onChange={(e) => setFormData({ ...formData, titleEnglish: e.target.value })}
                    placeholder="English Title (Optional)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    مصنف / قلمکار:
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

              {/* Category, Read Time & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    شعبہ / زمرہ:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    مطالعہ کا وقت:
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="مثال: 8 منٹ مطالعہ"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                    ٹیگز (کوما سے الگ کریں):
                  </label>
                  <input
                    type="text"
                    value={formData.tagsText}
                    onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                    placeholder="اسلام، تحقیق، اخلاقیات"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                  مختصر خلاصہ:
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.summaryUrdu}
                  onChange={(e) => setFormData({ ...formData, summaryUrdu: e.target.value })}
                  placeholder="مقالے کا مرکزی تعارف یا خلاصہ تحریر کریں..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">
                  مکمل مقالہ (سرخی کے لیے ## اور قرآنی آیات کے لیے &gt; استعمال کر سکتے ہیں):
                </label>
                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="مکمل تحقیقی مضمون یہاں درج فرمائیں..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh leading-relaxed focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-naskh text-sm cursor-pointer"
                >
                  منسوخ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-slate-950 font-bold font-naskh text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  {isEditMode ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isEditMode ? 'تبدیلیاں محفوظ کریں' : 'مقالہ شائع کریں'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

