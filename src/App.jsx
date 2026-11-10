import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PoetrySection from './components/PoetrySection';
import ArticlesSection from './components/ArticlesSection';
import LibrarySection from './components/LibrarySection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

// Modals
import MimbarModal from './components/MimbarModal';
import ArticleModal from './components/ArticleModal';
import SearchModal from './components/SearchModal';
import SubmitModal from './components/SubmitModal';
import PoetryCardGenerator from './components/PoetryCardGenerator';

// Data
import { POETRY_DATABASE } from './data/poetryData';
import { ARTICLES_DATABASE } from './data/articlesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  // Default to Royal Emerald theme
  const [theme, setTheme] = useState('theme-emerald');
  // Default font: Jameel Noori Nastaleeq (with auto MB Lateefi for Sindhi)
  const [fontMode, setFontMode] = useState('font-jameel');

  // Load custom added poetry or fallback to default
  const [poetryList, setPoetryList] = useState(() => {
    try {
      const saved = localStorage.getItem('paigham_poetry_list');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return POETRY_DATABASE;
  });

  const [favorites, setFavorites] = useState([]);

  // Modals state
  const [mimbarKalam, setMimbarKalam] = useState(null);
  const [cardGeneratorKalam, setCardGeneratorKalam] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  // Copy toast state
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Update theme class on HTML element
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('paigham_favs');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Save poetryList to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('paigham_poetry_list', JSON.stringify(poetryList));
    } catch (e) {}
  }, [poetryList]);

  // Global keyboard shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('paigham_favs', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleCopyKalam = (kalam) => {
    const formattedText = `*${kalam.titleUrdu}*\nصنف: ${kalam.genre} | مناسبت: ${kalam.occasion}\nصدائے ترنم: ${kalam.reciter || 'نامعلوم'}\n\n${kalam.fullKalam}\n\n— باضابطہ پورٹل: پیغامِ ہدایت`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedText);
    }
    setCopiedId(kalam.id);
    setToastMessage('کلام کامیابی سے کاپی ہو گیا ہے!');
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage('');
    }, 2500);
  };

  const handleTriggerDownload = (book) => {
    setToastMessage(`کتاب "${book.titleUrdu}" کا ڈاؤنلوڈ شروع ہو گیا...`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddNewKalam = (newKalam) => {
    // Add to top of list so it immediately appears in the latest showcase!
    setPoetryList([newKalam, ...poetryList]);
    setToastMessage('نیا کلام کامیابی سے شامل کر دیا گیا اور تازہ ترین کلام میں آ گیا!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gold-500 text-slate-950 font-naskh font-bold text-sm shadow-2xl border-2 border-gold-300 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        fontMode={fontMode}
        setFontMode={setFontMode}
        openSearchModal={() => setSearchOpen(true)}
        openMimbarShortcut={() => setMimbarKalam(poetryList[0])}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onSelectKalam={(kalam) => setMimbarKalam(kalam)}
              onOpenMimbar={(kalam) => setMimbarKalam(kalam)}
              onOpenCardGenerator={(kalam) => setCardGeneratorKalam(kalam)}
              onCopyKalam={handleCopyKalam}
              copiedId={copiedId}
              setActiveTab={setActiveTab}
              latestPoetry={poetryList.slice(0, 4)}
              fontMode={fontMode}
            />

            {/* Quick Articles Preview on Home */}
            <ArticlesSection
              onOpenArticle={(article) => setSelectedArticle(article)}
            />

            {/* Quick Library Preview on Home */}
            <LibrarySection
              onTriggerDownload={handleTriggerDownload}
            />
          </>
        )}

        {activeTab === 'poetry' && (
          <PoetrySection
            poetryList={poetryList}
            onSelectKalam={(kalam) => setMimbarKalam(kalam)}
            onOpenMimbar={(kalam) => setMimbarKalam(kalam)}
            onOpenCardGenerator={(kalam) => setCardGeneratorKalam(kalam)}
            onCopyKalam={handleCopyKalam}
            copiedId={copiedId}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            fontMode={fontMode}
          />
        )}

        {activeTab === 'articles' && (
          <ArticlesSection
            onOpenArticle={(article) => setSelectedArticle(article)}
          />
        )}

        {activeTab === 'library' && (
          <LibrarySection
            onTriggerDownload={handleTriggerDownload}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setSubmitOpen(true)}
      />

      {/* Modals */}
      {mimbarKalam && (
        <MimbarModal
          kalam={mimbarKalam}
          onClose={() => setMimbarKalam(null)}
          onCopyKalam={handleCopyKalam}
          copiedId={copiedId}
        />
      )}

      {cardGeneratorKalam && (
        <PoetryCardGenerator
          kalam={cardGeneratorKalam}
          onClose={() => setCardGeneratorKalam(null)}
        />
      )}

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        poetryList={poetryList}
        onSelectKalam={(kalam) => setMimbarKalam(kalam)}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onSelectBook={() => setActiveTab('library')}
      />

      <SubmitModal
        isOpen={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onAddKalam={handleAddNewKalam}
      />

    </div>
  );
}
