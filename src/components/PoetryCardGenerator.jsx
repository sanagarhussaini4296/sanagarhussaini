import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Image as ImageIcon, Check } from 'lucide-react';

export default function PoetryCardGenerator({ kalam, onClose }) {
  const [selectedLines, setSelectedLines] = useState('');
  const [cardTheme, setCardTheme] = useState('emerald'); // emerald, obsidian, parchment
  const [ratio, setRatio] = useState('square'); // 'square' (1:1) or 'story' (9:16)
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef(null);

  // Split verses into stanzas or couplets
  const stanzas = kalam ? kalam.fullKalam.split('\n\n') : [];

  useEffect(() => {
    if (kalam && stanzas.length > 0) {
      setSelectedLines(stanzas[0]);
    }
  }, [kalam]);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas || !kalam) return;
    const ctx = canvas.getContext('2d');

    const width = 1080;
    const height = ratio === 'square' ? 1080 : 1920;

    canvas.width = width;
    canvas.height = height;

    // Backgrounds
    if (cardTheme === 'emerald') {
      const grad = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width/1.1);
      grad.addColorStop(0, '#0a3526');
      grad.addColorStop(1, '#02120c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (cardTheme === 'obsidian') {
      const grad = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width/1.1);
      grad.addColorStop(0, '#151d2f');
      grad.addColorStop(1, '#060911');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Parchment
      ctx.fillStyle = '#f9f6ee';
      ctx.fillRect(0, 0, width, height);
    }

    // Outer Ornamental Border
    ctx.strokeStyle = cardTheme === 'parchment' ? '#926317' : '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // Inner subtle border
    ctx.strokeStyle = cardTheme === 'parchment' ? 'rgba(146, 99, 23, 0.3)' : 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(76, 76, width - 152, height - 152);

    // Corner flourishes
    const corners = [
      [86, 86],
      [width - 86, 86],
      [86, height - 86],
      [width - 86, height - 86]
    ];
    ctx.fillStyle = cardTheme === 'parchment' ? '#b8861b' : '#d4af37';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top Genre / Header text
    ctx.textAlign = 'center';
    ctx.font = '30px "Noto Naskh Arabic", "MB Lateefi", sans-serif';
    ctx.fillStyle = cardTheme === 'parchment' ? '#926317' : '#d4af37';
    const topText = `••• ${kalam.genre} • ${kalam.occasion} •••`;
    ctx.fillText(topText, width / 2, ratio === 'square' ? 180 : 320);

    // Main Poetry Lines:
    // If Sindhi, use MB Lateefi; If Urdu, use Jameel Noori Nastaleeq
    const isSindhi = kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam';
    ctx.font = isSindhi 
      ? 'bold 56px "MB Lateefi", "MB Amar Fayyaz", serif'
      : 'bold 58px "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif';
    ctx.fillStyle = cardTheme === 'parchment' ? '#1c1917' : '#f8f6f0';
    
    const lines = selectedLines.split('\n');
    const startY = ratio === 'square' 
      ? 500 - ((lines.length - 1) * 65)
      : 880 - ((lines.length - 1) * 75);

    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + (index * 140));
    });

    // Center divider
    ctx.fillStyle = cardTheme === 'parchment' ? '#926317' : '#d4af37';
    const divY = ratio === 'square' ? startY + (lines.length * 140) + 20 : startY + (lines.length * 140) + 40;
    ctx.fillText('✦ ✦ ✦', width / 2, divY);

    // Primary Identity: پیغامِ ہدایت
    ctx.font = 'bold 52px "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif';
    ctx.fillStyle = cardTheme === 'parchment' ? '#78350f' : '#f5deb3';
    ctx.fillText('پیغامِ ہدایت', width / 2, ratio === 'square' ? 900 : 1550);

    // Subtitle / Brand
    ctx.font = '24px "Noto Naskh Arabic", sans-serif';
    ctx.fillStyle = cardTheme === 'parchment' ? '#78716c' : '#9ca3af';
    ctx.fillText('باضابطہ پورٹل برائے کلام و مقالات', width / 2, ratio === 'square' ? 960 : 1620);
  };

  useEffect(() => {
    document.fonts.ready.then(() => {
      drawCard();
    });
  }, [selectedLines, cardTheme, ratio, kalam]);

  const handleDownload = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `paigham-e-hidayat-${kalam.id || 'poetry'}-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
    setTimeout(() => setDownloading(false), 1500);
  };

  if (!kalam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl">
        
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gold-400" />
            <h3 className="font-jameel text-2xl font-bold text-gold-300">
              شعر کا تصویری کارڈ برائے سوشل میڈیا
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: Left Controls, Right Preview */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* Pick Stanza */}
            <div>
              <label className="block text-xs font-naskh text-gold-300 mb-2 font-bold">
                مطلوبہ شعر یا بند منتخب فرمائیں:
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {stanzas.map((stanza, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedLines(stanza)}
                    className={`w-full text-right p-3 rounded-xl border text-xs font-jameel leading-[2.2] transition-all cursor-pointer ${
                      selectedLines === stanza
                        ? 'bg-gold-500/20 border-gold-400 text-gold-200 shadow-md'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-gold-500/30'
                    }`}
                  >
                    {stanza}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Theme */}
            <div>
              <label className="block text-xs font-naskh text-gold-300 mb-2 font-bold">
                رنگ و پس منظر:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCardTheme('emerald')}
                  className={`py-2 px-3 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                    cardTheme === 'emerald' ? 'border-emerald-400 bg-[#06281e] text-emerald-300 shadow-md' : 'border-white/10 bg-black/40 text-gray-400'
                  }`}
                >
                  زمردِ شاہانہ
                </button>
                <button
                  onClick={() => setCardTheme('obsidian')}
                  className={`py-2 px-3 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                    cardTheme === 'obsidian' ? 'border-gold-400 bg-[#0b0f19] text-gold-300 shadow-md' : 'border-white/10 bg-black/40 text-gray-400'
                  }`}
                >
                  شاہانہ شبینہ
                </button>
                <button
                  onClick={() => setCardTheme('parchment')}
                  className={`py-2 px-3 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                    cardTheme === 'parchment' ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-md' : 'border-white/10 bg-black/40 text-gray-400'
                  }`}
                >
                  قرطاسِ ادب
                </button>
              </div>
            </div>

            {/* Choose Ratio */}
            <div>
              <label className="block text-xs font-naskh text-gold-300 mb-2 font-bold">
                تصویر کا سائز (فارمیٹ):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setRatio('square')}
                  className={`py-2 px-3 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                    ratio === 'square' ? 'border-gold-400 bg-gold-500/20 text-gold-300' : 'border-white/10 bg-black/40 text-gray-400'
                  }`}
                >
                  مربع 1:1 (پوسٹ)
                </button>
                <button
                  onClick={() => setRatio('story')}
                  className={`py-2 px-3 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                    ratio === 'story' ? 'border-gold-400 bg-gold-500/20 text-gold-300' : 'border-white/10 bg-black/40 text-gray-400'
                  }`}
                >
                  عمودی 9:16 (اسٹیٹس)
                </button>
              </div>
            </div>

            {/* Download CTA */}
            <button
              onClick={handleDownload}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold font-naskh text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/25"
            >
              {downloading ? <Check className="w-4 h-4 text-slate-950" /> : <Download className="w-4 h-4" />}
              <span>{downloading ? 'ڈاؤنلوڈ مکمل ہوا!' : 'تصویری کارڈ ڈاؤنلوڈ کریں'}</span>
            </button>
          </div>

          {/* Canvas Preview Column (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="relative max-w-full max-h-[460px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/40 flex items-center justify-center bg-black/50">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[440px] w-auto h-auto object-contain rounded-xl"
              />
            </div>
            <span className="text-xs text-gray-400 font-naskh mt-3">
              یہ کارڈ ہائی ریزولوشن پی این جی فارمیٹ میں واٹس ایپ اسٹیٹس اور فیس بک شیئر کے لیے تیار ہے۔
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
