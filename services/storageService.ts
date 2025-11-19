import { Post } from '../types';

const STORAGE_KEY = 'mindful_log_posts';
const AUTH_KEY = 'mindful_log_auth';

export const getPosts = (): Post[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load posts", e);
    return [];
  }
};

export const savePost = (post: Post): Post[] => {
  const current = getPosts();
  const updated = [post, ...current]; // Prepend to keep newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const checkAuth = (): boolean => {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
};

export const setAuth = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
};