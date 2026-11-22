import React, { useState, useEffect } from 'react';
import { X, Plus, Feather, Check, Youtube, Save, Trash2, Tag, AlertCircle } from 'lucide-react';
import { getOccasionsForGenre, OCCASIONS_LIST_1, OCCASIONS_LIST_2 } from '../data/poetryData';

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

export default function SubmitModal({ 
  isOpen, 
  onClose, 
  kalamToEdit, 
  onSaveKalam,
  occasionsList1 = OCCASIONS_LIST_1,
  occasionsList2 = OCCASIONS_LIST_2,
  onAddOccasion,
  onDeleteOccasion
}) {
  const [formData, setFormData] = useState(DEFAULT_KALAM_FORM);
  const [saved, setSaved] = useState(false);

  // Admin dynamic occasion controls
  const [showAddOccasion, setShowAddOccasion] = useState(false);
  const [newOccasionInput, setNewOccasionInput] = useState('');
  const [occasionFeedback, setOccasionFeedback] = useState('');

  const occasionScope = getOccasionsForGenre(formData.genre, occasionsList1, occasionsList2);
  const currentOccasions = occasionScope.list || [];

  useEffect(() => {
    if (isOpen) {
      setSaved(false);
      setShowAddOccasion(false);
      setNewOccasionInput('');
      setOccasionFeedback('');

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
        const defaultOcc = getOccasionsForGenre('نوحہ', occasionsList1, occasionsList2).list?.[0] || 'آمد ِ  محرم';
        setFormData({ 
          ...DEFAULT_KALAM_FORM, 
          occasion: defaultOcc,
          year: new Date().getFullYear().toString() 
        });
      }
    }
  }, [isOpen, kalamToEdit, occasionsList1, occasionsList2]);

  if (!isOpen) return null;

  const isEditMode = Boolean(kalamToEdit);

  const handleGenreChange = (newGenre) => {
    const nextScope = getOccasionsForGenre(newGenre, occasionsList1, occasionsList2);
    setFormData((prev) => ({
      ...prev,
      genre: newGenre,
      occasion: nextScope.list?.[0] || ''
    }));
    setShowAddOccasion(false);
  };

  // Add new occasion (Admin Power)
  const handleConfirmAddOccasion = () => {
    const trimmed = newOccasionInput.trim();
    if (!trimmed) return;
    
    if (onAddOccasion) {
      onAddOccasion(formData.genre, trimmed);
    }
    setFormData(prev => ({ ...prev, occasion: trimmed }));
    setNewOccasionInput('');
    setShowAddOccasion(false);
    setOccasionFeedback(`مناسبت "${trimmed}" فہرست میں شامل ہو گئی!`);
    setTimeout(() => setOccasionFeedback(''), 3000);
  };

  // Delete occasion (Admin Power)
  const handleDeleteCurrentOccasion = () => {
    if (!formData.occasion) return;
    const target = formData.occasion;
    if (window.confirm(`کیا آپ واقعی مناسبت "${target}" کو فہرست سے ہمیشہ کے لیے حذف کرنا چاہتے ہیں؟`)) {
      if (onDeleteOccasion) {
        onDeleteOccasion(formData.genre, target);
      }
      const remaining = currentOccasions.filter(o => o !== target);
      setFormData(prev => ({ ...prev, occasion: remaining[0] || '' }));
      setOccasionFeedback(`مناسبت "${target}" فہرست سے حذف کر دی گئی۔`);
      setTimeout(() => setOccasionFeedback(''), 3000);
    }
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
                  placeholder="مثال: فلک جاگیرِ زہراؑ ہے"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Genre & Occasion (With Admin Powers: Add & Delete Occasion) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. صنف */}
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

                {/* 2. مناسبت / موضوع (Scoped with Admin Add & Delete) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-naskh text-gold-300 font-bold">
                      مناسبت / موضوع (Occasion):
                    </label>
                    <div className="flex items-center gap-1">
                      {/* Add Occasion Button */}
                      <button
                        type="button"
                        onClick={() => setShowAddOccasion(!showAddOccasion)}
                        className="px-2 py-0.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/35 text-gold-300 border border-gold-500/40 text-[11px] font-naskh flex items-center gap-1 cursor-pointer transition-colors"
                        title="اس فہرست میں نئی مناسبت کا اضافہ کریں"
                      >
                        <Plus className="w-3 h-3 text-gold-400" />
                        <span>نئی مناسبت</span>
                      </button>

                      {/* Delete Selected Occasion Button */}
                      {formData.occasion && (
                        <button
                          type="button"
                          onClick={handleDeleteCurrentOccasion}
                          className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/40 text-[11px] cursor-pointer transition-colors"
                          title={`منتخب مناسبت "${formData.occasion}" کو فہرست سے حذف کریں`}
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Occasion Dropdown */}
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-gold-500/30 text-white text-sm font-naskh focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    {currentOccasions.map((occ) => (
                      <option key={`modal-${occ}`} value={occ} className="bg-[#08261c] text-white">
                        {occ}
                      </option>
                    ))}
                  </select>

                  {/* Feedback Message */}
                  {occasionFeedback && (
                    <div className="mt-1.5 text-[11px] font-naskh text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{occasionFeedback}</span>
                    </div>
                  )}

                  {/* Inline Add New Occasion Input */}
                  {showAddOccasion && (
                    <div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-gold-500/40 space-y-2 animate-fadeIn">
                      <label className="block text-[11px] font-naskh text-gold-300 font-bold">
                        نئی مناسبت درج فرمائیں:
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newOccasionInput}
                          onChange={(e) => setNewOccasionInput(e.target.value)}
                          placeholder="مثال: ولادت باسعادت حضرت امام علی ع"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-gold-500/30 text-white text-xs font-naskh focus:outline-none focus:border-gold-400"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleConfirmAddOccasion();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleConfirmAddOccasion}
                          className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold font-naskh text-xs cursor-pointer shadow-sm"
                        >
                          شامل کریں
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddOccasion(false);
                            setNewOccasionInput('');
                          }}
                          className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 font-naskh text-xs cursor-pointer"
                        >
                          منسوخ
                        </button>
                      </div>
                    </div>
                  )}
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

                {/* 3. زبان */}
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

              {/* YouTube Link Field */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>یوٹیوب ویڈیو / آڈیو لنک (براہِ راست لنک):</span>
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

              {/* First Verse Preview */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">پہلا شعر / مطلع (کارڈ پر دکھانے کے لیے):</label>
                <textarea
                  rows="2"
                  required
                  value={formData.firstVerse}
                  onChange={(e) => setFormData({...formData, firstVerse: e.target.value})}
                  placeholder="پہلا شعر درج فرمائیں..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Full Kalam */}
              <div>
                <label className="block text-xs font-naskh text-gold-300 mb-1.5 font-bold">مکمل کلام (تمام بند و اشعار):</label>
                <textarea
                  rows="6"
                  required
                  value={formData.fullKalam}
                  onChange={(e) => setFormData({...formData, fullKalam: e.target.value})}
                  placeholder="مکمل کلام یہاں درج فرمائیں (ہر بند کے درمیان ایک خالی لائن رکھیں)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white font-jameel text-xl focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Submit Button */}
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
                  <span>{isEditMode ? 'تبدیلیاں محفوظ کریں' : 'کلام شامل کریں'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
