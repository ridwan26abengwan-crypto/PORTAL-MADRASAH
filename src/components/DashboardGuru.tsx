import React from 'react';
import { User, GTK, Pengumuman, Jadwal, ActivePage } from '../types';
import { 
  Calendar, 
  Clock, 
  Bell, 
  UserCheck, 
  BookOpen, 
  Award, 
  Phone, 
  Mail, 
  ChevronRight, 
  Sparkles,
  School,
  ExternalLink
} from 'lucide-react';
import { KalenderAkademikWidget } from './KalenderAkademikWidget';

interface DashboardGuruProps {
  currentUser: User;
  gtkData: GTK | undefined;
  jadwalSaya: Jadwal[];
  pengumumanList: Pengumuman[];
  onNavigate: (page: ActivePage) => void;
}

export const DashboardGuru: React.FC<DashboardGuruProps> = ({
  currentUser,
  gtkData,
  jadwalSaya,
  pengumumanList,
  onNavigate,
}) => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayDay = days[new Date().getDay()];
  const todaySchedule = jadwalSaya.filter(j => j.hari === todayDay);

  return (
    <div className="space-y-6">
      {/* Personalized Greeting Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white p-6 sm:p-8 shadow-lg shadow-emerald-950/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-amber-300 text-xs font-bold border border-emerald-600/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal MI Darussalam</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Assalamu’alaikum wr. wb., <br className="sm:hidden" />
            <span className="text-amber-300">{currentUser.nama}</span>
          </h2>
          <p className="text-emerald-100 text-sm max-w-xl leading-relaxed">
            Selamat datang di panel guru madrasah. Pastikan kehadiran mengajar, agenda KBM, dan kelengkapan administrasi Anda selalu terbarui.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-3">
            <button
              onClick={() => onNavigate('jadwal')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-sm transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Lihat Jadwal Mengajar</span>
            </button>
            <button
              onClick={() => onNavigate('profil')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Perbarui Profil Mandiri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kalender Akademik & Agenda Madrasah */}
      <KalenderAkademikWidget
        pengumumanList={pengumumanList}
        isAdmin={false}
        onNavigate={onNavigate}
      />

      {/* Grid: Today's Schedule & Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Schedule (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Jadwal Mengajar Anda Hari Ini ({todayDay})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('jadwal')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
              >
                <span>Lihat Jadwal Mingguan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {todaySchedule.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 dark:bg-emerald-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-emerald-800">
                <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-700 dark:text-emerald-200">
                  Tidak Ada Jadwal Mengajar Hari Ini
                </h4>
                <p className="text-xs text-slate-500 dark:text-emerald-400/80 mt-1">
                  Hari {todayDay} Anda tidak memiliki jam tatap muka di kelas. Gunakan waktu untuk persiapan materi atau administrasi guru.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaySchedule.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/80 hover:border-emerald-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center text-sm shrink-0">
                        {j.kelas.replace(/Kelas\s*/i, 'K-')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {j.mapel}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold">
                            {j.kelas}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-0.5">
                          Madrasah Ibtidaiyah Darussalam
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-700 font-mono font-bold text-emerald-800 dark:text-emerald-200 text-xs shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{j.jam}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Announcements for Teachers */}
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-800/80">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Pengumuman Resmi Madrasah
                </h3>
              </div>
              <button
                onClick={() => onNavigate('info')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {pengumumanList.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border-l-4 border-amber-500 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.judul}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-emerald-400">
                      {item.tanggal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-emerald-300/80 leading-relaxed">
                    {item.isi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Teacher Profile Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="text-center pb-4 border-b border-slate-100 dark:border-emerald-800/80 space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-amber-300 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                {currentUser.nama.charAt(0)}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {currentUser.nama}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  {gtkData?.jabatan || 'Guru Madrasah'}
                </p>
                <div className="inline-block mt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold">
                    Status: {gtkData?.status || 'GTY'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300/80">NUPTK:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-emerald-100">
                  {gtkData?.nuptk || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300/80">No. WhatsApp/HP:</span>
                <span className="font-semibold text-slate-800 dark:text-emerald-100">
                  {gtkData?.hp || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-emerald-800/60">
                <span className="text-slate-500 dark:text-emerald-300/80">Mapel Diampu:</span>
                <span className="font-semibold text-slate-800 dark:text-emerald-100 text-right">
                  {gtkData?.mapel || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 dark:text-emerald-300/80">Total Jam Mengajar:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  {jadwalSaya.length} Sesi / Pekan
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profil')}
              className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold border border-emerald-200 dark:border-emerald-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Kelola Profil Saya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
