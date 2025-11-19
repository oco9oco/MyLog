import React from 'react';
import { Post } from '../types';

interface TimelineProps {
  posts: Post[];
}

export const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🍃</span>
        </div>
        <h3 className="text-lg font-serif text-slate-600">No thoughts yet.</h3>
        <p className="text-sm text-slate-400 mt-1">The canvas is blank.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto py-10 px-6">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 hidden sm:block" />

      <div className="space-y-12">
        {posts.map((post, index) => {
          const date = new Date(post.timestamp);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

          return (
            <div 
              key={post.id} 
              className="relative flex flex-col sm:flex-row gap-6 group opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Date Marker (Left Side) */}
              <div className="sm:w-24 flex-shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-start pt-1">
                 <div className="absolute left-8 sm:left-auto sm:right-[-5px] w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-slate-50 group-hover:bg-slate-500 transition-colors hidden sm:block"></div>
                 <span className="text-sm font-bold text-slate-900">{dateStr}</span>
                 <span className="text-xs text-slate-500 ml-2 sm:ml-0">{timeStr}</span>
              </div>

              {/* Content Card */}
              <div className="flex-grow">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="font-serif text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                  
                  {/* Gemini Enhanced Footer */}
                  {(post.mood || post.emoji) && (
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                       <span className="text-xl" role="img" aria-label="mood">{post.emoji}</span>
                       <span className="text-xs uppercase tracking-wider text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-full">
                         {post.mood}
                       </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};