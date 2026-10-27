import React from 'react';
import { User, ActivePage } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  Calendar, 
  Bell, 
  UserCheck, 
  Lock, 
  RotateCcw,
  Sparkles,
  GraduationCap,
  Building
} from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

interface SidebarProps {
  currentUser: User;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activePage,
  onNavigate,
  onResetData,
}) => {
  const isAdmin = currentUser.role === 'admin';

  const adminMenu = [
    { id: 'dash' as ActivePage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil-madrasah' as ActivePage, label: 'Profil Madrasah', icon: Building },
    { id: 'gtk' as ActivePage, label: 'Data Guru & Staf', icon: Users },
    { id: 'siswa' as ActivePage, label: 'Data Siswa / Murid', icon: GraduationCap },
    { id: 'akun' as ActivePage, label: 'Akun Pengguna', icon: Key },
    { id: 'jadwal' as ActivePage, label: 'Jadwal KBM', icon: Calendar },
    { id: 'info' as ActivePage, label: 'Pengumuman', icon: Bell },
    { id: 'sandi' as ActivePage, label: 'Ganti Password', icon: Lock },
  ];

  const guruMenu = [
    { id: 'dash' as ActivePage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil-madrasah' as ActivePage, label: 'Profil Madrasah', icon: Building },
    { id: 'profil' as ActivePage, label: 'Profil Saya', icon: UserCheck },
    { id: 'jadwal' as ActivePage, label: 'Jadwal Mengajar', icon: Calendar },
    { id: 'info' as ActivePage, label: 'Pengumuman', icon: Bell },
    { id: 'sandi' as ActivePage, label: 'Ganti Password', icon: Lock },
  ];

  const menu = isAdmin ? adminMenu : guruMenu;

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-emerald-950/80 border-r border-emerald-100 dark:border-emerald-900/80 flex flex-col shrink-0 transition-colors">
      {/* Sidebar Header for desktop */}
      <div className="hidden md:block p-5 border-b border-emerald-100 dark:border-emerald-900/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            <img 
              src={MADRASAH_LOGO} 
              alt="Logo MI Darussalam" 
              className="w-11 h-11 max-h-full max-w-full object-contain drop-shadow-xs"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
              MI Darussalam
            </h3>
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              Panel {isAdmin ? 'Administrator' : 'Guru Madrasah'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-3 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap md:w-full ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/30'
                  : 'text-slate-600 dark:text-emerald-200/90 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400 dark:text-emerald-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
