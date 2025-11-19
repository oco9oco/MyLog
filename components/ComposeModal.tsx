import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { analyzeSentiment } from '../services/geminiService';
import { Post } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (post: Post) => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose, onPost }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);

    // Optional: Call Gemini API to get mood
    let moodData = null;
    if (process.env.API_KEY) {
        moodData = await analyzeSentiment(text);
    }

    const newPost: Post = {
      id: uuidv4(),
      content: text.trim(),
      timestamp: Date.now(),
      mood: moodData?.mood,
      emoji: moodData?.emoji,
    };

    onPost(newPost);
    setText('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif font-medium text-slate-900">New Thought</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <textarea
          autoFocus
          className="w-full h-40 p-4 bg-slate-50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-none font-serif text-lg leading-relaxed"
          placeholder="What's on your mind today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={isSubmitting} disabled={!text.trim()}>
            Post
          </Button>
        </div>
        
        {!process.env.API_KEY && (
           <p className="text-xs text-slate-400 mt-4 text-center">Gemini AI analysis disabled (No API Key)</p>
        )}
      </div>
    </div>
  );
};