/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, GTK, Pengumuman, Jadwal, Siswa, ProfilMadrasah, ActivePage, Role } from './types';
import { storage } from './services/storage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { DashboardAdmin } from './components/DashboardAdmin';
import { DashboardGuru } from './components/DashboardGuru';
import { DataGtkView } from './components/DataGtkView';
import { DataSiswaView } from './components/DataSiswaView';
import { ProfilMadrasahView } from './components/ProfilMadrasahView';
import { AkunPenggunaView } from './components/AkunPenggunaView';
import { JadwalView } from './components/JadwalView';
import { PengumumanView } from './components/PengumumanView';
import { ProfilGuruView } from './components/ProfilGuruView';
import { GantiPasswordModal } from './components/GantiPasswordModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('mi_darussalam_theme') === 'dark';
  });

  // Auth & Navigation state
  const [currentUser, setCurrentUser] = useState<User | null>(() => storage.getCurrentUser());
  const [activePage, setActivePage] = useState<ActivePage>(() => (currentUser ? 'dash' : 'landing'));
  const [loginError, setLoginError] = useState<string>('');

  // App Data state
  const [gtkList, setGtkList] = useState<GTK[]>(() => storage.getGTKList());
  const [siswaList, setSiswaList] = useState<Siswa[]>(() => storage.getSiswaList());
  const [profilMadrasah, setProfilMadrasah] = useState<ProfilMadrasah>(() => storage.getProfilMadrasah());
  const [usersList, setUsersList] = useState<User[]>(() => storage.getUsersList());
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>(() => storage.getPengumumanList());
  const [jadwalList, setJadwalList] = useState<Jadwal[]>(() => storage.getJadwalList());

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mi_darussalam_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mi_darussalam_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshAllData = () => {
    setGtkList(storage.getGTKList());
    setSiswaList(storage.getSiswaList());
    setProfilMadrasah(storage.getProfilMadrasah());
    setUsersList(storage.getUsersList());
    setPengumumanList(storage.getPengumumanList());
    setJadwalList(storage.getJadwalList());
    const cur = storage.getCurrentUser();
    if (cur) setCurrentUser(cur);
  };

  const handleUpdateProfilMadrasah = (data: Partial<ProfilMadrasah>) => {
    try {
      const updated = storage.updateProfilMadrasah(data);
      setProfilMadrasah(updated);
      addToast('Profil madrasah berhasil diperbarui.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Auth actions
  const handleLogin = (usernameInput: string, passwordInput: string) => {
    setLoginError('');
    try {
      const user = storage.login(usernameInput, passwordInput);
      setCurrentUser(user);
      refreshAllData();
      addToast(`Selamat datang, ${user.nama}!`, 'success');

      if (user.wajib_ganti) {
        setActivePage('sandi');
        addToast('Silakan ubah password akun Anda terlebih dahulu.', 'info');
      } else {
        setActivePage('dash');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login gagal');
    }
  };

  const handleQuickLogin = (username: string) => {
    const presets: Record<string, string> = {
      'misdarussalam22': 'misdarussalam#26',
      'admin': 'misdarussalam#26',
      'siti.rahmah': 'guru12345',
      'ahmad.fauzi': 'guru12345',
      'operator': 'operator123'
    };
    const targetUser = username === 'admin' ? 'misdarussalam22' : username;
    const pass = presets[username] || 'guru12345';
    handleLogin(targetUser, pass);
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setActivePage('landing');
    addToast('Anda telah berhasil keluar.', 'info');
  };

  const handleResetData = () => {
    if (confirm('Kembalikan seluruh data madrasah (GTK, Murid, Jadwal, Pengumuman, Akun) ke data awal percontohan?')) {
      storage.resetToDefault();
      refreshAllData();
      addToast('Data portal telah direset ke setelan awal bawaan.', 'success');
    }
  };

  // GTK CRUD
  const handleAddGtk = (data: Omit<GTK, 'id'>) => {
    try {
      storage.addGTK(data);
      refreshAllData();
      addToast('Data GTK berhasil ditambahkan.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleUpdateGtk = (id: number, data: Partial<GTK>) => {
    try {
      storage.updateGTK(id, data);
      refreshAllData();
      addToast('Data GTK berhasil diperbarui.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleDeleteGtk = (id: number) => {
    try {
      storage.deleteGTK(id);
      refreshAllData();
      addToast('Data GTK dan jadwal terkait telah dihapus.', 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // SISWA CRUD
  const handleAddSiswa = (data: Omit<Siswa, 'id'>) => {
    try {
      storage.addSiswa(data);
      refreshAllData();
      addToast(`Data murid ${data.nama} berhasil ditambahkan.`, 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleUpdateSiswa = (id: number, data: Partial<Siswa>) => {
    try {
      storage.updateSiswa(id, data);
      refreshAllData();
      addToast('Data murid berhasil diperbarui.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleDeleteSiswa = (id: number) => {
    try {
      storage.deleteSiswa(id);
      refreshAllData();
      addToast('Data murid telah dihapus.', 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Users Management
  const handleAddUser = (data: { username: string; password: string; role: Role; gtk_id?: number | null; nama?: string }) => {
    try {
      storage.addUser(data);
      refreshAllData();
      addToast(`Akun pengguna @${data.username} berhasil dibuat.`, 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const handleResetUserPassword = (id: number, newPass: string) => {
    try {
      storage.resetUserPassword(id, newPass);
      refreshAllData();
      addToast('Password pengguna berhasil direset.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleToggleUserActive = (id: number, active: boolean) => {
    try {
      storage.toggleUserActive(id, active, currentUser?.id);
      refreshAllData();
      addToast(`Status akun telah ${active ? 'diaktifkan' : 'dinonaktifkan'}.`, 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Jadwal CRUD
  const handleAddJadwal = (data: Omit<Jadwal, 'id' | 'guru'>) => {
    try {
      storage.addJadwal(data);
      refreshAllData();
      addToast('Jadwal pelajaran berhasil ditambahkan.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleDeleteJadwal = (id: number) => {
    try {
      storage.deleteJadwal(id);
      refreshAllData();
      addToast('Jadwal pelajaran berhasil dihapus.', 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Pengumuman CRUD
  const handleAddPengumuman = (data: { 
    judul: string; 
    isi: string; 
    kategori?: Pengumuman['kategori']; 
    penulis?: string;
    tanggalKegiatan?: string;
  }) => {
    try {
      storage.addPengumuman(data);
      refreshAllData();
      addToast('Pengumuman resmi & agenda berhasil diterbitkan.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleDeletePengumuman = (id: number) => {
    try {
      storage.deletePengumuman(id);
      refreshAllData();
      addToast('Pengumuman telah dihapus.', 'info');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Profil Guru
  const handleSaveGuruProfil = (data: { nama: string; nuptk: string; hp: string; mapel: string; email?: string; pendidikan?: string }) => {
    if (!currentUser || !currentUser.gtk_id) {
      addToast('Akun ini belum dihubungkan dengan data GTK.', 'error');
      return;
    }
    try {
      storage.updateGuruProfil(currentUser.gtk_id, data);
      refreshAllData();
      addToast('Profil mandiri berhasil diperbarui.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  // Ganti Password Mandiri
  const handleGantiPassword = (lama: string, baru: string) => {
    if (!currentUser) return;
    try {
      storage.changePassword(currentUser.id, lama, baru);
      refreshAllData();
      addToast('Password Anda berhasil diganti.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  // GTK for currently logged in teacher
  const currentGtk = currentUser?.gtk_id ? gtkList.find((g) => g.id === currentUser.gtk_id) : undefined;
  const teacherJadwal = currentUser?.gtk_id ? jadwalList.filter((j) => j.gtk_id === currentUser.gtk_id) : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-emerald-100 flex flex-col font-sans transition-colors">
      <Navbar
        currentUser={currentUser}
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      {!currentUser ? (
        activePage === 'login' ? (
          <LoginPage
            onLogin={handleLogin}
            onBackToHome={() => setActivePage('landing')}
            errorMessage={loginError}
          />
        ) : activePage === 'profil-madrasah' ? (
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex-1">
            <button
              onClick={() => setActivePage('landing')}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-white dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 cursor-pointer shadow-xs transition-colors"
            >
              ← Kembali ke Beranda
            </button>
            <ProfilMadrasahView
              profil={profilMadrasah}
              isAdmin={false}
              onUpdateProfil={handleUpdateProfilMadrasah}
            />
          </div>
        ) : (
          <LandingPage
            stats={storage.getStats()}
            pengumumanList={pengumumanList}
            onNavigate={setActivePage}
          />
        )
      ) : (
        /* Authenticated Portal Layout */
        <div className="flex-1 flex flex-col md:flex-row">
          <Sidebar
            currentUser={currentUser}
            activePage={activePage}
            onNavigate={setActivePage}
            onResetData={handleResetData}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activePage === 'dash' && (
              currentUser.role === 'admin' ? (
                <DashboardAdmin
                  currentUser={currentUser}
                  gtkList={gtkList}
                  usersList={usersList}
                  pengumumanList={pengumumanList}
                  jadwalList={jadwalList}
                  siswaCount={siswaList.length}
                  onNavigate={setActivePage}
                  onOpenGtkModal={() => setActivePage('gtk')}
                  onOpenJadwalModal={() => setActivePage('jadwal')}
                  onOpenPengumumanModal={() => setActivePage('info')}
                />
              ) : (
                <DashboardGuru
                  currentUser={currentUser}
                  gtkData={currentGtk}
                  jadwalSaya={teacherJadwal}
                  pengumumanList={pengumumanList}
                  onNavigate={setActivePage}
                />
              )
            )}

            {activePage === 'profil-madrasah' && (
              <ProfilMadrasahView
                profil={profilMadrasah}
                isAdmin={currentUser.role === 'admin'}
                onUpdateProfil={handleUpdateProfilMadrasah}
              />
            )}

            {activePage === 'gtk' && currentUser.role === 'admin' && (
              <DataGtkView
                gtkList={gtkList}
                isAdmin={currentUser.role === 'admin'}
                onAddGtk={handleAddGtk}
                onUpdateGtk={handleUpdateGtk}
                onDeleteGtk={handleDeleteGtk}
              />
            )}

            {activePage === 'siswa' && currentUser.role === 'admin' && (
              <DataSiswaView
                siswaList={siswaList}
                onAddSiswa={handleAddSiswa}
                onUpdateSiswa={handleUpdateSiswa}
                onDeleteSiswa={handleDeleteSiswa}
              />
            )}

            {activePage === 'akun' && currentUser.role === 'admin' && (
              <AkunPenggunaView
                usersList={usersList}
                gtkList={gtkList}
                currentUserId={currentUser.id}
                onAddUser={handleAddUser}
                onResetPassword={handleResetUserPassword}
                onToggleActive={handleToggleUserActive}
              />
            )}

            {activePage === 'jadwal' && (
              <JadwalView
                jadwalList={currentUser.role === 'guru' ? teacherJadwal : jadwalList}
                gtkList={gtkList}
                isAdmin={currentUser.role === 'admin'}
                onAddJadwal={handleAddJadwal}
                onDeleteJadwal={handleDeleteJadwal}
                filterTeacherName={currentUser.role === 'guru' ? currentUser.nama : undefined}
              />
            )}

            {activePage === 'info' && (
              <PengumumanView
                pengumumanList={pengumumanList}
                isAdmin={currentUser.role === 'admin'}
                onAddPengumuman={handleAddPengumuman}
                onDeletePengumuman={handleDeletePengumuman}
                authorName={currentUser.nama}
              />
            )}

            {activePage === 'profil' && (
              <ProfilGuruView
                currentUser={currentUser}
                gtkData={currentGtk}
                onSaveProfil={handleSaveGuruProfil}
              />
            )}

            {activePage === 'sandi' && (
              <GantiPasswordModal
                wajibGanti={currentUser.wajib_ganti}
                onGantiPassword={handleGantiPassword}
                onSuccessDone={() => setActivePage('dash')}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
