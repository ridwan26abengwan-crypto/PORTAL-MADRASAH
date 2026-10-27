import React from 'react';
import { ActivePage, Pengumuman } from '../types';
import { 
  Users, 
  Calendar, 
  Bell, 
  UserCheck, 
  BookOpen, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

interface LandingPageProps {
  stats: {
    gtkCount: number;
    guruCount: number;
    pengumumanCount: number;
    rombelCount: number;
    siswaCount?: number;
  };
  pengumumanList: Pengumuman[];
  onNavigate: (page: ActivePage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  stats,
  pengumumanList,
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-emerald-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background decorative circles & pattern */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
        
        {/* Islamic arabesque subtle watermark */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center hover:scale-105 transition-transform">
              <img 
                src={MADRASAH_LOGO} 
                alt="Logo MI Darussalam" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kementerian Agama RI · Kurikulum Merdeka</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Portal Sistem Informasi <br />
            <span className="text-amber-300 drop-shadow-sm font-black">MI Darussalam</span>
          </h1>

          <p className="max-w-2xl mx-auto text-emerald-100/90 text-sm sm:text-lg leading-relaxed">
            Sistem informasi dan administrasi madrasah terpadu untuk pendataan guru, staf, santri/murid, jadwal pelajaran, dan pengumuman resmi. 
            Desa Pinangsari, Kecamatan Ciasem, Kabupaten Subang, Jawa Barat.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Masuk ke Portal</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('profil-madrasah')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Building className="w-5 h-5 text-amber-300" />
              <span>Profil Madrasah</span>
            </button>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-xs transition-colors"
            >
              <span>Layanan</span>
            </a>
          </div>
        </div>
      </section>

      {/* Floating Statistics Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-emerald-900/80 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-950/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 dark:text-emerald-50">
                {stats.gtkCount}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-emerald-300/80">
                Guru & Tendik
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-emerald-900/80 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-950/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                {stats.siswaCount || 12}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-emerald-300/80">
                Santri / Murid
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-emerald-900/80 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-950/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                {stats.rombelCount}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-emerald-300/80">
                Rombel (Kls 1-6)
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-emerald-900/80 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-950/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                {stats.pengumumanCount}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-emerald-300/80">
                Pengumuman Aktif
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400 mb-2">
            Layanan Terpadu
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Fitur Utama Portal MI Darussalam
          </h3>
          <p className="text-slate-600 dark:text-emerald-200/70 text-sm sm:text-base mt-2">
            Mendukung kelancaran proses kegiatan belajar mengajar dan pelaporan kelembagaan madrasah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-800/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Data Guru & Tenaga Kependidikan
            </h4>
            <p className="text-sm text-slate-600 dark:text-emerald-200/70 leading-relaxed">
              Pencatatan data tenaga pendidik dan kependidikan, NUPTK, status kepegawaian (PNS, GTY, GTT, PTT), serta kontak.
            </p>
          </div>

          <div className="bg-white dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Jadwal Pelajaran
            </h4>
            <p className="text-sm text-slate-600 dark:text-emerald-200/70 leading-relaxed">
              Jadwal mengajar mingguan terstruktur per kelas dan jam pelajaran. Guru dapat melihat jadwal harian masing-masing.
            </p>
          </div>

          <div className="bg-white dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
              <Bell className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Papan Pengumuman
            </h4>
            <p className="text-sm text-slate-600 dark:text-emerald-200/70 leading-relaxed">
              Penyampaian informasi resmi madrasah, surat edaran Kemenag, rapat dewan guru, dan agenda asesmen secara real-time.
            </p>
          </div>

          <div className="bg-white dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Profil Mandiri Guru
            </h4>
            <p className="text-sm text-slate-600 dark:text-emerald-200/70 leading-relaxed">
              Bapak/Ibu dewan guru dapat memperbarui data kontak, NUPTK, dan mata pelajaran yang diampu secara mandiri.
            </p>
          </div>
        </div>
      </section>

      {/* Madrasah Profile & Values */}
      <section className="bg-emerald-50/70 dark:bg-emerald-950/40 border-y border-emerald-100 dark:border-emerald-900/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200/70 dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold">
                <Building className="w-3.5 h-3.5" />
                <span>Profil Lembaga</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Mencetak Generasi Berakhlak Mulia & Unggul dalam Prestasi
              </h3>
              <p className="text-slate-600 dark:text-emerald-200/80 text-sm sm:text-base leading-relaxed">
                Madrasah Ibtidaiyah Darussalam berdedikasi mendidik putra-putri di wilayah Desa Pinangsari dan sekitarnya 
                dengan memadukan kurikulum nasional dan nilai-nilai keislaman aswaja.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">Tahfidz Juz 30 & Sholat Dhuha</h5>
                    <p className="text-xs text-slate-600 dark:text-emerald-300/70">Pembiasaan ibadah praktis setiap pagi sebelum kegiatan belajar mengajar.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pramuka & Pengembangan Karakter</h5>
                    <p className="text-xs text-slate-600 dark:text-emerald-300/70">Kegiatan kepanduan madrasah aktif untuk melatih kedisiplinan dan gotong royong.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">Integrasi EMIS, Simpatika & RDM</h5>
                    <p className="text-xs text-slate-600 dark:text-emerald-300/70">Tata kelola data digital yang akurat dan tersinkronisasi dengan Kementerian Agama.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('profil-madrasah')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <Building className="w-4 h-4 text-amber-300" />
                  <span>Buka Profil Lengkap Madrasah (Visi, Misi, Sarpras)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Announcements Highlights card */}
            <div className="bg-white dark:bg-emerald-900/60 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100 dark:border-emerald-800/80 mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Pengumuman Terbaru Madrasah
                  </h4>
                </div>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="space-y-4">
                {pengumumanList.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border-l-4 border-emerald-600 dark:border-emerald-400 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                          {item.kategori || 'Pengumuman'}
                        </span>
                        {item.tanggalKegiatan && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                            Agenda: {item.tanggalKegiatan}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-emerald-400/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.tanggal}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-emerald-100 line-clamp-1">
                      {item.judul}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-emerald-300/80 line-clamp-2 leading-relaxed">
                      {item.isi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200/80 border-t border-emerald-900 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-emerald-900">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={MADRASAH_LOGO} 
                  alt="Logo MI Darussalam" 
                  className="w-9 h-9 object-contain drop-shadow-xs" 
                />
                <h4 className="font-extrabold text-white text-base">MI Darussalam</h4>
              </div>
              <p className="text-xs leading-relaxed text-emerald-300/70">
                Madrasah Ibtidaiyah di bawah naungan Kementerian Agama Kabupaten Subang, berkomitmen menyelenggarakan pendidikan dasar bermutu dan berkarakter islami.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-sm mb-3">Alamat & Kontak</h5>
              <ul className="text-xs space-y-2 text-emerald-300/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Desa Pinangsari, Kec. Ciasem, Kab. Subang, Jawa Barat 41256</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>(0260) 520xxx / 0812-2345-6789</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>midarussalam.pinangsari@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white text-sm mb-3">Tautan Cepat</h5>
              <ul className="text-xs space-y-2">
                <li>
                  <button onClick={() => onNavigate('login')} className="hover:text-amber-300 transition-colors">
                    → Masuk Portal GTK
                  </button>
                </li>
                <li>
                  <a href="#layanan" className="hover:text-amber-300 transition-colors">
                    → Fitur & Layanan GTK
                  </a>
                </li>
                <li>
                  <span className="text-emerald-400/60">
                    EMIS 4.0 · Simpatika Kemenag · RDM (Rapor Digital)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60">
            <p>© 2026 MI Darussalam Pinangsari Ciasem Subang. Hak cipta dilindungi undang-undang.</p>
            <p className="mt-2 sm:mt-0">Dikelola oleh Administrator Sistem Madrasah</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
