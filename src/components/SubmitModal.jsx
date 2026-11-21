import React, { useState, useEffect } from 'react';
import { X, Plus, Feather, Check, Youtube, Save } from 'lucide-react';
import { getOccasionsForGenre } from '../data/poetryData';

const DEFAULT_KALAM_FORM = {
  titleUrdu: '',
  genre: 'نوحہ',
  occasion: 'آمد ِ  محرم',
  reciter: '',
  language: 'Urdu',
  youtubeUrl: '',
  firstVerse: '',
  fullKalam: '',
  year: new Date().getFullYear().toString()
};

export default function SubmitModal({ isOpen, onClose, kalamToEdit, onSaveKalam }) {
  const [formData, setFormData] = useState(DEFAULT_KALAM_FORM);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSaved(false);
      if (kalamToEdit) {
        setFormData({
          titleUrdu: kalamToEdit.titleUrdu || '',
          genre: kalamToEdit.genre || 'نوحہ',
          occasion: kalamToEdit.occasion || 'آمد ِ  محرم',
          reciter: kalamToEdit.reciter || '',
          language: kalamToEdit.language || 'Urdu',
          youtubeUrl: kalamToEdit.youtubeUrl || '',
          firstVerse: kalamToEdit.firstVerse || '',
          fullKalam: kalamToEdit.fullKalam || '',
          year: kalamToEdit.year || new Date().getFullYear().toString()
        });
      } else {
        setFormData({ ...DEFAULT_KALAM_FORM, year: new Date().getFullYear().toString() });
      }
    }
  }, [isOpen, kalamToEdit]);

  if (!isOpen) return null;

  const isEditMode = Boolean(kalamToEdit);
  const occasionScope = getOccasionsForGenre(formData.genre);

  const handleGenreChange = (newGenre) => {
    const nextScope = getOccasionsForGenre(newGenre);
    setFormData((prev) => ({
      ...prev,
      genre: newGenre,
      occasion: nextScope.list?.[0] || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedKalam = {
      ...kalamToEdit,
      ...formData,
      id: kalamToEdit?.id || `kalam-${Date.now()}`,
      genreSlug: formData.genre === 'نوحہ' ? 'noha' 
               : formData.genre === 'منقبت' ? 'manqabat'
               : formData.genre === 'سلام' ? 'salam'
               : formData.genre === 'مرثیہ' ? 'marsiya'
               : formData.genre === 'نعت' ? 'naat'
               : formData.genre === 'حمد' ? 'hamd'
               : 'qaseeda',
      titleRoman: kalamToEdit?.titleRoman || formData.titleUrdu,
      views: kalamToEdit?.views || '1',
      popular: kalamToEdit?.popular ?? false
    };
    onSaveKalam(savedKalam, isEditMode);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-2xl royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-gold-400" />
            <h3 className="font-jameel text-2xl font-bold text-gold-300">
              {isEditMode ? 'کلام میں ترمیم کریں' : 'نیا کلام پورٹل میں شامل کریں'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          {saved ? (
            <div className="text-center py-12">
              <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-jameel text-3xl text-white font-bold mb-1">
                {isEditMode ? 'کلام کامیابی سے اپڈیٹ ہو گیا!' : 'کلام کامیابی سے شامل کر دیا گیا!'}
              </h4>
              <p className="font-naskh text-sm text-gray-300">
                {isEditMode ? 'تبدیلیاں محفوظ کر لی گئی ہیں۔' : 'نیا کلام صفحۂ اول کے تازہ ترین کلام میں شامل ہو چکا ہے۔'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title / Matla */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">عنوانِ کلام / مطلع:</label>
                <input
                  type="text"
                  required
                  value={formData.titleUrdu}
                  onChange={(e) => setFormData({...formData, titleUrdu: e.target.value})}
                  placeholder="مثال: پسلیاں ٹوٹے تو ہوتی ہیں قیامت زہراؑ"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Genre & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. صنف (Exact list from user annotation: Hamd, Naat, Qaseeda, Manqabat, Noha, Salam, Marsiya) */}
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">صنف (Genre):</label>
                  <select
                    value={formData.genre}
                    onChange={(e) => handleGenreChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    <option value="حمد">حمد (Hamd)</option>
                    <option value="نعت">نعت (Naat)</option>
                    <option value="قصیدہ">قصیدہ (Qaseeda)</option>
                    <option value="منقبت">منقبت (Manqabat)</option>
                    <option value="نوحہ">نوحہ (Noha)</option>
                    <option value="سلام">سلام (Salam)</option>
                    <option value="مرثیہ">مرثیہ (Marsiya)</option>
                  </select>
                </div>

                {/* 2. مناسبت / موضوع (Scoped dynamically by selected genre) */}
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">مناسبت / موضوع (Occasion):</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    {(occasionScope.list || []).map((occ) => (
                      <option key={`modal-${occ}`} value={occ} className="bg-[#08261c] text-white">
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reciter & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">ذاکر / نوحہ خواں (اگر ہو):</label>
                  <input
                    type="text"
                    value={formData.reciter}
                    onChange={(e) => setFormData({...formData, reciter: e.target.value})}
                    placeholder="مثال: سجاد حسین سجاد"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400"
                  />
                </div>

                {/* 3. زبان (Exact list: Urdu, Sindhi, Punjabi, Saraiki, Other) */}
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">زبان (Language):</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    <option value="Urdu">اردو (Urdu)</option>
                    <option value="Sindhi">سنڌي (Sindhi)</option>
                    <option value="Punjabi">پنجابي (Punjabi)</option>
                    <option value="Saraiki">سرائیکی (Saraiki)</option>
                    <option value="Other">مختلف / دیگر (Other)</option>
                  </select>
                </div>
              </div>

              {/* YouTube Link Field (As requested in Image 1) */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>یوٹیوب ویڈیو لنک (YouTube Link - اختیاری):</span>
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-sm font-sans focus:outline-none focus:border-gold-400 text-left"
                  dir="ltr"
                />
              </div>

              {/* First Verse preview */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">پہلا شعر / مطلع (مختصر جھلک):</label>
                <textarea
                  rows={2}
                  required
                  value={formData.firstVerse}
                  onChange={(e) => setFormData({...formData, firstVerse: e.target.value})}
                  placeholder="دو مصرعے درج فرمائیں..."
                  className="w-full px-4 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-lg focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Full Kalam */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">مکمل کلام (بند بہ بند):</label>
                <textarea
                  rows={6}
                  required
                  value={formData.fullKalam}
                  onChange={(e) => setFormData({...formData, fullKalam: e.target.value})}
                  placeholder="تمام اشعار اور مقطع درج فرمائیں..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-lg focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold font-naskh text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/20"
              >
                {isEditMode ? <Save className="w-5 h-5 text-slate-950" /> : <Plus className="w-5 h-5 text-slate-950" />}
                <span>{isEditMode ? 'تبدیلیاں محفوظ کریں' : 'کلام شائع کریں'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
