import React, { useState } from 'react';
import { Pengumuman } from '../types';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Clock, 
  AlertCircle, 
  Search, 
  Tag, 
  X,
  UserCheck,
  Calendar
} from 'lucide-react';

interface PengumumanViewProps {
  pengumumanList: Pengumuman[];
  isAdmin: boolean;
  onAddPengumuman: (data: { 
    judul: string; 
    isi: string; 
    kategori?: Pengumuman['kategori']; 
    penulis?: string;
    tanggalKegiatan?: string;
  }) => void;
  onDeletePengumuman: (id: number) => void;
  authorName: string;
}

export const PengumumanView: React.FC<PengumumanViewProps> = ({
  pengumumanList,
  isAdmin,
  onAddPengumuman,
  onDeletePengumuman,
  authorName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('SEMUA');

  // New announcement modal / drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState<Pengumuman['kategori']>('Umum');
  const [tanggalKegiatan, setTanggalKegiatan] = useState('');
  const [formError, setFormError] = useState('');

  const KATEGORI_OPTIONS: Pengumuman['kategori'][] = ['Penting', 'Kedinasan', 'Kurikulum', 'Kegiatan', 'Umum'];

  const filteredList = pengumumanList.filter((p) => {
    const matchSearch =
      p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.isi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedKategori === 'SEMUA' || p.kategori === selectedKategori;
    return matchSearch && matchCat;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) {
      setFormError('Judul pengumuman wajib diisi');
      return;
    }

    onAddPengumuman({
      judul: judul.trim(),
      isi: isi.trim(),
      kategori,
      tanggalKegiatan: tanggalKegiatan ? tanggalKegiatan : undefined,
      penulis: authorName || 'Admin Madrasah'
    });

    setIsModalOpen(false);
    setJudul('');
    setIsi('');
    setTanggalKegiatan('');
    setKategori('Umum');
    setFormError('');
  };

  const getKategoriBadge = (kat?: string) => {
    switch (kat) {
      case 'Penting':
        return 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'Kedinasan':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      case 'Kurikulum':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
      case 'Kegiatan':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <span>Pengumuman & Informasi Madrasah</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-0.5">
              Pusat edaran resmi dan warta internal MI Darussalam Pinangsari
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-700/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Pengumuman</span>
            </button>
          )}
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-emerald-800/60 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengumuman atau kata kunci..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50/50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedKategori('SEMUA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedKategori === 'SEMUA'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
              }`}
            >
              Semua
            </button>
            {KATEGORI_OPTIONS.map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedKategori(kat || 'Umum')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedKategori === kat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-emerald-900/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-slate-400 dark:text-emerald-400/80">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-500" />
            <p className="text-sm font-bold">Belum Ada Pengumuman</p>
            <p className="text-xs mt-1">Tidak ada postingan yang sesuai kriteria pencarian.</p>
          </div>
        ) : (
          filteredList.map((ann) => (
            <div
              key={ann.id}
              className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-3 relative hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getKategoriBadge(ann.kategori)}`}>
                    {ann.kategori || 'Pengumuman'}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Rilis: {ann.tanggal}</span>
                  </span>
                  {ann.tanggalKegiatan && (
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-800/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
                      <span>Pelaksanaan: {ann.tanggalKegiatan}</span>
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <button
                    onClick={() => onDeletePengumuman(ann.id)}
                    title="Hapus Pengumuman"
                    className="self-end sm:self-auto p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {ann.judul}
              </h3>

              <div className="text-sm text-slate-700 dark:text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
                {ann.isi}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-emerald-800/60 flex items-center justify-between text-xs text-slate-400 dark:text-emerald-400/80">
                <span>Diterbitkan oleh: <strong className="text-slate-600 dark:text-emerald-200">{ann.penulis || 'Admin Madrasah'}</strong></span>
                <span>MI Darussalam Pinangsari</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <span>Buat Pengumuman Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="misal: Persiapan Asesmen Madrasah Semester Genap"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Kategori
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as Pengumuman['kategori'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {KATEGORI_OPTIONS.map((kat) => (
                      <option key={kat} value={kat}>{kat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Tanggal Kegiatan (Opsional)
                  </label>
                  <input
                    type="date"
                    value={tanggalKegiatan}
                    onChange={(e) => setTanggalKegiatan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 dark:text-emerald-400">
                    Masuk ke Kalender Akademik Dashboard
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Isi Lengkap Pengumuman *
                </label>
                <textarea
                  rows={5}
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder="Tuliskan isi pengumuman, instruksi, atau tanggal penting..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-emerald-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-emerald-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20"
                >
                  Publikasikan Pengumuman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
