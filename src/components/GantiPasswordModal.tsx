import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GantiPasswordModalProps {
  wajibGanti: boolean;
  onGantiPassword: (lama: string, baru: string) => void;
  onSuccessDone?: () => void;
}

export const GantiPasswordModal: React.FC<GantiPasswordModalProps> = ({
  wajibGanti,
  onGantiPassword,
  onSuccessDone,
}) => {
  const [sandiLama, setSandiLama] = useState('');
  const [sandiBaru, setSandiBaru] = useState('');
  const [sandiUlang, setSandiUlang] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!sandiLama) {
      setErrorMsg('Password lama harus diisi');
      return;
    }
    if (sandiBaru.length < 8) {
      setErrorMsg('Password baru minimal 8 karakter');
      return;
    }
    if (sandiBaru !== sandiUlang) {
      setErrorMsg('Ulangi password tidak sama');
      return;
    }

    try {
      onGantiPassword(sandiLama, sandiBaru);
      setSuccessMsg('Password berhasil diperbarui!');
      setSandiLama('');
      setSandiBaru('');
      setSandiUlang('');
      if (onSuccessDone) {
        setTimeout(onSuccessDone, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengganti password');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800">
          <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Ganti Password Akun
          </h2>
        </div>

        {wajibGanti && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              Demi keamanan, Anda wajib mengganti password sementara sebelum menggunakan portal sepenuhnya.
            </span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
              Password Lama
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={sandiLama}
              onChange={(e) => setSandiLama(e.target.value)}
              placeholder="Masukkan password saat ini"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
              Password Baru (Minimal 8 karakter)
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={sandiBaru}
              onChange={(e) => setSandiBaru(e.target.value)}
              placeholder="Kombinasi huruf dan angka"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
              Ulangi Password Baru
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={sandiUlang}
              onChange={(e) => setSandiUlang(e.target.value)}
              placeholder="Ketik ulang password baru"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 dark:text-emerald-300/80 hover:text-emerald-700 dark:hover:text-emerald-200 font-medium flex items-center gap-1.5"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.01]"
          >
            Simpan Password Baru
          </button>
        </form>
      </div>
    </div>
  );
};
