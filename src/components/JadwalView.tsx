import React, { useState, useMemo } from 'react';
import { Jadwal, GTK, HariSekolah } from '../types';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Printer, 
  Trash2, 
  Filter, 
  BookOpen, 
  LayoutGrid, 
  List,
  AlertCircle,
  X
} from 'lucide-react';

interface JadwalViewProps {
  jadwalList: Jadwal[];
  gtkList: GTK[];
  isAdmin: boolean;
  onAddJadwal: (data: Omit<Jadwal, 'id' | 'guru'>) => void;
  onDeleteJadwal: (id: number) => void;
  filterTeacherName?: string;
}

export const JadwalView: React.FC<JadwalViewProps> = ({
  jadwalList,
  gtkList,
  isAdmin,
  onAddJadwal,
  onDeleteJadwal,
  filterTeacherName,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'matrix'>('table');
  const [selectedHari, setSelectedHari] = useState<string>('SEMUA');
  const [selectedKelas, setSelectedKelas] = useState<string>('SEMUA');
  const [selectedGuruId, setSelectedGuruId] = useState<string>('SEMUA');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    gtk_id: number;
    hari: HariSekolah;
    jam: string;
    mapel: string;
    kelas: string;
  }>({
    gtk_id: gtkList[0]?.id || 1,
    hari: 'Senin',
    jam: '07.30 - 08.40',
    mapel: '',
    kelas: 'Kelas 1'
  });
  const [formError, setFormError] = useState('');

  const HARI_LIST: HariSekolah[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const KELAS_LIST = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];

  // Filtered schedules
  const filteredJadwal = useMemo(() => {
    return jadwalList.filter((j) => {
      const matchHari = selectedHari === 'SEMUA' || j.hari === selectedHari;
      const matchKelas = selectedKelas === 'SEMUA' || j.kelas === selectedKelas;
      const matchGuru = selectedGuruId === 'SEMUA' || String(j.gtk_id) === selectedGuruId;
      return matchHari && matchKelas && matchGuru;
    });
  }, [jadwalList, selectedHari, selectedKelas, selectedGuruId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mapel.trim()) {
      setFormError('Mata pelajaran wajib diisi');
      return;
    }
    if (!formData.jam.trim()) {
      setFormError('Jam pelajaran wajib diisi');
      return;
    }

    onAddJadwal(formData);
    setIsModalOpen(false);
    setFormData({
      gtk_id: gtkList[0]?.id || 1,
      hari: 'Senin',
      jam: '07.30 - 08.40',
      mapel: '',
      kelas: 'Kelas 1'
    });
    setFormError('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {filterTeacherName ? `Jadwal Mengajar: ${filterTeacherName}` : 'Jadwal Pelajaran MI Darussalam'}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-0.5">
              Tahun Ajaran 2026/2027 · Semester Ganjil · Kurikulum Merdeka
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-emerald-950/80 p-1 border border-slate-200 dark:border-emerald-800">
              <button
                onClick={() => setViewMode('table')}
                title="Tampilan Tabel"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-emerald-300'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Tabel</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                title="Tampilan Matriks Mingguan"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-emerald-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Matriks</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              title="Cetak Jadwal"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-800/60 hover:bg-slate-200 dark:hover:bg-emerald-800 text-slate-700 dark:text-emerald-200 font-semibold text-xs border border-slate-200 dark:border-emerald-700 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-700/20 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Jadwal</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-emerald-800/60 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-emerald-300/80 mb-1">
              Filter Hari
            </label>
            <select
              value={selectedHari}
              onChange={(e) => setSelectedHari(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="SEMUA">Semua Hari (Senin - Sabtu)</option>
              {HARI_LIST.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-emerald-300/80 mb-1">
              Filter Kelas
            </label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="SEMUA">Semua Rombel / Kelas</option>
              {KELAS_LIST.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {!filterTeacherName && (
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-emerald-300/80 mb-1">
                Filter Dewan Guru
              </label>
              <select
                value={selectedGuruId}
                onChange={(e) => setSelectedGuruId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="SEMUA">Semua Guru Pengampu</option>
                {gtkList.map((g) => (
                  <option key={g.id} value={g.id}>{g.nama}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Table or Matrix */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold uppercase tracking-wider text-[11px] border-b border-emerald-100 dark:border-emerald-800">
                  <th className="py-3.5 px-4">Hari</th>
                  <th className="py-3.5 px-4">Waktu / Jam</th>
                  <th className="py-3.5 px-4">Mata Pelajaran</th>
                  <th className="py-3.5 px-4">Rombel / Kelas</th>
                  <th className="py-3.5 px-4">Guru Pengampu</th>
                  {isAdmin && <th className="py-3.5 px-4 text-center">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-emerald-800/60 text-slate-700 dark:text-emerald-100">
                {filteredJadwal.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="py-10 text-center text-slate-400 dark:text-emerald-400">
                      Belum ada jadwal yang cocok dengan filter yang dipilih.
                    </td>
                  </tr>
                ) : (
                  filteredJadwal.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/80 dark:hover:bg-emerald-950/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold">
                          {j.hari}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-emerald-300">
                        {j.jam}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                        {j.mapel}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-300 font-semibold border border-slate-200 dark:border-emerald-800">
                          {j.kelas}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-emerald-200">
                        {j.guru}
                      </td>
                      {isAdmin && (
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => onDeleteJadwal(j.id)}
                            title="Hapus Jadwal"
                            className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Matrix View by Day */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HARI_LIST.map((hari) => {
            const sessions = filteredJadwal.filter((j) => j.hari === hari);
            return (
              <div 
                key={hari} 
                className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100 dark:border-emerald-800">
                  <h4 className="font-extrabold text-base text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{hari}</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                    {sessions.length} Sesi
                  </span>
                </div>

                {sessions.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-emerald-400/60 py-4 text-center italic">
                    Tidak ada jadwal
                  </p>
                ) : (
                  <div className="space-y-2">
                    {sessions.map((j) => (
                      <div 
                        key={j.id} 
                        className="p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-200/60 dark:border-emerald-800 text-xs space-y-1 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {j.mapel}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                            {j.kelas}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-emerald-300/80 pt-0.5">
                          <span>{j.guru}</span>
                          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                            {j.jam}
                          </span>
                        </div>
                        {isAdmin && (
                          <button
                            onClick={() => onDeleteJadwal(j.id)}
                            title="Hapus"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-300 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Jadwal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Tambah Jadwal Mengajar</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Guru Pengampu *
                </label>
                <select
                  value={formData.gtk_id}
                  onChange={(e) => setFormData({ ...formData, gtk_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {gtkList.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nama} ({g.jabatan})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Hari
                  </label>
                  <select
                    value={formData.hari}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value as HariSekolah })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {HARI_LIST.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Kelas
                  </label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {KELAS_LIST.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Jam / Waktu Pelajaran *
                </label>
                <input
                  type="text"
                  value={formData.jam}
                  onChange={(e) => setFormData({ ...formData, jam: e.target.value })}
                  placeholder="misal: 07.15 - 08.25"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                  Mata Pelajaran *
                </label>
                <input
                  type="text"
                  value={formData.mapel}
                  onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
                  placeholder="misal: Fiqih Ibadah, Matematika, Tematik"
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
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
