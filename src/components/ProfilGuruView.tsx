import React, { useState, useEffect } from 'react';
import { User, GTK } from '../types';
import { 
  UserCheck, 
  Save, 
  Award, 
  Phone, 
  Mail, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

interface ProfilGuruViewProps {
  currentUser: User;
  gtkData: GTK | undefined;
  onSaveProfil: (data: { nama: string; nuptk: string; hp: string; mapel: string; email?: string; pendidikan?: string }) => void;
}

export const ProfilGuruView: React.FC<ProfilGuruViewProps> = ({
  currentUser,
  gtkData,
  onSaveProfil,
}) => {
  const [nama, setNama] = useState(gtkData?.nama || currentUser.nama || '');
  const [nuptk, setNuptk] = useState(gtkData?.nuptk || '');
  const [hp, setHp] = useState(gtkData?.hp || '');
  const [mapel, setMapel] = useState(gtkData?.mapel || '');
  const [email, setEmail] = useState(gtkData?.email || '');
  const [pendidikan, setPendidikan] = useState(gtkData?.pendidikan || '');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (gtkData) {
      setNama(gtkData.nama);
      setNuptk(gtkData.nuptk || '');
      setHp(gtkData.hp || '');
      setMapel(gtkData.mapel || '');
      setEmail(gtkData.email || '');
      setPendidikan(gtkData.pendidikan || '');
    }
  }, [gtkData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSavedSuccess(false);

    if (!nama.trim()) {
      setErrorMessage('Nama lengkap wajib diisi');
      return;
    }

    try {
      onSaveProfil({
        nama: nama.trim(),
        nuptk: nuptk.trim(),
        hp: hp.trim(),
        mapel: mapel.trim(),
        email: email.trim(),
        pendidikan: pendidikan.trim()
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyimpan profil');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Profil Mandiri Pendidik</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-1">
          Perbarui data identitas diri, nomor kontak WhatsApp, dan mata pelajaran yang Anda ampu di MI Darussalam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Card (2 cols) */}
        <div className="md:col-span-2 bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-5">
          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Profil berhasil disimpan dan diperbarui!</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Nama Lengkap & Gelar *
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="misal: Siti Rahmah, S.Pd.I"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  NUPTK / PegID
                </label>
                <input
                  type="text"
                  value={nuptk}
                  onChange={(e) => setNuptk(e.target.value)}
                  placeholder="16 digit angka"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  No. WhatsApp / HP *
                </label>
                <input
                  type="text"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  placeholder="081398765432"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                Mata Pelajaran / Tugas Tambahan
              </label>
              <input
                type="text"
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                placeholder="misal: Tematik Kelas 6, Akidah Akhlak"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@madrasah.sch.id"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Pendidikan Terakhir
                </label>
                <input
                  type="text"
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e.target.value)}
                  placeholder="misal: S1 PGMI"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-emerald-800 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Digital ID Preview Card (1 col) */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 text-white rounded-3xl p-6 shadow-lg shadow-emerald-950/20 space-y-4 relative overflow-hidden self-start">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <img 
                  src={MADRASAH_LOGO} 
                  alt="Logo MI Darussalam" 
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <div>
                <p className="font-extrabold text-xs uppercase tracking-wider text-amber-300">
                  MI DARUSSALAM
                </p>
                <p className="text-[10px] text-emerald-200">Kartu Identitas Pendidik</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/80 text-amber-300 border border-emerald-600/50">
              {gtkData?.status || 'GTY'}
            </span>
          </div>

          <div className="text-center py-2 space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-900 font-black text-2xl flex items-center justify-center mx-auto shadow-md">
              {nama ? nama.charAt(0) : 'G'}
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                {nama || 'Nama Guru'}
              </h4>
              <p className="text-xs text-amber-300 font-medium">
                {gtkData?.jabatan || 'Guru Kelas'}
              </p>
            </div>
          </div>

          <div className="bg-emerald-900/60 rounded-xl p-3 text-[11px] space-y-1.5 border border-emerald-700/50">
            <div className="flex justify-between">
              <span className="text-emerald-300">NUPTK:</span>
              <span className="font-mono font-bold text-white">{nuptk || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">WhatsApp:</span>
              <span className="font-bold text-white">{hp || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">Mapel:</span>
              <span className="font-medium text-white truncate max-w-[130px]">{mapel || '-'}</span>
            </div>
          </div>

          <p className="text-[10px] text-center text-emerald-300/80 pt-1">
            Pinangsari, Ciasem, Subang, Jawa Barat
          </p>
        </div>
      </div>
    </div>
  );
};
