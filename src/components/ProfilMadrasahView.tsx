import React, { useState } from 'react';
import { ProfilMadrasah } from '../types';
import { 
  Building, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Edit3, 
  Printer, 
  BookOpen, 
  Sparkles, 
  School, 
  Users, 
  Shield, 
  X,
  Target,
  FileCheck
} from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

interface ProfilMadrasahViewProps {
  profil: ProfilMadrasah;
  isAdmin: boolean;
  onUpdateProfil: (data: Partial<ProfilMadrasah>) => void;
}

export const ProfilMadrasahView: React.FC<ProfilMadrasahViewProps> = ({
  profil,
  isAdmin,
  onUpdateProfil,
}) => {
  const [activeTab, setActiveTab] = useState<'identitas' | 'visi-misi' | 'sarana' | 'kontak'>('identitas');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState<ProfilMadrasah>(profil);
  const [misiText, setMisiText] = useState(profil.misi.join('\n'));
  const [tujuanText, setTujuanText] = useState(profil.tujuan.join('\n'));
  const [saranaText, setSaranaText] = useState(profil.sarana.join('\n'));

  const openEditModal = () => {
    setFormData(profil);
    setMisiText(profil.misi.join('\n'));
    setTujuanText(profil.tujuan.join('\n'));
    setSaranaText(profil.sarana.join('\n'));
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProfilMadrasah = {
      ...formData,
      misi: misiText.split('\n').map(s => s.trim()).filter(Boolean),
      tujuan: tujuanText.split('\n').map(s => s.trim()).filter(Boolean),
      sarana: saranaText.split('\n').map(s => s.trim()).filter(Boolean)
    };
    onUpdateProfil(updated);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center shrink-0 border border-white/20">
              <img 
                src={MADRASAH_LOGO} 
                alt="Logo MI Darussalam" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kementerian Agama RI · Kab. Subang</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {profil.nama}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                NSM: <span className="font-mono font-bold text-amber-300">{profil.nsm}</span> · NPSN: <span className="font-mono font-bold text-amber-300">{profil.npsn}</span> · Akreditasi: <span className="font-bold text-white">{profil.akreditasi}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Profil</span>
            </button>

            {isAdmin && (
              <button
                onClick={openEditModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Ubah Profil</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-emerald-700/60 text-xs">
          {[
            { id: 'identitas', label: 'Identitas Lembaga', icon: Building },
            { id: 'visi-misi', label: 'Visi, Misi & Tujuan', icon: Target },
            { id: 'sarana', label: 'Sarana & Prasarana', icon: School },
            { id: 'kontak', label: 'Kontak & Lokasi', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-950 shadow-md scale-102'
                    : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Identitas Lembaga */}
      {activeTab === 'identitas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800">
              <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Pokok Madrasah</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Nama Madrasah:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">{profil.nama}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">NSM:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{profil.nsm}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">NPSN:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{profil.npsn}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Jenjang Pendidikan:</span>
                <span className="font-bold text-slate-900 dark:text-white">Madrasah Ibtidaiyah (MI)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Status Madrasah:</span>
                <span className="font-bold text-slate-900 dark:text-white">{profil.status}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-emerald-300">Tahun Berdiri:</span>
                <span className="font-bold text-slate-900 dark:text-white">{profil.tahunBerdiri}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Akreditasi & Kepemimpinan</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Peringkat Akreditasi:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold">
                  {profil.akreditasi}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Kurikulum yang Digunakan:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">{profil.kurikulum}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Kepala Madrasah:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">{profil.kepalaMadrasah}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300">Ketua Komite Madrasah:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">{profil.ketuaKomite}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-emerald-300">Naungan Instansi:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Kemenag Kab. Subang</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Visi, Misi & Tujuan */}
      {activeTab === 'visi-misi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Visi */}
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Visi MI Darussalam
              </h3>
            </div>
            <blockquote className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-l-4 border-emerald-600 text-slate-800 dark:text-emerald-100 font-semibold text-sm leading-relaxed italic">
              "{profil.visi}"
            </blockquote>
          </div>

          {/* Misi */}
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Misi Madrasah
              </h3>
            </div>
            <div className="space-y-2.5">
              {profil.misi.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-emerald-100">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed pt-0.5">{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan */}
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Tujuan Pendidikan Madrasah
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {profil.tujuan.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/60 text-xs space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-xs">
                    Target {idx + 1}
                  </span>
                  <p className="text-slate-700 dark:text-emerald-100 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sarana & Prasarana */}
      {activeTab === 'sarana' && (
        <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Sarana & Prasarana Pembelajaran
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
              {profil.sarana.length} Fasilitas Utama
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profil.sarana.map((s, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200/70 dark:border-emerald-800 flex items-center gap-3 hover:border-emerald-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <p className="font-bold text-xs text-slate-800 dark:text-white leading-snug">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Kontak & Lokasi */}
      {activeTab === 'kontak' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Alamat & Lokasi Madrasah</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700 dark:text-emerald-100">
              <p className="leading-relaxed">
                <strong>Alamat:</strong> {profil.alamat}, {profil.desa}, {profil.kecamatan}, {profil.kabupaten}, {profil.provinsi} {profil.kodePos}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200/60 dark:border-emerald-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-emerald-400">Desa / Kelurahan:</span>
                  <span className="font-bold">{profil.desa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-emerald-400">Kecamatan:</span>
                  <span className="font-bold">{profil.kecamatan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-emerald-400">Kabupaten:</span>
                  <span className="font-bold">{profil.kabupaten}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-emerald-400">Kode Pos:</span>
                  <span className="font-mono font-bold">{profil.kodePos}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-emerald-800">
              <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Saluran Komunikasi Resmi</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 dark:text-emerald-400 text-[11px]">Telepon / WhatsApp</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{profil.telepon}</p>
                </div>
                <a
                  href={`https://wa.me/${profil.telepon.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                >
                  Kirim Pesan
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800">
                <p className="text-slate-500 dark:text-emerald-400 text-[11px]">Surat Elektronik (Email)</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{profil.email}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800">
                <p className="text-slate-500 dark:text-emerald-400 text-[11px]">Pelayanan Administrasi</p>
                <p className="font-semibold text-slate-800 dark:text-emerald-200 text-xs">Senin – Sabtu: Pukul 07.00 – 14.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Admin Only) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Ubah Profil Lengkap Madrasah</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Nama Madrasah
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    NSM
                  </label>
                  <input
                    type="text"
                    value={formData.nsm}
                    onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    NPSN
                  </label>
                  <input
                    type="text"
                    value={formData.npsn}
                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Akreditasi
                  </label>
                  <input
                    type="text"
                    value={formData.akreditasi}
                    onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Status Lembaga
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Kepala Madrasah
                  </label>
                  <input
                    type="text"
                    value={formData.kepalaMadrasah}
                    onChange={(e) => setFormData({ ...formData, kepalaMadrasah: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Ketua Komite
                  </label>
                  <input
                    type="text"
                    value={formData.ketuaKomite}
                    onChange={(e) => setFormData({ ...formData, ketuaKomite: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Visi Madrasah
                  </label>
                  <textarea
                    rows={2}
                    value={formData.visi}
                    onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Misi Madrasah (1 baris per butir misi)
                  </label>
                  <textarea
                    rows={4}
                    value={misiText}
                    onChange={(e) => setMisiText(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    No. Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-emerald-200 mb-1">
                    Email Madrasah
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-emerald-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-emerald-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md shadow-emerald-700/20"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
