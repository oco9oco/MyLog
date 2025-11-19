import React, { useState, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { ComposeModal } from './components/ComposeModal';
import { LoginModal } from './components/LoginModal';
import { Button } from './components/Button';
import { getPosts, savePost, checkAuth, setAuth } from './services/storageService';
import { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    setPosts(getPosts());
    setIsLoggedIn(checkAuth());
  }, []);

  const handleNewPost = (post: Post) => {
    const updatedPosts = savePost(post);
    setPosts(updatedPosts);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuth(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-50/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold tracking-tight text-slate-900">
            My<span className="text-slate-400">Log</span>
          </h1>
          
          <div>
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
              >
                Lock
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors opacity-0 hover:opacity-100"
                aria-label="Login"
              >
                <span className="block w-2 h-2 rounded-full bg-slate-300"></span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 min-h-screen">
        <Timeline posts={posts} />
      </main>

      {/* Floating Action Button (Only if logged in) */}
      {isLoggedIn && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setIsComposeOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            aria-label="Add Post"
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Modals */}
      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
        onPost={handleNewPost} 
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLoginSuccess} 
      />
    </div>
  );
}

export default App;