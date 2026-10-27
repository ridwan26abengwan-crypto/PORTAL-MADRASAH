import React, { useState } from 'react';
import { Lock, User as UserIcon, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

const LOGIN_BG = '/assets/aistudio/WhatsApp_Image_2026-10-24_at_23.47.39_d86b9d68.jpeg';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void> | void;
  onBackToHome: () => void;
  errorMessage?: string;
  isLoading?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onBackToHome,
  errorMessage,
  isLoading = false,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    onLogin(username.trim(), password);
  };

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat transition-all"
      style={{ backgroundImage: `url("${LOGIN_BG}")` }}
    >
      {/* Dark emerald atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/80 to-slate-950/75 backdrop-blur-[2px]" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border border-white/40 dark:border-emerald-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto flex items-center justify-center">
            <img 
              src={MADRASAH_LOGO} 
              alt="Logo MI Darussalam" 
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            PORTAL LOGIN MI DARUSSALAM
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-300 font-medium">
            Desa Pinangsari, Kec. Ciasem, Kab. Subang
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-emerald-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                autoComplete="username"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-200 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-emerald-400 hover:text-slate-600 dark:hover:text-emerald-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{isLoading ? 'Memproses...' : 'Masuk ke Portal'}</span>
          </button>
        </form>

        {/* Back button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-white font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Madrasah</span>
          </button>
        </div>
      </div>

      {/* Subtle school photo caption */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center pointer-events-none hidden sm:block">
        <p className="text-[11px] text-white/80 font-medium px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
          🏫 Suasana Madrasah Ibtidaiyah Darussalam Pinangsari, Ciasem, Subang
        </p>
      </div>
    </div>
  );
};
