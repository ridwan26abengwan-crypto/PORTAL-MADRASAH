import React, { useState, useMemo } from 'react';
import { GTK, StatusKepegawaian } from '../types';
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  X, 
  Check, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

interface DataGtkViewProps {
  gtkList: GTK[];
  onAddGtk: (data: Omit<GTK, 'id'>) => void;
  onUpdateGtk: (id: number, data: Partial<GTK>) => void;
  onDeleteGtk: (id: number) => void;
  isAdmin: boolean;
}

export const DataGtkView: React.FC<DataGtkViewProps> = ({
  gtkList,
  onAddGtk,
  onUpdateGtk,
  onDeleteGtk,
  isAdmin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('SEMUA');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGtk, setEditingGtk] = useState<GTK | null>(null);

  // Form fields
  const [formData, setFormData] = useState<Omit<GTK, 'id'>>({
    nama: '',
    nuptk: '',
    jabatan: 'Guru Kelas',
    status: 'GTY',
    hp: '',
    mapel: '',
    email: '',
    pendidikan: '',
    tmt: ''
  });
  const [formError, setFormError] = useState('');

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Filtered list
  const filteredList = useMemo(() => {
    return gtkList.filter((g) => {
      const matchSearch =
        g.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.nuptk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.mapel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'SEMUA' || g.status === selectedStatus;
      return matchSearch && matchStatus;
    });
  }, [gtkList, searchQuery, selectedStatus]);

  const openAddModal = () => {
    setEditingGtk(null);
    setFormData({
      nama: '',
      nuptk: '',
      jabatan: 'Guru Kelas',
      status: 'GTY',
      hp: '',
      mapel: '',
      email: '',
      pendidikan: '',
      tmt: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (g: GTK) => {
    setEditingGtk(g);
    setFormData({
      nama: g.nama,
      nuptk: g.nuptk || '',
      jabatan: g.jabatan || 'Guru',
      status: g.status,
      hp: g.hp || '',
      mapel: g.mapel || '',
      email: g.email || '',
      pendidikan: g.pendidikan || '',
      tmt: g.tmt || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      setFormError('Nama lengkap wajib diisi');
      return;
    }

    if (editingGtk) {
      onUpdateGtk(editingGtk.id, formData);
    } else {
      onAddGtk(formData);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Nama Lengkap', 'NUPTK', 'Jabatan', 'Status', 'No. HP', 'Mapel / Tugas', 'Email'];
    const rows = filteredList.map((g, idx) => [
      idx + 1,
      `"${g.nama}"`,
      `"${g.nuptk}"`,
      `"${g.jabatan}"`,
      `"${g.status}"`,
      `"${g.hp}"`,
      `"${g.mapel}"`,
      `"${g.email || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Data_GTK_MI_Darussalam_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: StatusKepegawaian) => {
    switch (status) {
      case 'PNS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      case 'GTY':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
      case 'GTT':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 border-amber-200 dark:border-amber-800';
      case 'PTT':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Controls */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Guru dan Staf Madrasah</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-0.5">
              Total {gtkList.length} Guru & Staf terdaftar di MI Darussalam Pinangsari
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-emerald-800/60 hover:bg-slate-200 dark:hover:bg-emerald-800 text-slate-700 dark:text-emerald-200 font-semibold text-xs border border-slate-200 dark:border-emerald-700 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Ekspor CSV</span>
            </button>

            {isAdmin && (
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-700/20 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Guru / Staf</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-emerald-800/60">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NUPTK, jabatan, mapel..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50/50 dark:bg-emerald-950/50 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
            />
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['SEMUA', 'PNS', 'GTY', 'GTT', 'PTT'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStatus === st
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GTK Table */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold uppercase tracking-wider text-[11px] border-b border-emerald-100 dark:border-emerald-800">
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Nama Lengkap & NUPTK</th>
                <th className="py-3.5 px-4">Jabatan</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Mata Pelajaran</th>
                <th className="py-3.5 px-4">Kontak (WhatsApp)</th>
                {isAdmin && <th className="py-3.5 px-4 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-800/60 text-slate-700 dark:text-emerald-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-10 text-center text-slate-400 dark:text-emerald-400">
                    Tidak ada data GTK yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((g, index) => (
                  <tr key={g.id} className="hover:bg-slate-50/80 dark:hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3 px-4 text-center font-medium text-slate-400 dark:text-emerald-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {g.nama}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400 dark:text-emerald-400/80">
                        NUPTK: {g.nuptk || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-emerald-200">
                      {g.jabatan}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(g.status)}`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-emerald-300">
                      {g.mapel || '-'}
                    </td>
                    <td className="py-3 px-4">
                      {g.hp ? (
                        <a
                          href={`https://wa.me/${g.hp.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{g.hp}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    {isAdmin && (
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(g)}
                            title="Ubah Data"
                            className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(g.id)}
                            title="Hapus Data"
                            className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{editingGtk ? 'Ubah Data GTK' : 'Tambah GTK Baru'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
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

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Nama Lengkap & Gelar *
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="misal: Siti Rahmah, S.Pd.I"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    NUPTK / PegID
                  </label>
                  <input
                    type="text"
                    value={formData.nuptk}
                    onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="16 digit angka (opsional)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Status Kepegawaian
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusKepegawaian })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="GTY">GTY (Guru Tetap Yayasan)</option>
                    <option value="GTT">GTT (Guru Tidak Tetap)</option>
                    <option value="PTT">PTT (Pegawai Tidak Tetap)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Jabatan / Tugas
                  </label>
                  <input
                    type="text"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    placeholder="misal: Wali Kelas IV / Guru Kelas"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    No. WhatsApp / HP
                  </label>
                  <input
                    type="text"
                    value={formData.hp}
                    onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Mata Pelajaran yang Diampu
                  </label>
                  <input
                    type="text"
                    value={formData.mapel}
                    onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
                    placeholder="misal: Al-Qur'an Hadits, Tematik, PJOK"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-800 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20"
                >
                  {editingGtk ? 'Perbarui Data' : 'Simpan GTK'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Hapus Data GTK Ini?
              </h4>
              <p className="text-xs text-slate-500 dark:text-emerald-300/80">
                Data jadwal dan keterkaitan akun dengan GTK ini juga akan terhapus. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-800 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteGtk(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
