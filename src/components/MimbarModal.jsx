import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Mic2, 
  Moon, 
  Sun,
  Type,
  Image as ImageIcon,
  Download,
  Sparkles,
  BookOpen,
  Share2,
  Maximize2
} from 'lucide-react';

export default function MimbarModal({ kalam, onClose, onCopyKalam, copiedId }) {
  // Interactive full-page image preview modal state
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageTheme, setImageTheme] = useState('emerald'); // emerald, obsidian, parchment
  const [isCopiedImage, setIsCopiedImage] = useState(false);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(false);

  // Reader state
  const [fontSize, setFontSize] = useState(32);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [modalDark, setModalDark] = useState(true);
  const [fontChoice, setFontChoice] = useState(
    kalam && (kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam') 
      ? 'font-lateefi' 
      : 'font-jameel'
  );

  const scrollContainerRef = useRef(null);
  const canvasRef = useRef(null);

  const rawStanzas = kalam ? kalam.fullKalam.split('\n\n').filter(s => s.trim()) : [];
  const stanzasList = rawStanzas.map(s => s.split('\n').map(l => l.trim()).filter(Boolean));
  const totalLines = stanzasList.reduce((acc, lines) => acc + lines.length, 0);
  const numStanzas = stanzasList.length;

  // Auto-scroll loop
  useEffect(() => {
    let scrollInterval = null;
    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed;
        }
      }, 50);
    } else {
      clearInterval(scrollInterval);
    }
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling, scrollSpeed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showImagePreview) {
          setShowImagePreview(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showImagePreview]);

  // Render Full-Poem Canvas: Centered, auto-adjusted to beautifully FILL the entire page
  const drawFullKalamCard = () => {
    const canvas = canvasRef.current;
    if (!canvas || !kalam) return;
    const ctx = canvas.getContext('2d');

    // High resolution A4 portrait proportions: 1200 x 1754
    const width = 1200;
    const height = 1754;

    canvas.width = width;
    canvas.height = height;

    // 1. Background Gradient
    if (imageTheme === 'emerald') {
      const grad = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, width);
      grad.addColorStop(0, '#0a3a2a');
      grad.addColorStop(1, '#02130d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (imageTheme === 'obsidian') {
      const grad = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, width);
      grad.addColorStop(0, '#151f33');
      grad.addColorStop(1, '#060a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Parchment
      ctx.fillStyle = '#fbf8f0';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Outer Royal Borders & Corners
    const isParchment = imageTheme === 'parchment';
    ctx.strokeStyle = isParchment ? '#926317' : '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(44, 44, width - 88, height - 88);

    ctx.strokeStyle = isParchment ? 'rgba(146, 99, 23, 0.35)' : 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(58, 58, width - 116, height - 116);

    const corners = [
      [68, 68],
      [width - 68, 68],
      [68, height - 68],
      [width - 68, height - 68]
    ];
    ctx.fillStyle = isParchment ? '#b8861b' : '#d4af37';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Top Header: Occasion, Title & Reciter Info
    ctx.textAlign = 'center';
    ctx.font = '26px "Noto Naskh Arabic", "MB Lateefi", sans-serif';
    ctx.fillStyle = isParchment ? '#926317' : '#d4af37';
    ctx.fillText(`••• ${kalam.genre} • ${kalam.occasion} •••`, width / 2, 125);

    // Kalam Title (Large bold calligraphy)
    const isSindhi = kalam.language === 'Sindhi' || kalam.genreSlug === 'sindhi-kalam';
    ctx.font = isSindhi 
      ? 'bold 58px "MB Lateefi", "MB Amar Fayyaz", serif'
      : 'bold 62px "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif';
    ctx.fillStyle = isParchment ? '#1c1917' : '#fef9e7';
    ctx.fillText(kalam.titleUrdu, width / 2, 205);

    // Reciter / Info
    ctx.font = '24px "Noto Naskh Arabic", sans-serif';
    ctx.fillStyle = isParchment ? '#57534e' : '#cbd5e1';
    ctx.fillText(`نوحہ خواں / ذاکر: ${kalam.reciter}  •  سال: ${kalam.year}`, width / 2, 260);

    // Header divider
    ctx.fillStyle = isParchment ? '#926317' : '#d4af37';
    ctx.fillText('✦ ✦ ✦', width / 2, 305);

    // 4. RENDER ALL VERSES: Centered, auto-adjusted to beautifully FILL the entire page
    const poemFont = isSindhi 
      ? '"MB Lateefi", "MB Amar Fayyaz", serif'
      : '"Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif';

    // Vertical bounding space available between header and footer
    const headerBottom = 340;
    const footerTop = 1530;
    const availableHeight = footerTop - headerBottom; // ~1190px

    // Dynamic formula: verses + gaps evenly fill the availableHeight
    const lineUnits = totalLines + ((numStanzas - 1) * 0.75);
    const lineHeight = Math.min(125, Math.max(54, Math.floor(availableHeight / lineUnits)));
    const fontSize = Math.min(54, Math.max(32, Math.floor(lineHeight * 0.52)));
    const stanzaGap = Math.floor(lineHeight * 0.75);

    const actualHeight = (totalLines * lineHeight) + ((numStanzas - 1) * stanzaGap);
    let currentY = headerBottom + Math.max(15, Math.floor((availableHeight - actualHeight) / 2)) + Math.floor(lineHeight * 0.75);

    ctx.font = `bold ${fontSize}px ${poemFont}`;
    ctx.textAlign = 'center';

    // Text shadow for crisp legibility
    ctx.shadowColor = isParchment ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = isParchment ? 0 : 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    stanzasList.forEach((lines, sIdx) => {
      ctx.fillStyle = isParchment ? '#1c1917' : '#ffffff';
      ctx.font = `bold ${fontSize}px ${poemFont}`;

      lines.forEach(line => {
        ctx.fillText(line, width / 2, currentY);
        currentY += lineHeight;
      });

      if (sIdx < numStanzas - 1) {
        // Subtle ornamental divider between stanzas
        const flourishY = currentY - Math.floor(lineHeight * 0.25) + Math.floor(stanzaGap * 0.35);
        ctx.font = '22px "Noto Naskh Arabic", sans-serif';
        ctx.fillStyle = isParchment ? '#b8861b' : '#d4af37';
        ctx.fillText('✦', width / 2, flourishY);
        
        currentY += stanzaGap;
      }
    });

    ctx.shadowBlur = 0; // Reset shadow

    // 5. Bottom Identity & Attribution: ثناگر حسینی
    const footerY = height - 170;
    ctx.font = '22px "Noto Naskh Arabic", sans-serif';
    ctx.fillStyle = isParchment ? '#926317' : '#d4af37';
    ctx.fillText('✦ ✦ ✦', width / 2, footerY);

    ctx.font = 'bold 56px "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif';
    ctx.fillStyle = isParchment ? '#78350f' : '#f5deb3';
    ctx.fillText('ثناگر حسینی', width / 2, footerY + 65);

    ctx.font = '22px "Noto Naskh Arabic", sans-serif';
    ctx.fillStyle = isParchment ? '#78716c' : '#9ca3af';
    ctx.fillText('باضابطہ ویب پورٹل: sanagar.netlify.app', width / 2, footerY + 105);
  };

  useEffect(() => {
    if (showImagePreview && kalam) {
      document.fonts.ready.then(() => {
        drawFullKalamCard();
      });
    }
  }, [showImagePreview, imageTheme, kalam]);

  // Handle Download Image (PNG)
  const handleDownloadImage = () => {
    setDownloadingImg(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `sanagar-hussaini-${kalam.id || 'kalam'}-complete-page.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
    setTimeout(() => setDownloadingImg(false), 1500);
  };

  // Handle Copy Image to Clipboard
  const handleCopyImageToClipboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob((blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': blob })
          ]).then(() => {
            setIsCopiedImage(true);
            setTimeout(() => setIsCopiedImage(false), 2500);
          }).catch(() => {
            handleDownloadImage();
          });
        } else {
          handleDownloadImage();
        }
      });
    } catch (e) {
      handleDownloadImage();
    }
  };

  if (!kalam) return null;
  const isCopied = copiedId === kalam.id;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#04140e] text-white overflow-hidden">
      
      {/* =========================================================================
          TOP ACTION & CONTROL BAR (Clean, no overlapping masks)
          ========================================================================= */}
      <div className={`px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b shadow-xl z-20 ${
        modalDark ? 'bg-[#061e15] border-gold-500/30 text-white' : 'bg-amber-50 border-amber-300 text-slate-900'
      }`}>
        
        {/* Left: Title & Mode Identity */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30 shrink-0">
            <Mic2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jameel text-2xl font-bold leading-tight text-gold-300">
              مکمل کلام ریڈنگ موڈ
            </h3>
            <span className="text-xs text-gray-300 font-naskh">
              {kalam.genre} • {kalam.occasion} • پورٹل: <strong className="text-white">ثناگر حسینی</strong>
            </span>
          </div>
        </div>

        {/* Center Actions: Open in Image (Prominent), Font Selector, Zoom, Auto-Scroll, Theme, Copy */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* OPEN IN IMAGE BUTTON (Primary Action) */}
          <button
            onClick={() => setShowImagePreview(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-naskh font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30 hover:scale-105 transition-all border border-purple-400/40"
            title="مکمل کلام کو خوبصورت ایک صفحے کے تصویری کارڈ میں کھولیں اور ڈاؤنلوڈ کریں"
          >
            <ImageIcon className="w-4 h-4 text-purple-200" />
            <span>تصویر میں کھولیں</span>
          </button>

          {/* Font Selector */}
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-gold-500/20 text-xs font-naskh">
            <button
              onClick={() => setFontChoice('font-jameel')}
              className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                fontChoice === 'font-jameel' ? 'bg-gold-500 text-slate-950 font-bold' : 'text-gray-300'
              }`}
            >
              جمیل نوری
            </button>
            <button
              onClick={() => setFontChoice('font-lateefi')}
              className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                fontChoice === 'font-lateefi' ? 'bg-gold-500 text-slate-950 font-bold' : 'text-gray-300'
              }`}
            >
              ایم بی لطیفی
            </button>
          </div>

          {/* Font Zoom Controls */}
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-gold-500/20">
            <button
              onClick={() => setFontSize(prev => Math.max(prev - 2, 18))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              title="فونٹ چھوٹا کریں"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-gold-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(prev + 3, 56))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              title="فونٹ بڑا کریں"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFontSize(32)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              title="عمومی سائز"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`px-3 py-1.5 rounded-xl text-xs font-naskh flex items-center gap-1.5 cursor-pointer border transition-all ${
              isAutoScrolling 
                ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
            }`}
            title="خودکار اسکرولنگ"
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoScrolling ? 'اسکرول جاری' : 'آٹو اسکرول'}</span>
          </button>

          {/* Theme Toggle within Reader */}
          <button
            onClick={() => setModalDark(!modalDark)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gold-400 cursor-pointer"
            title={modalDark ? "روشن پس منظر" : "تاریک پس منظر"}
          >
            {modalDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>

          {/* Copy Button */}
          <button
            onClick={() => onCopyKalam(kalam)}
            className="px-3.5 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-xs font-naskh font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'کاپی ہو گیا' : 'کاپی'}</span>
          </button>
        </div>

        {/* Right: Close button */}
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 cursor-pointer transition-colors"
          title="بند کریں (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* =========================================================================
          MAIN READING SCREEN (Clean, Crystal Clear, No Overlapping Masks)
          ========================================================================= */}
      <div 
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-4 sm:px-12 py-10 transition-colors duration-300 ${
          modalDark ? 'bg-[#04140e] text-[#faf7f0]' : 'bg-[#fcfaf5] text-[#1c1917]'
        }`}
      >
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10 pb-6 border-b border-gold-500/25">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-naskh mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>دیوانِ ثناگر حسینی • {kalam.genre} • {kalam.occasion}</span>
            </div>
            <h1 className={`${fontChoice} text-4xl sm:text-5xl font-bold leading-[2.4] text-gold-200`}>
              {kalam.titleUrdu}
            </h1>
            <p className="font-naskh text-sm text-gray-300 mt-2">
              نوحہ خواں / ذاکر: <strong className="text-white font-medium">{kalam.reciter}</strong> • سال: {kalam.year}
            </p>
          </div>

          {/* Verses Container - Clear, Bright, Beautiful Typography */}
          <div 
            style={{ fontSize: `${fontSize}px` }}
            className={`${fontChoice} leading-[2.7] space-y-8 select-text text-center`}
          >
            {rawStanzas.map((stanza, index) => (
              <div 
                key={index}
                className={`py-6 px-8 rounded-2xl transition-all shadow-md ${
                  modalDark 
                    ? 'bg-black/35 border border-gold-500/20 hover:border-gold-500/40 text-white' 
                    : 'bg-amber-100/50 border border-amber-800/15 text-slate-900'
                }`}
              >
                <p className="whitespace-pre-line tracking-wide drop-shadow-sm font-bold">
                  {stanza}
                </p>
                {index < rawStanzas.length - 1 && (
                  <div className="w-16 h-0.5 bg-gold-500/30 mx-auto mt-6" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom Attribution */}
          <div className="mt-14 pt-6 border-t border-gold-500/20 text-center text-xs font-naskh text-gray-400">
            <p>پورٹل: ثناگر حسینی • جملہ حقوق محفوظ ہیں</p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          OPEN IN IMAGE PREVIEW MODAL (Full poem on 1 page high-res canvas)
          ========================================================================= */}
      {showImagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/90">
          <div className={`relative w-full ${enlargedImage ? 'max-w-6xl' : 'max-w-5xl'} max-h-[96vh] flex flex-col royal-card rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl transition-all`}>
            
            {/* Modal Top Bar */}
            <div className="px-6 py-3.5 border-b border-[var(--border-gold)] flex items-center justify-between bg-black/70">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold-400" />
                <h3 className="font-jameel text-2xl font-bold text-gold-200">
                  مکمل کلام تصویری کارڈ (ایک صفحہ پر سیٹ)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEnlargedImage(!enlargedImage)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white cursor-pointer"
                  title={enlargedImage ? "عمومی منظر" : "بڑی اسکرین پر دیکھیں"}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowImagePreview(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-red-500/30 text-gray-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Controls & Responsive Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Controls Column (4 cols) */}
              <div className="md:col-span-4 space-y-4">
                <div className="p-4 rounded-2xl bg-black/50 border border-gold-500/25">
                  <span className="text-xs font-naskh text-gold-300 block mb-1 font-bold">
                    کلام کا عنوان:
                  </span>
                  <p className="font-jameel text-2xl text-white font-bold leading-tight">{kalam.titleUrdu}</p>
                  <p className="text-xs font-naskh text-gray-400 mt-1">
                    صنف: {kalam.genre} • مناسبت: {kalam.occasion}
                  </p>
                  <p className="text-[11px] font-naskh text-emerald-400 mt-1 font-bold">
                    ✓ تمام اشعار صفحے پر خوبصورتی سے خودکار سیٹ ہیں
                  </p>
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="block text-xs font-naskh text-gold-300 mb-2 font-bold">
                    کارڈ کا تھیم و رنگ منتخب کریں:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setImageTheme('emerald')}
                      className={`py-2 px-2 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                        imageTheme === 'emerald' ? 'border-emerald-400 bg-[#06281e] text-emerald-300 shadow-md font-bold' : 'border-white/10 bg-black/40 text-gray-400'
                      }`}
                    >
                      زمردِ شاہانہ
                    </button>
                    <button
                      onClick={() => setImageTheme('obsidian')}
                      className={`py-2 px-2 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                        imageTheme === 'obsidian' ? 'border-gold-400 bg-[#0b0f19] text-gold-300 shadow-md font-bold' : 'border-white/10 bg-black/40 text-gray-400'
                      }`}
                    >
                      شاہانہ شبینہ
                    </button>
                    <button
                      onClick={() => setImageTheme('parchment')}
                      className={`py-2 px-2 rounded-xl text-xs font-naskh border text-center transition-all cursor-pointer ${
                        imageTheme === 'parchment' ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-md font-bold' : 'border-white/10 bg-black/40 text-gray-400'
                      }`}
                    >
                      قرطاسِ ادب
                    </button>
                  </div>
                </div>

                {/* Download CTA */}
                <button
                  onClick={handleDownloadImage}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-slate-950 font-bold font-naskh text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/25 hover:scale-105"
                >
                  {downloadingImg ? <Check className="w-4 h-4 text-slate-950" /> : <Download className="w-4 h-4" />}
                  <span>{downloadingImg ? 'ڈاؤنلوڈ جاری ہے...' : 'تصویر ڈاؤنلوڈ کریں (PNG)'}</span>
                </button>

                {/* Copy Image CTA */}
                <button
                  onClick={handleCopyImageToClipboard}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-naskh text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                >
                  {isCopiedImage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopiedImage ? 'تصویر کاپی ہو گئی!' : 'تصویر کلپ بورڈ میں کاپی کریں'}</span>
                </button>
              </div>

              {/* Canvas Preview Column (8 cols - Large, High Definition View) */}
              <div className="md:col-span-8 flex flex-col items-center justify-center">
                <div className="relative w-full h-[68vh] sm:h-[74vh] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/40 flex items-center justify-center bg-black/70 p-2 sm:p-3">
                  <canvas
                    ref={canvasRef}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                  />
                </div>
                <span className="text-xs text-gray-400 font-naskh mt-2.5 text-center">
                  یہ مکمل کلام کا سنگل پیج کارڈ ہے جو ہائی ریزولوشن A4 سائز میں واٹس ایپ اور فیس بک کے لیے موزوں ہے۔
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
