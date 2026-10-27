import React from 'react';
import { User, GTK, Pengumuman, Jadwal, ActivePage } from '../types';
import { 
  Users, 
  Calendar, 
  Bell, 
  Key, 
  Plus, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Building, 
  FileText, 
  CheckCircle, 
  Clock,
  CalendarDays
} from 'lucide-react';
import { KalenderAkademikWidget } from './KalenderAkademikWidget';

interface DashboardAdminProps {
  currentUser: User;
  gtkList: GTK[];
  usersList: User[];
  pengumumanList: Pengumuman[];
  jadwalList: Jadwal[];
  siswaCount?: number;
  onNavigate: (page: ActivePage) => void;
  onOpenGtkModal: () => void;
  onOpenJadwalModal: () => void;
  onOpenPengumumanModal: () => void;
}

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  currentUser,
  gtkList,
  usersList,
  pengumumanList,
  jadwalList,
  siswaCount = 0,
  onNavigate,
  onOpenGtkModal,
  onOpenJadwalModal,
  onOpenPengumumanModal,
}) => {
  // Categorize GTK
  const pnsCount = gtkList.filter(g => g.status === 'PNS').length;
  const gtyCount = gtkList.filter(g => g.status === 'GTY').length;
  const gttCount = gtkList.filter(g => g.status === 'GTT').length;
  const pttCount = gtkList.filter(g => g.status === 'PTT').length;
  const activeUsersCount = usersList.filter(u => u.aktif).length;

  // Day detection
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayDay = days[new Date().getDay()];
  const todayJadwal = jadwalList.filter(j => j.hari === todayDay);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white p-6 sm:p-8 shadow-lg shadow-emerald-950/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-amber-300 text-xs font-bold border border-emerald-600/40">
            <span>🕌 Panel Pengelola Madrasah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {currentUser.nama}
          </h2>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Kelola data dewan guru, staf, buku induk santri/murid, jadwal KBM, akun pendidik, dan informasi resmi madrasah secara terstruktur untuk MI Darussalam Pinangsari.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-3">
            <button
              onClick={() => onNavigate('profil-madrasah')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-amber-300 font-bold text-xs border border-amber-400/30 shadow-sm transition-all hover:scale-105"
            >
              <Building className="w-4 h-4" />
              <span>Profil Madrasah</span>
            </button>
            <button
              onClick={() => onNavigate('siswa')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-sm transition-all hover:scale-105"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Data Murid / Siswa</span>
            </button>
            <button
              onClick={onOpenGtkModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Guru / Staf</span>
            </button>
            <button
              onClick={onOpenJadwalModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Jadwal</span>
            </button>
            <button
              onClick={onOpenPengumumanModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Pengumuman</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric: Siswa */}
        <div 
          onClick={() => onNavigate('siswa')}
          className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">
              Data Murid
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {siswaCount}
            </span>
            <span className="text-xs text-slate-400 dark:text-emerald-400">Santri</span>
          </div>
          <p className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold mt-2">
            Kelas 1 s/d 6 Aktif
          </p>
        </div>

        {/* Metric 1 */}
        <div 
          onClick={() => onNavigate('gtk')}
          className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">
              Guru & Staf
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {gtkList.length}
            </span>
            <span className="text-xs text-slate-400 dark:text-emerald-400">Orang</span>
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-2 truncate">
            {pnsCount} PNS · {gtyCount} GTY · {gttCount} GTT
          </p>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigate('akun')}
          className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">
              Akun Pengguna
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Key className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeUsersCount}
            </span>
            <span className="text-xs text-slate-400 dark:text-emerald-400">Aktif</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-emerald-400/80 font-medium mt-2">
            Dari total {usersList.length} akun terdaftar
          </p>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigate('jadwal')}
          className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">
              Jadwal KBM
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {jadwalList.length}
            </span>
            <span className="text-xs text-slate-400 dark:text-emerald-400">Jam/Sesi</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-2">
            {todayJadwal.length} sesi mengajar hari ini ({todayDay})
          </p>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigate('info')}
          className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">
              Pengumuman
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {pengumumanList.length}
            </span>
            <span className="text-xs text-slate-400 dark:text-emerald-400">Rilis</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-emerald-400/80 font-medium mt-2">
            Diterbitkan untuk GTK
          </p>
        </div>
      </div>

      {/* Kalender Akademik & Agenda Kegiatan Madrasah */}
      <KalenderAkademikWidget
        pengumumanList={pengumumanList}
        isAdmin={true}
        onNavigate={onNavigate}
        onOpenPengumumanModal={onOpenPengumumanModal}
      />

      {/* Lower Row: Today's Schedule & Recent Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule in Madrasah */}
        <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800/80">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Jadwal Mengajar Hari Ini ({todayDay})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('jadwal')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayJadwal.length === 0 ? (
            <div className="text-center py-8 text-slate-400 dark:text-emerald-400/70 text-xs">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Tidak ada kegiatan mengajar terjadwal untuk hari {todayDay}.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {todayJadwal.map((j) => (
                <div 
                  key={j.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200/60 dark:border-emerald-800/60 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {j.mapel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold text-[10px]">
                        {j.kelas}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-emerald-300/80">
                      Pengampu: <span className="font-semibold text-slate-700 dark:text-emerald-200">{j.guru}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-emerald-900 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 text-[11px]">
                      {j.jam}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Announcements */}
        <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800/80">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Pengumuman Madrasah Terbaru
              </h3>
            </div>
            <button
              onClick={() => onNavigate('info')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
            >
              <span>Kelola</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {pengumumanList.slice(0, 4).map((ann) => (
              <div 
                key={ann.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border-l-4 border-amber-500 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {ann.judul}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-emerald-400 shrink-0 ml-2">
                    {ann.tanggal}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-300/80 line-clamp-2 leading-relaxed">
                  {ann.isi}
                </p>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Oleh: {ann.penulis || 'Admin Madrasah'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
