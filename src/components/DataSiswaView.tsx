import React, { useState, useMemo } from 'react';
import { Siswa } from '../types';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  FileSpreadsheet, 
  Edit3, 
  Trash2, 
  Phone, 
  MapPin, 
  X, 
  AlertCircle,
  Users,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface DataSiswaViewProps {
  siswaList: Siswa[];
  onAddSiswa: (data: Omit<Siswa, 'id'>) => void;
  onUpdateSiswa: (id: number, data: Partial<Siswa>) => void;
  onDeleteSiswa: (id: number) => void;
}

export const DataSiswaView: React.FC<DataSiswaViewProps> = ({
  siswaList,
  onAddSiswa,
  onUpdateSiswa,
  onDeleteSiswa,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKelas, setSelectedKelas] = useState<string>('SEMUA');
  const [selectedGender, setSelectedGender] = useState<string>('SEMUA');
  const [selectedStatus, setSelectedStatus] = useState<string>('SEMUA');

  // Modal Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<Siswa, 'id'>>({
    nama: '',
    nisn: '',
    nis: '',
    kelas: 'Kelas 1',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '',
    namaWali: '',
    hpWali: '',
    alamat: 'Desa Pinangsari, Ciasem, Subang',
    status: 'Aktif'
  });
  const [formError, setFormError] = useState('');

  // Delete modal
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const KELAS_OPTIONS = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];

  // Filtered list
  const filteredList = useMemo(() => {
    return siswaList.filter((s) => {
      const matchSearch =
        s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nisn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.namaWali.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.alamat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchKelas = selectedKelas === 'SEMUA' || s.kelas === selectedKelas;
      const matchGender = selectedGender === 'SEMUA' || s.jenisKelamin === selectedGender;
      const matchStatus = selectedStatus === 'SEMUA' || s.status === selectedStatus;

      return matchSearch && matchKelas && matchGender && matchStatus;
    });
  }, [siswaList, searchQuery, selectedKelas, selectedGender, selectedStatus]);

  // Statistics
  const totalL = siswaList.filter((s) => s.jenisKelamin === 'L').length;
  const totalP = siswaList.filter((s) => s.jenisKelamin === 'P').length;

  const openAddModal = () => {
    setEditingSiswa(null);
    setFormData({
      nama: '',
      nisn: '',
      nis: '',
      kelas: 'Kelas 1',
      jenisKelamin: 'L',
      tempatLahir: 'Subang',
      tanggalLahir: '',
      namaWali: '',
      hpWali: '',
      alamat: 'Desa Pinangsari, Ciasem, Subang',
      status: 'Aktif'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (s: Siswa) => {
    setEditingSiswa(s);
    setFormData({
      nama: s.nama,
      nisn: s.nisn,
      nis: s.nis,
      kelas: s.kelas,
      jenisKelamin: s.jenisKelamin,
      tempatLahir: s.tempatLahir || '',
      tanggalLahir: s.tanggalLahir || '',
      namaWali: s.namaWali,
      hpWali: s.hpWali,
      alamat: s.alamat,
      status: s.status
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      setFormError('Nama lengkap siswa wajib diisi');
      return;
    }
    if (!formData.namaWali.trim()) {
      setFormError('Nama orang tua / wali wajib diisi');
      return;
    }

    if (editingSiswa) {
      onUpdateSiswa(editingSiswa.id, formData);
    } else {
      onAddSiswa(formData);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Nama Siswa', 'NISN', 'NIS', 'Kelas', 'L/P', 'Nama Wali', 'No. HP Wali', 'Alamat', 'Status'];
    const rows = filteredList.map((s, idx) => [
      idx + 1,
      `"${s.nama}"`,
      `"${s.nisn}"`,
      `"${s.nis}"`,
      `"${s.kelas}"`,
      `"${s.jenisKelamin}"`,
      `"${s.namaWali}"`,
      `"${s.hpWali}"`,
      `"${s.alamat}"`,
      `"${s.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Data_Siswa_MI_Darussalam_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Murid / Santri MI Darussalam</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-0.5">
              Buku induk siswa aktif per rombongan belajar (Kelas 1 s/d Kelas 6)
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

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm shadow-emerald-700/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Siswa Baru</span>
            </button>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-emerald-800/60 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800">
            <p className="text-slate-500 dark:text-emerald-400 font-medium text-[11px]">Total Seluruh Murid</p>
            <p className="text-xl font-extrabold text-emerald-900 dark:text-white mt-0.5">{siswaList.length} Santri</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <p className="text-slate-500 dark:text-blue-400 font-medium text-[11px]">Laki-laki (Ikhwan)</p>
            <p className="text-xl font-extrabold text-blue-900 dark:text-blue-200 mt-0.5">{totalL} Siswa</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
            <p className="text-slate-500 dark:text-purple-400 font-medium text-[11px]">Perempuan (Akhwat)</p>
            <p className="text-xl font-extrabold text-purple-900 dark:text-purple-200 mt-0.5">{totalP} Siswi</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
            <p className="text-slate-500 dark:text-amber-400 font-medium text-[11px]">Data Tampil Sesuai Filter</p>
            <p className="text-xl font-extrabold text-amber-900 dark:text-amber-200 mt-0.5">{filteredList.length} Murid</p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-emerald-800/60 text-xs">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa, NISN, wali, alamat..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50/50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Kelas */}
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="SEMUA">Semua Kelas (1–6)</option>
              {KELAS_OPTIONS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>

            {/* Filter Gender */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="SEMUA">Semua Gender</option>
              <option value="L">Laki-laki (L)</option>
              <option value="P">Perempuan (P)</option>
            </select>

            {/* Filter Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="SEMUA">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Mutasi">Mutasi</option>
              <option value="Lulus">Lulus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Siswa Table */}
      <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold uppercase tracking-wider text-[11px] border-b border-emerald-100 dark:border-emerald-800">
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Nama Siswa & NISN</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">L/P</th>
                <th className="py-3.5 px-4">Orang Tua / Wali</th>
                <th className="py-3.5 px-4">No. WA / HP Wali</th>
                <th className="py-3.5 px-4">Alamat Domisili</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-800/60 text-slate-700 dark:text-emerald-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400 dark:text-emerald-400">
                    Tidak ada data murid yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((s, index) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3 px-4 text-center font-medium text-slate-400 dark:text-emerald-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {s.nama}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400 dark:text-emerald-400/80">
                        NISN: {s.nisn || '-'} · NIS: {s.nis || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-bold">
                        {s.kelas}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        s.jenisKelamin === 'L' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200'
                      }`}>
                        {s.jenisKelamin === 'L' ? 'L (Laki-laki)' : 'P (Perempuan)'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-emerald-100">
                      {s.namaWali}
                    </td>
                    <td className="py-3 px-4">
                      {s.hpWali ? (
                        <a
                          href={`https://wa.me/${s.hpWali.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{s.hpWali}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-emerald-300 max-w-xs truncate" title={s.alamat}>
                      {s.alamat}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(s)}
                          title="Ubah Data Siswa"
                          className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(s.id)}
                          title="Hapus Data Siswa"
                          className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Siswa Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{editingSiswa ? 'Ubah Data Murid' : 'Tambah Data Murid Baru'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
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

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Nama Lengkap Siswa / Santri *
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="misal: Muhammad Al-Fatih"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    NISN (Nomor Induk Siswa Nasional)
                  </label>
                  <input
                    type="text"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    placeholder="10 digit angka"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    NIS Madrasah
                  </label>
                  <input
                    type="text"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    placeholder="misal: 2026001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Rombongan Belajar (Kelas)
                  </label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {KELAS_OPTIONS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    value={formData.namaWali}
                    onChange={(e) => setFormData({ ...formData, namaWali: e.target.value })}
                    placeholder="Nama bapak/ibu wali"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    No. WhatsApp / HP Wali
                  </label>
                  <input
                    type="text"
                    value={formData.hpWali}
                    onChange={(e) => setFormData({ ...formData, hpWali: e.target.value })}
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Alamat Domisili Siswa
                  </label>
                  <input
                    type="text"
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="misal: Dusun Sukamaju RT 03/RW 01, Desa Pinangsari, Ciasem"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800">
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
                  {editingSiswa ? 'Perbarui Data Murid' : 'Simpan Data Murid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Hapus Data Siswa Ini?
              </h4>
              <p className="text-xs text-slate-500 dark:text-emerald-300/80">
                Data murid akan dihapus dari buku induk madrasah. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-emerald-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteSiswa(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
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
