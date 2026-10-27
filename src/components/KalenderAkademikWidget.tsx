import React, { useState, useMemo } from 'react';
import { Pengumuman, KaldikEvent, ActivePage } from '../types';
import { 
  getUpcomingEvents, 
  getMergedKaldikEvents, 
  formatTanggalIndo, 
  formatRentangTanggal 
} from '../services/kaldik';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  BookOpen, 
  Clock, 
  CalendarDays, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Flag,
  Coffee
} from 'lucide-react';

interface KalenderAkademikWidgetProps {
  pengumumanList: Pengumuman[];
  isAdmin?: boolean;
  onNavigate?: (page: ActivePage) => void;
  onOpenPengumumanModal?: () => void;
}

export const KalenderAkademikWidget: React.FC<KalenderAkademikWidgetProps> = ({
  pengumumanList,
  isAdmin = false,
  onNavigate,
  onOpenPengumumanModal,
}) => {
  // Current view month & year (based on current date or October 2026)
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const [viewDate, setViewDate] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr);
  const [filterSource, setFilterSource] = useState<'all' | 'pengumuman' | 'kaldik' | 'ujian' | 'libur'>('all');

  // Merged events
  const allEvents = useMemo(() => getMergedKaldikEvents(pengumumanList), [pengumumanList]);
  
  // Upcoming events
  const upcomingEvents = useMemo(() => {
    const events = getUpcomingEvents(pengumumanList, todayStr);
    if (filterSource === 'all') return events;
    if (filterSource === 'pengumuman') return events.filter(e => e.sumber === 'pengumuman');
    if (filterSource === 'kaldik') return events.filter(e => e.sumber === 'kaldik');
    if (filterSource === 'ujian') return events.filter(e => e.kategori === 'Ujian');
    if (filterSource === 'libur') return events.filter(e => e.kategori === 'Libur');
    return events;
  }, [pengumumanList, todayStr, filterSource]);

  // Calendar month data
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth(); // 0-indexed

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleTodayMonth = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(todayStr);
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Ahad/Minggu
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      events: KaldikEvent[];
    }> = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevM = currentMonth === 0 ? 12 : currentMonth;
      const prevY = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevY}-${String(prevM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        events: []
      });
    }

    // Current month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      // Find matching events
      const dayEvents = allEvents.filter(ev => {
        if (!ev.tanggalSelesai) {
          return ev.tanggalMulai === dateStr;
        }
        return dateStr >= ev.tanggalMulai && dateStr <= ev.tanggalSelesai;
      });

      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        events: dayEvents
      });
    }

    // Next month padding to fill complete grid (multiples of 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextM = currentMonth === 11 ? 1 : currentMonth + 2;
      const nextY = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextY}-${String(nextM).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        events: []
      });
    }

    return days;
  }, [currentYear, currentMonth, todayStr, allEvents]);

  // Selected date events
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return allEvents.filter(ev => {
      if (!ev.tanggalSelesai) {
        return ev.tanggalMulai === selectedDate;
      }
      return selectedDate >= ev.tanggalMulai && selectedDate <= ev.tanggalSelesai;
    });
  }, [selectedDate, allEvents]);

  const getEventBadgeColor = (kat: KaldikEvent['kategori']) => {
    switch (kat) {
      case 'Ujian':
        return {
          bg: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300 dark:border-amber-700',
          dot: 'bg-amber-500',
          icon: <BookOpen className="w-3.5 h-3.5" />
        };
      case 'Libur':
        return {
          bg: 'bg-red-100 text-red-900 dark:bg-red-900/60 dark:text-red-200 border-red-300 dark:border-red-700',
          dot: 'bg-red-500',
          icon: <Coffee className="w-3.5 h-3.5" />
        };
      case 'Kedinasan':
        return {
          bg: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200 border-blue-300 dark:border-blue-700',
          dot: 'bg-blue-500',
          icon: <Flag className="w-3.5 h-3.5" />
        };
      case 'Kurikulum':
        return {
          bg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
          dot: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
      default:
        return {
          bg: 'bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200 border-purple-300 dark:border-purple-700',
          dot: 'bg-purple-500',
          icon: <Sparkles className="w-3.5 h-3.5" />
        };
    }
  };

  return (
    <div className="bg-white dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-emerald-800/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-700">
            <CalendarDays className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Kaldik Resmi Kemenag & Agenda Madrasah</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Kalender Akademik & Agenda Kegiatan
          </h3>
          <p className="text-xs text-slate-500 dark:text-emerald-300/80 max-w-2xl">
            Menampilkan kegiatan madrasah yang akan datang berdasarkan data pengumuman internal dan kalender pendidikan resmi MI Darussalam.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterSource('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterSource === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
            }`}
          >
            Semua ({allEvents.length})
          </button>
          <button
            onClick={() => setFilterSource('pengumuman')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterSource === 'pengumuman'
                ? 'bg-amber-500 text-emerald-950 shadow-xs'
                : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
            }`}
          >
            <Bell className="w-3 h-3" />
            <span>Dari Pengumuman ({pengumumanList.length})</span>
          </button>
          <button
            onClick={() => setFilterSource('ujian')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterSource === 'ujian'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
            }`}
          >
            Ujian / Asesmen
          </button>
          <button
            onClick={() => setFilterSource('libur')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterSource === 'libur'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'
            }`}
          >
            Libur Resmi
          </button>

          {isAdmin && onOpenPengumumanModal && (
            <button
              onClick={onOpenPengumumanModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors ml-auto sm:ml-0"
              title="Tambah agenda pengumuman baru"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Kegiatan</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Visual Monthly Calendar + Upcoming Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Mini Calendar Grid (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/70 dark:border-emerald-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
          {/* Calendar Header with Month Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={handleTodayMonth}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-slate-100"
              >
                Hari Ini
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-800 text-slate-600 dark:text-emerald-200 transition-colors"
                title="Bulan sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-800 text-slate-600 dark:text-emerald-200 transition-colors"
                title="Bulan berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 dark:text-emerald-400/80 pb-1">
            <span className="text-red-500 font-extrabold">Ahad</span>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Jum</span>
            <span>Sab</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarDays.map((day, idx) => {
              const isSelected = selectedDate === day.dateStr;
              const hasEvents = day.events.length > 0;
              const hasExam = day.events.some(e => e.kategori === 'Ujian');
              const hasHoliday = day.events.some(e => e.kategori === 'Libur');
              const hasAnn = day.events.some(e => e.sumber === 'pengumuman');

              return (
                <button
                  key={`${day.dateStr}-${idx}`}
                  onClick={() => setSelectedDate(day.dateStr)}
                  className={`min-h-[46px] p-1 rounded-xl text-center flex flex-col items-center justify-between transition-all cursor-pointer relative ${
                    !day.isCurrentMonth
                      ? 'text-slate-300 dark:text-emerald-800/60 opacity-40 hover:opacity-80'
                      : isSelected
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30 scale-105 font-bold z-10'
                      : day.isToday
                      ? 'bg-emerald-100/90 dark:bg-emerald-800/80 text-emerald-900 dark:text-emerald-100 font-extrabold border border-emerald-400 dark:border-emerald-500'
                      : 'hover:bg-white dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-200'
                  }`}
                >
                  <span className="text-xs">{day.dayNumber}</span>

                  {/* Indicator Dots */}
                  <div className="flex items-center justify-center gap-0.5 mt-0.5 h-2">
                    {hasEvents && (
                      <>
                        <span 
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected 
                              ? 'bg-amber-300' 
                              : hasHoliday 
                              ? 'bg-red-500' 
                              : hasExam 
                              ? 'bg-amber-500' 
                              : hasAnn 
                              ? 'bg-purple-500' 
                              : 'bg-emerald-500'
                          }`} 
                        />
                        {day.events.length > 1 && (
                          <span 
                            className={`w-1 h-1 rounded-full ${
                              isSelected ? 'bg-white' : 'bg-blue-400'
                            }`} 
                          />
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date Details Box */}
          {selectedDate && (
            <div className="pt-3 border-t border-slate-200/80 dark:border-emerald-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Agenda {formatTanggalIndo(selectedDate)}</span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-emerald-400 font-semibold">
                  {selectedDateEvents.length} kegiatan
                </span>
              </div>

              {selectedDateEvents.length === 0 ? (
                <div className="p-3 rounded-xl bg-white/70 dark:bg-emerald-950/60 border border-dashed border-slate-200 dark:border-emerald-800 text-center text-xs text-slate-400 dark:text-emerald-400/80">
                  Tidak ada agenda khusus pada tanggal ini.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {selectedDateEvents.map(ev => {
                    const badge = getEventBadgeColor(ev.kategori);
                    return (
                      <div
                        key={ev.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {ev.judul}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold shrink-0 ${badge.bg}`}>
                            {ev.kategori}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-emerald-300/80 line-clamp-2">
                          {ev.keterangan}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Events Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Daftar Kegiatan Mendatang Sesuai Kaldik
              </h4>
            </div>
            <span className="text-xs text-slate-400 dark:text-emerald-400 font-medium">
              {upcomingEvents.length} Kegiatan Terjadwal
            </span>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 dark:bg-emerald-950/30 rounded-2xl border border-dashed border-slate-200 dark:border-emerald-800 text-slate-400 dark:text-emerald-400/80">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">Tidak Ada Kegiatan yang Sesuai</p>
              <p className="text-xs mt-1">Coba ubah filter kategori atau tambahkan pengumuman baru.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {upcomingEvents.map((ev) => {
                const badge = getEventBadgeColor(ev.kategori);
                const isSelected = selectedDate === ev.tanggalMulai;
                const dateDisplay = formatRentangTanggal(ev.tanggalMulai, ev.tanggalSelesai);

                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedDate(ev.tanggalMulai)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-900/60 border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-emerald-950/50 border-slate-200/70 dark:border-emerald-800/60 hover:border-emerald-400 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Countdown Badge */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                          ev.hariLagi <= 0
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : ev.hariLagi <= 3
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-100 dark:bg-emerald-900 text-slate-700 dark:text-emerald-200'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{ev.labelHari}</span>
                        </span>

                        {/* Category Pill */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badge.bg}`}>
                          {badge.icon}
                          <span>{ev.kategori}</span>
                        </span>

                        {/* Source Tag */}
                        {ev.sumber === 'pengumuman' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                            <Bell className="w-3 h-3" />
                            <span>Pengumuman</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Kaldik Kemenag
                          </span>
                        )}
                      </div>

                      {/* Date Range formatted */}
                      <span className="text-xs font-bold text-slate-600 dark:text-emerald-300 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{dateDisplay}</span>
                      </span>
                    </div>

                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {ev.judul}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-emerald-200/90 leading-relaxed mt-1 line-clamp-2">
                      {ev.keterangan}
                    </p>

                    {/* Bottom footer if from announcement */}
                    {ev.sumber === 'pengumuman' && onNavigate && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-emerald-800/60 flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('info');
                          }}
                          className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
                        >
                          <span>Buka di Papan Pengumuman</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
