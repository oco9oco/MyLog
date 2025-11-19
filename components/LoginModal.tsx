import React, { useState } from 'react';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (status: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded check for demonstration. 
    // In a real app, you might use Supabase Auth or GitHub Auth.
    // The prompt asked for "no complex process", just a button I can click.
    // Password is: "admin"
    if (password === 'admin') {
      onLogin(true);
      onClose();
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl border border-slate-100">
        <h3 className="text-2xl font-serif text-center mb-6 text-slate-900">Owner Access</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter access code"
              className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-slate-800 transition-colors`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-xs text-red-500 mt-2 ml-1">Incorrect access code.</p>}
          </div>
          <Button type="submit" className="w-full">
            Unlock
          </Button>
          <p className="text-xs text-center text-slate-400 mt-4">
            Default code: <strong>admin</strong>
          </p>
        </form>
      </div>
    </div>
  );
};