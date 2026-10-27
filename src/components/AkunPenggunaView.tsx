import React, { useState } from 'react';
import { User, GTK, Role } from '../types';
import { 
  Key, 
  UserPlus, 
  Shield, 
  UserCheck, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Lock,
  X
} from 'lucide-react';

interface AkunPenggunaViewProps {
  usersList: User[];
  gtkList: GTK[];
  currentUserId: number;
  onAddUser: (data: { username: string; password: string; role: Role; gtk_id?: number | null; nama?: string }) => void;
  onResetPassword: (id: number, newPass: string) => void;
  onToggleActive: (id: number, active: boolean) => void;
}

export const AkunPenggunaView: React.FC<AkunPenggunaViewProps> = ({
  usersList,
  gtkList,
  currentUserId,
  onAddUser,
  onResetPassword,
  onToggleActive,
}) => {
  // New user form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('guru');
  const [selectedGtkId, setSelectedGtkId] = useState<string>('');
  const [formError, setFormError] = useState('');

  // Reset password modal state
  const [resetModalUserId, setResetModalUserId] = useState<number | null>(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [resetError, setResetError] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!username.trim()) {
      setFormError('Username wajib diisi');
      return;
    }
    if (!/^[a-z0-9._-]{3,50}$/.test(username.trim().toLowerCase())) {
      setFormError('Username 3–50 karakter: huruf kecil, angka, titik, strip, garis bawah');
      return;
    }
    if (password.length < 8) {
      setFormError('Password minimal 8 karakter');
      return;
    }

    try {
      onAddUser({
        username: username.trim().toLowerCase(),
        password,
        role,
        gtk_id: selectedGtkId ? Number(selectedGtkId) : null
      });

      // Clear form
      setUsername('');
      setPassword('');
      setSelectedGtkId('');
      setRole('guru');
    } catch (err: any) {
      setFormError(err.message || 'Gagal membuat akun');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUserId) return;
    if (newResetPassword.length < 8) {
      setResetError('Password baru minimal 8 karakter');
      return;
    }

    onResetPassword(resetModalUserId, newResetPassword);
    setResetModalUserId(null);
    setNewResetPassword('');
    setResetError('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Create User Form */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800/60">
          <UserPlus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Buat Akun Pengguna Baru
          </h3>
        </div>

        {formError && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Username *
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="misal: ahmad.fauzi"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Password Awal *
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Peran (Role)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="guru">Guru Madrasah</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Hubungkan Data GTK
              </label>
              <select
                value={selectedGtkId}
                onChange={(e) => setSelectedGtkId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">— Tidak dihubungkan —</option>
                {gtkList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nama} ({g.jabatan})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-slate-500 dark:text-emerald-300/80">
              * Pengguna baru wajib mengganti password saat pertama kali login.
            </p>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
            >
              + Buat Akun Sekarang
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-emerald-100 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Daftar Akun Pengguna Portal
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
            Total {usersList.length} Akun
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold uppercase tracking-wider text-[11px] border-b border-emerald-100 dark:border-emerald-800">
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Nama Tampilan</th>
                <th className="py-3.5 px-4">Peran</th>
                <th className="py-3.5 px-4">Tautan GTK</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-800/60 text-slate-700 dark:text-emerald-100">
              {usersList.map((u) => {
                const isSelf = u.id === currentUserId;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {u.username}
                      {isSelf && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-sans">
                          (Anda)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-emerald-100">
                      {u.nama}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {u.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                        <span className="capitalize">{u.role}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-emerald-300">
                      {u.gtk_nama || <span className="text-slate-400">-</span>}
                    </td>
                    <td className="py-3 px-4">
                      {u.aktif ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold text-[11px]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Nonaktif</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => {
                            setResetModalUserId(u.id);
                            setNewResetPassword('');
                            setResetError('');
                          }}
                          className="px-2.5 py-1 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-800 border border-emerald-200 dark:border-emerald-700 font-semibold text-[11px] transition-colors"
                        >
                          Reset Sandi
                        </button>

                        <button
                          disabled={isSelf}
                          onClick={() => onToggleActive(u.id, !u.aktif)}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] border transition-colors ${
                            isSelf
                              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                              : u.aktif
                              ? 'text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/40 dark:border-red-900'
                              : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 dark:border-emerald-800'
                          }`}
                        >
                          {u.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetModalUserId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-emerald-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Reset Password Pengguna</span>
              </h4>
              <button
                onClick={() => setResetModalUserId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {resetError && (
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs font-semibold">
                {resetError}
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Password Baru (min. 8 karakter)
                </label>
                <input
                  type="text"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalUserId(null)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-emerald-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  Simpan Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
