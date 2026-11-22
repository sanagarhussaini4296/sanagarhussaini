import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, FileText, LogOut } from 'lucide-react';
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
import ArticleSubmitModal from './components/ArticleSubmitModal';
import AdminLoginModal from './components/AdminLoginModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import PoetryCardGenerator from './components/PoetryCardGenerator';

// Data
import { POETRY_DATABASE, OCCASIONS_LIST_1, OCCASIONS_LIST_2 } from './data/poetryData';
import { ARTICLES_DATABASE } from './data/articlesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('theme-emerald');
  const [fontMode, setFontMode] = useState('font-jameel');

  // Admin auth state (hidden from public, stored per browser session)
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem('sanagar_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Poetry state
  const [poetryList, setPoetryList] = useState(() => {
    try {
      const saved = localStorage.getItem('sanagar_poetry_list_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return POETRY_DATABASE;
  });

  // Articles state
  const [articlesList, setArticlesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sanagar_articles_list_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ARTICLES_DATABASE;
  });

  // Dynamic Occasions state (Admin can add/delete occasions, persists in browser)
  const [occasionsList1, setOccasionsList1] = useState(() => {
    try {
      const saved = localStorage.getItem('sanagar_occasions_list_1_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return OCCASIONS_LIST_1;
  });

  const [occasionsList2, setOccasionsList2] = useState(() => {
    try {
      const saved = localStorage.getItem('sanagar_occasions_list_2_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return OCCASIONS_LIST_2;
  });

  const [favorites, setFavorites] = useState([]);

  // Modals state
  const [mimbarKalam, setMimbarKalam] = useState(null);
  const [cardGeneratorKalam, setCardGeneratorKalam] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Admin CRUD modals state
  const [submitOpen, setSubmitOpen] = useState(false);
  const [editingKalam, setEditingKalam] = useState(null);
  const [articleSubmitOpen, setArticleSubmitOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Copy / status toast
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg, duration = 2800) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), duration);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('paigham_favs');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sanagar_poetry_list_v2', JSON.stringify(poetryList));
    } catch (e) {}
  }, [poetryList]);

  useEffect(() => {
    try {
      localStorage.setItem('sanagar_articles_list_v1', JSON.stringify(articlesList));
    } catch (e) {}
  }, [articlesList]);

  useEffect(() => {
    try {
      localStorage.setItem('sanagar_occasions_list_1_v4', JSON.stringify(occasionsList1));
    } catch (e) {}
  }, [occasionsList1]);

  useEffect(() => {
    try {
      localStorage.setItem('sanagar_occasions_list_2_v4', JSON.stringify(occasionsList2));
    } catch (e) {}
  }, [occasionsList2]);

  // Occasions Admin handlers
  const handleAddOccasion = (genre, newOccasion) => {
    const trimmed = newOccasion.trim();
    if (!trimmed) return;
    if (genre === 'نوحہ' || genre === 'سلام' || genre === 'مرثیہ') {
      setOccasionsList2(prev => prev.includes(trimmed) ? prev : [trimmed, ...prev]);
    } else {
      setOccasionsList1(prev => prev.includes(trimmed) ? prev : [trimmed, ...prev]);
    }
    showToast(`مناسبت "${trimmed}" فہرست میں شامل کر دی گئی!`);
  };

  const handleDeleteOccasion = (genre, occasionToDelete) => {
    if (!occasionToDelete) return;
    if (genre === 'نوحہ' || genre === 'سلام' || genre === 'مرثیہ') {
      setOccasionsList2(prev => prev.filter(item => item !== occasionToDelete));
    } else {
      setOccasionsList1(prev => prev.filter(item => item !== occasionToDelete));
    }
    showToast(`مناسبت "${occasionToDelete}" فہرست سے حذف کر دی گئی۔`);
  };

  // Global keyboard shortcuts: Ctrl+K (Search), Ctrl+Shift+A (Hidden Admin Login)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (!isAdmin) {
          setLoginModalOpen(true);
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // Gate all admin write actions behind login authority
  const requireAdmin = (actionFn) => {
    if (isAdmin) {
      actionFn();
    } else {
      setPendingAction(() => actionFn);
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    try {
      sessionStorage.setItem('sanagar_admin_auth', 'true');
    } catch (e) {}
    setLoginModalOpen(false);
    showToast('ایڈمن لاگ ان کامیاب! اب آپ مواد شامل، ترمیم اور حذف کر سکتے ہیں۔');
    if (pendingAction) {
      const actionToRun = pendingAction;
      setPendingAction(null);
      actionToRun();
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setPendingAction(null);
    setSubmitOpen(false);
    setArticleSubmitOpen(false);
    setDeleteTarget(null);
    try {
      sessionStorage.removeItem('sanagar_admin_auth');
    } catch (e) {}
    showToast('آپ ایڈمن اکاؤنٹ سے لاگ آؤٹ ہو چکے ہیں۔');
  };

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
    const formattedText = `*${kalam.titleUrdu}*\nصنف: ${kalam.genre} | مناسبت: ${kalam.occasion}\nصدائے ترنم: ${kalam.reciter || 'نامعلوم'}\n\n${kalam.fullKalam}\n\n— باضابطہ پورٹل: ثناگر حسینی`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedText);
    }
    setCopiedId(kalam.id);
    showToast('کلام کامیابی سے کاپی ہو گیا ہے!', 2500);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleTriggerDownload = (book) => {
    showToast(`کتاب "${book.titleUrdu}" کا ڈاؤنلوڈ شروع ہو گیا...`, 3000);
  };

  // Poetry CRUD (Admin only)
  const handleOpenAddKalam = () => requireAdmin(() => {
    setEditingKalam(null);
    setSubmitOpen(true);
  });

  const handleOpenEditKalam = (kalam) => requireAdmin(() => {
    setEditingKalam(kalam);
    setSubmitOpen(true);
  });

  const handleRequestDeleteKalam = (kalam) => requireAdmin(() => {
    setDeleteTarget({ type: 'kalam', item: kalam });
  });

  const handleSaveKalam = (savedKalam, isEditMode) => {
    if (!isAdmin) return;
    if (isEditMode) {
      setPoetryList(prev => prev.map(item => item.id === savedKalam.id ? savedKalam : item));
      showToast('کلام کامیابی سے اپڈیٹ کر دیا گیا!');
    } else {
      setPoetryList(prev => [savedKalam, ...prev]);
      showToast('نیا کلام کامیابی سے شامل کر دیا گیا اور تازہ ترین کلام میں آ گیا!');
    }
  };

  // Articles CRUD (Admin only)
  const handleOpenAddArticle = () => requireAdmin(() => {
    setEditingArticle(null);
    setArticleSubmitOpen(true);
  });

  const handleOpenEditArticle = (article) => requireAdmin(() => {
    setEditingArticle(article);
    setArticleSubmitOpen(true);
  });

  const handleRequestDeleteArticle = (article) => requireAdmin(() => {
    setDeleteTarget({ type: 'article', item: article });
  });

  const handleSaveArticle = (savedArticle, isEditMode) => {
    if (!isAdmin) return;
    if (isEditMode) {
      setArticlesList(prev => prev.map(item => item.id === savedArticle.id ? savedArticle : item));
      if (selectedArticle?.id === savedArticle.id) {
        setSelectedArticle(savedArticle);
      }
      showToast('مقالہ کامیابی سے اپڈیٹ کر دیا گیا!');
    } else {
      setArticlesList(prev => [savedArticle, ...prev]);
      showToast('نیا مقالہ کامیابی سے شائع کر دیا گیا!');
    }
  };

  // Delete confirmation handler
  const handleConfirmDelete = () => {
    if (!isAdmin || !deleteTarget) return;
    if (deleteTarget.type === 'kalam') {
      setPoetryList(prev => prev.filter(item => item.id !== deleteTarget.item.id));
      if (mimbarKalam?.id === deleteTarget.item.id) setMimbarKalam(null);
      showToast('کلام کامیابی سے حذف کر دیا گیا۔');
    } else if (deleteTarget.type === 'article') {
      setArticlesList(prev => prev.filter(item => item.id !== deleteTarget.item.id));
      if (selectedArticle?.id === deleteTarget.item.id) setSelectedArticle(null);
      showToast('مقالہ کامیابی سے حذف کر دیا گیا۔');
    }
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gold-500 text-slate-950 font-naskh font-bold text-sm shadow-2xl border-2 border-gold-300 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Floating Admin Bar (Visible ONLY when authenticated as admin) */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#04150f]/95 backdrop-blur-xl border-2 border-gold-500/60 shadow-2xl">
          <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-naskh font-bold pl-2 border-l border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ایڈمن پینل (sanagar)</span>
          </div>
          <button
            onClick={handleOpenAddKalam}
            className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-naskh font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>نیا کلام</span>
          </button>
          <button
            onClick={handleOpenAddArticle}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-500/40 text-xs font-naskh font-bold flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>نیا مقالہ</span>
          </button>
          <button
            onClick={handleAdminLogout}
            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/35 text-red-200 border border-red-500/40 text-xs font-naskh font-bold flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>لاگ آؤٹ</span>
          </button>
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
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        onOpenAddKalam={handleOpenAddKalam}
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
              isAdmin={isAdmin}
              onEditKalam={handleOpenEditKalam}
              onDeleteKalam={handleRequestDeleteKalam}
            />

            {/* Quick Articles Preview on Home */}
            <ArticlesSection
              articlesList={articlesList}
              onOpenArticle={(article) => setSelectedArticle(article)}
              isAdmin={isAdmin}
              onOpenAddArticle={handleOpenAddArticle}
              onEditArticle={handleOpenEditArticle}
              onDeleteArticle={handleRequestDeleteArticle}
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
            occasionsList1={occasionsList1}
            occasionsList2={occasionsList2}
            onSelectKalam={(kalam) => setMimbarKalam(kalam)}
            onOpenMimbar={(kalam) => setMimbarKalam(kalam)}
            onOpenCardGenerator={(kalam) => setCardGeneratorKalam(kalam)}
            onCopyKalam={handleCopyKalam}
            copiedId={copiedId}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            fontMode={fontMode}
            isAdmin={isAdmin}
            onOpenAddKalam={handleOpenAddKalam}
            onEditKalam={handleOpenEditKalam}
            onDeleteKalam={handleRequestDeleteKalam}
          />
        )}

        {activeTab === 'articles' && (
          <ArticlesSection
            articlesList={articlesList}
            onOpenArticle={(article) => setSelectedArticle(article)}
            isAdmin={isAdmin}
            onOpenAddArticle={handleOpenAddArticle}
            onEditArticle={handleOpenEditArticle}
            onDeleteArticle={handleRequestDeleteArticle}
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
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        onOpenAddKalam={handleOpenAddKalam}
        onOpenAddArticle={handleOpenAddArticle}
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
        articlesList={articlesList}
        onSelectKalam={(kalam) => setMimbarKalam(kalam)}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onSelectBook={() => setActiveTab('library')}
      />

      {/* Protected Admin Modals */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          setPendingAction(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <SubmitModal
        isOpen={submitOpen}
        onClose={() => {
          setSubmitOpen(false);
          setEditingKalam(null);
        }}
        kalamToEdit={editingKalam}
        onSaveKalam={handleSaveKalam}
        occasionsList1={occasionsList1}
        occasionsList2={occasionsList2}
        onAddOccasion={handleAddOccasion}
        onDeleteOccasion={handleDeleteOccasion}
      />

      <ArticleSubmitModal
        isOpen={articleSubmitOpen}
        onClose={() => {
          setArticleSubmitOpen(false);
          setEditingArticle(null);
        }}
        articleToEdit={editingArticle}
        onSaveArticle={handleSaveArticle}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        title={deleteTarget?.item?.titleUrdu || ''}
        itemType={deleteTarget?.type}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
