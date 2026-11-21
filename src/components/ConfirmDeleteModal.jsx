import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, title, itemType, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-md royal-card rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl p-6 space-y-5">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-jameel text-2xl font-bold text-white leading-tight">
                {itemType === 'article' ? 'مقالہ حذف کریں؟' : 'کلام حذف کریں؟'}
              </h3>
              <p className="text-xs font-naskh text-gray-400">
                یہ عمل واپس نہیں ہو سکے گا
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-jameel text-xl text-gold-200 leading-relaxed">
          "{title}"
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 font-naskh text-sm cursor-pointer"
          >
            منسوخ کریں
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-naskh text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/20"
          >
            <Trash2 className="w-4 h-4" />
            <span>جی ہاں، حذف کریں</span>
          </button>
        </div>

      </div>
    </div>
  );
}

