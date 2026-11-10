import React, { useState } from 'react';
import { 
  Sparkles, 
  Feather, 
  FileText, 
  User, 
  Library, 
  Mic2, 
  Search, 
  Palette, 
  Type,
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  theme, 
  setTheme, 
  fontMode,
  setFontMode,
  openSearchModal,
  openMimbarShortcut 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  // Removed "media" (ویڈیو و ترنم) as requested: All poems connect directly to YouTube
  const navItems = [
    { id: 'home', label: 'صفحہ اول', labelEn: 'Home', icon: Sparkles },
    { id: 'poetry', label: 'کلام و شاعری', labelEn: 'Kalam', icon: Feather },
    { id: 'articles', label: 'مضامین و مقالات', labelEn: 'Articles', icon: FileText },
    { id: 'library', label: 'کتب و مطالعہ گاہ', labelEn: 'Library', icon: Library },
    { id: 'about', label: 'تعارف و سوانح', labelEn: 'About', icon: User },
  ];

  const themes = [
    { id: 'theme-emerald', name: 'زمرد و طلا (شاہانہ)', badge: 'Emerald' },
    { id: 'theme-parchment', name: 'قرطاسِ ادب (کلاسک کتاب)', badge: 'Parchment' },
    { id: 'theme-obsidian', name: 'شبینہ و زرّیں (سیاہ)', badge: 'Obsidian' },
  ];

  const fonts = [
    { id: 'font-jameel', name: 'جمیل نوری نستعلیق (اردو)', desc: 'کلاسیکی خطِ نستعلیق' },
    { id: 'font-lateefi', name: 'ایم بی لطیفی (سنڌي)', desc: 'مستند سنڌي رسم الخط' },
    { id: 'font-amar', name: 'ایم بی امر فیاض', desc: 'ادبی سنڌي و اردو' },
    { id: 'font-naskh', name: 'خطِ نسخ (واضح مطالعہ)', desc: 'آسان مطالعہ' },
  ];

  const activeThemeName = themes.find(t => t.id === theme)?.name || 'تھیم';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg-main)]/95 border-b border-[var(--border-gold)] transition-colors duration-300 shadow-md">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-black/50 via-[var(--bg-surface)] to-black/50 border-b border-[var(--border-gold)]/30 py-2 px-4 text-xs text-center text-gold-300 font-naskh flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          باضابطہ ویب پورٹل برائے کلام، مقالات و علمی ذخیرہ — <strong className="text-white font-bold">پیغامِ ہدایت</strong>
        </span>
        <span className="hidden md:inline-block opacity-40">•</span>
        <button 
          onClick={openMimbarShortcut}
          className="hidden md:inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-200 underline underline-offset-4 transition-colors cursor-pointer font-bold"
        >
          <Mic2 className="w-3.5 h-3.5" />
          <span>منبر و اسٹیج ریڈنگ موڈ</span>
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo & Portal Identity: پیغامِ ہدایت ثناگر حسینی */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/30 via-gold-600/15 to-transparent border-2 border-gold-500/60 flex items-center justify-center shadow-xl shadow-gold-500/15 group-hover:scale-105 group-hover:border-gold-400 transition-all duration-300">
              <Feather className="w-8 h-8 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            
            <div className="flex flex-col">
              {/* Primary Title: پیغامِ ہدایت */}
              <div className="font-jameel text-4xl font-bold tracking-wide text-gold-300 leading-[1.5] group-hover:text-gold-200 transition-colors drop-shadow-md">
                پیغامِ ہدایت
              </div>
              
              {/* Sub-line: ثناگر حسینی */}
              <div className="flex items-center gap-2 -mt-1">
                <span className="font-jameel text-2xl font-bold text-white drop-shadow-sm">
                  ثناگر حسینی
                </span>
                <span className="text-[10px] font-sans text-gold-400/80 tracking-widest uppercase hidden sm:inline-block">
                  • Sanagar Hussaini
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links: Increased font size significantly as requested! */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'text-gold-300 bg-gold-500/20 border border-gold-500/40 shadow-sm font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/10 font-semibold'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gray-300'}`} />
                  {/* Significantly increased font size on navigation bar */}
                  <span className="font-naskh text-lg xl:text-xl tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-10 h-0.5 bg-gold-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Search, Font Switcher, Theme Palette, Mobile Menu */}
          <div className="flex items-center gap-2.5">
            
            {/* Global Search Button */}
            <button
              onClick={openSearchModal}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--border-gold)] text-gray-300 hover:text-gold-400 transition-all cursor-pointer flex items-center gap-2"
              title="تلاش کریں (Search)"
            >
              <Search className="w-4 h-4 text-gold-400" />
              <span className="hidden xl:inline-block text-xs font-naskh text-gray-300">
                تلاش...
              </span>
              <kbd className="hidden sm:inline-block text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-gold-400 font-mono">
                Ctrl+K
              </kbd>
            </button>

            {/* Font Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFontDropdownOpen(!fontDropdownOpen);
                  setThemeDropdownOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--border-gold)] text-gold-300 hover:text-gold-100 transition-all cursor-pointer flex items-center gap-1.5"
                title="فونٹ تبدیل کریں (Jameel Noori / MB Lateefi)"
              >
                <Type className="w-4 h-4 text-gold-400" />
                <span className="hidden xl:inline-block text-xs font-naskh">
                  {fontMode === 'font-jameel' ? 'جمیل نوری' : fontMode === 'font-lateefi' ? 'ایم بی لطیفی' : 'فونٹ'}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {fontDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl royal-card p-2 shadow-2xl z-50 border border-[var(--border-gold)] bg-[var(--bg-surface)]">
                  <div className="text-[11px] font-naskh text-gold-400/90 px-3 py-1.5 border-b border-white/10 mb-1 font-bold">
                    پسندیدہ خط / فونٹ منتخب فرمائیں:
                  </div>
                  {fonts.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFontMode(f.id);
                        setFontDropdownOpen(false);
                      }}
                      className={`w-full text-right px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        fontMode === f.id 
                          ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/30' 
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <div className={`text-base leading-tight ${f.id}`}>
                          {f.name}
                        </div>
                        <div className="text-[10px] text-gray-400 font-naskh">{f.desc}</div>
                      </div>
                      {fontMode === f.id && <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setFontDropdownOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--border-gold)] text-gold-400 hover:text-gold-200 transition-all cursor-pointer flex items-center gap-1.5"
                title="رنگ و تھیم تبدیل کریں"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden xl:inline-block text-xs font-naskh text-gray-300">
                  {activeThemeName.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {themeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl royal-card p-2 shadow-2xl z-50 border border-[var(--border-gold)] bg-[var(--bg-surface)]">
                  <div className="text-[11px] font-naskh text-gold-400/80 px-3 py-1.5 border-b border-white/10 mb-1">
                    پس منظر و تھیم منتخب کریں:
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs font-naskh transition-colors flex items-center justify-between cursor-pointer ${
                        theme === t.id 
                          ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/30' 
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{t.name}</span>
                      {theme === t.id && <span className="w-2 h-2 rounded-full bg-gold-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-[var(--border-gold)] text-gray-300 hover:text-gold-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-gold)] bg-[var(--bg-surface)] px-4 pt-4 pb-8 space-y-2.5 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/40 shadow-sm'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />
                  <span className="font-naskh text-xl font-bold">{item.label}</span>
                </div>
                <span className="text-xs text-gray-400 font-sans">{item.labelEn}</span>
              </button>
            );
          })}
          
          <div className="pt-3">
            <button
              onClick={() => {
                openMimbarShortcut();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-slate-950 font-bold font-naskh text-base shadow-xl shadow-gold-500/20 cursor-pointer"
            >
              <Mic2 className="w-5 h-5" />
              <span>اسٹیج / منبر ریڈنگ موڈ کھولیں</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
