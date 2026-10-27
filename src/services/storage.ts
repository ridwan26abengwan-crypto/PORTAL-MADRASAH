import { GTK, User, Pengumuman, Jadwal, Siswa, ProfilMadrasah, HariSekolah } from '../types';

export const MADRASAH_LOGO = '/assets/aistudio/download_d7f0092f.png';

const STORAGE_KEYS = {
  GTK: 'mi_darussalam_gtk_v3',
  USERS: 'mi_darussalam_users_v3',
  SISWA: 'mi_darussalam_siswa_v3',
  PROFIL_MADRASAH: 'mi_darussalam_profil_madrasah_v3',
  PENGUMUMAN: 'mi_darussalam_pengumuman_v3',
  JADWAL: 'mi_darussalam_jadwal_v3',
  CURRENT_USER: 'mi_darussalam_current_user_v3',
  THEME: 'mi_darussalam_theme'
};

// Seed GTK
const INITIAL_GTK: GTK[] = [
  {
    id: 1,
    nama: 'Drs. H. Ahmad Sanusi, M.Pd.I',
    nuptk: '197405121998031002',
    jabatan: 'Kepala Madrasah',
    status: 'PNS',
    hp: '081223456789',
    mapel: 'Al-Qur\'an Hadits & Manajerial',
    email: 'ahmad.sanusi@madrasah.kemenag.go.id',
    pendidikan: 'S2 Manajemen Pendidikan Islam (UIN SGD)',
    tmt: '2010-07-01'
  },
  {
    id: 2,
    nama: 'Siti Rahmah, S.Pd.I',
    nuptk: '4532761662210032',
    jabatan: 'Wali Kelas VI / Guru Kelas',
    status: 'GTY',
    hp: '081398765432',
    mapel: 'Tematik Kelas 6, Akidah Akhlak',
    email: 'siti.rahmah@darussalam.sch.id',
    pendidikan: 'S1 PGMI (IAIN Cirebon)',
    tmt: '2015-08-15'
  },
  {
    id: 3,
    nama: 'Ahmad Fauzi, S.Pd',
    nuptk: '8745763665130093',
    jabatan: 'Wali Kelas IV / Guru Kelas',
    status: 'GTT',
    hp: '085712348899',
    mapel: 'Matematika & IPAS Kelas 4',
    email: 'ahmad.fauzi@darussalam.sch.id',
    pendidikan: 'S1 Pendidikan Matematika (UPI)',
    tmt: '2019-01-10'
  },
  {
    id: 4,
    nama: 'Nurhayati, S.Pd',
    nuptk: '2145759660220044',
    jabatan: 'Wali Kelas III / Guru Kelas',
    status: 'GTY',
    hp: '082144556677',
    mapel: 'Bahasa Indonesia & Seni Rupa',
    email: 'nurhayati@darussalam.sch.id',
    pendidikan: 'S1 PGMI',
    tmt: '2016-07-20'
  },
  {
    id: 5,
    nama: 'Ust. Muhammad Ridwan, S.Ag',
    nuptk: '6358760662200051',
    jabatan: 'Guru Mata Pelajaran Agama',
    status: 'GTY',
    hp: '081311223344',
    mapel: 'Fiqih & Bahasa Arab',
    email: 'm.ridwan@darussalam.sch.id',
    pendidikan: 'S1 Syariah (UIN Syarif Hidayatullah)',
    tmt: '2014-03-01'
  },
  {
    id: 6,
    nama: 'Hendri Permana, S.Pd',
    nuptk: '3942765666130082',
    jabatan: 'Guru PJOK & Pembina Pramuka',
    status: 'GTT',
    hp: '087799887766',
    mapel: 'Pendidikan Jasmani & Olahraga',
    email: 'hendri.p@darussalam.sch.id',
    pendidikan: 'S1 PJKR (STKIP Subang)',
    tmt: '2020-09-01'
  },
  {
    id: 7,
    nama: 'Dewi Sartika, S.Pd',
    nuptk: '7821764665220090',
    jabatan: 'Guru Bahasa Inggris & SBdP',
    status: 'GTT',
    hp: '085233445566',
    mapel: 'Bahasa Inggris',
    email: 'dewi.sartika@darussalam.sch.id',
    pendidikan: 'S1 Pendidikan Bahasa Inggris (UNSIKA)',
    tmt: '2021-08-01'
  },
  {
    id: 8,
    nama: 'Irfan Maulana, S.Kom',
    nuptk: '-',
    jabatan: 'Tenaga Administrasi & Operator Madrasah',
    status: 'PTT',
    hp: '089677889900',
    mapel: 'Operator EMIS 4.0, Simpatika & RDM',
    email: 'operator@darussalam.sch.id',
    pendidikan: 'S1 Teknik Informatika (Universitas Subang)',
    tmt: '2018-02-15'
  }
];

// Seed Users - Admin credentials updated to misdarussalam22 / misdarussalam#26
const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'misdarussalam22',
    role: 'admin',
    nama: 'Administrator Madrasah',
    gtk_id: null,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-01-01',
    password_hash: 'misdarussalam#26'
  },
  {
    id: 2,
    username: 'siti.rahmah',
    role: 'guru',
    nama: 'Siti Rahmah, S.Pd.I',
    gtk_id: 2,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-02-01',
    password_hash: 'guru12345'
  },
  {
    id: 3,
    username: 'ahmad.fauzi',
    role: 'guru',
    nama: 'Ahmad Fauzi, S.Pd',
    gtk_id: 3,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-02-10',
    password_hash: 'guru12345'
  },
  {
    id: 4,
    username: 'nurhayati',
    role: 'guru',
    nama: 'Nurhayati, S.Pd',
    gtk_id: 4,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-03-01',
    password_hash: 'guru12345'
  },
  {
    id: 5,
    username: 'm.ridwan',
    role: 'guru',
    nama: 'Ust. Muhammad Ridwan, S.Ag',
    gtk_id: 5,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-03-15',
    password_hash: 'guru12345'
  },
  {
    id: 6,
    username: 'operator',
    role: 'admin',
    nama: 'Irfan Maulana, S.Kom',
    gtk_id: 8,
    aktif: true,
    wajib_ganti: false,
    dibuat: '2024-01-15',
    password_hash: 'operator123'
  }
];

// Seed Siswa / Murid MI Darussalam
const INITIAL_SISWA: Siswa[] = [
  {
    id: 1,
    nisn: '0123847591',
    nis: '2021001',
    nama: 'Muhammad Al-Fatih',
    kelas: 'Kelas 6',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2014-04-12',
    namaWali: 'H. Sudirman',
    hpWali: '081388776655',
    alamat: 'Dusun Sukamaju RT 03/RW 01, Desa Pinangsari, Ciasem',
    status: 'Aktif'
  },
  {
    id: 2,
    nisn: '0123984712',
    nis: '2021002',
    nama: 'Aisyah Putri Azzahra',
    kelas: 'Kelas 6',
    jenisKelamin: 'P',
    tempatLahir: 'Subang',
    tanggalLahir: '2014-08-23',
    namaWali: 'Umar Bakri',
    hpWali: '081299884433',
    alamat: 'Dusun Pinangjaya RT 01/RW 02, Desa Pinangsari, Ciasem',
    status: 'Aktif'
  },
  {
    id: 3,
    nisn: '0134762910',
    nis: '2022015',
    nama: 'Rizky Ramadhan',
    kelas: 'Kelas 5',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2015-06-18',
    namaWali: 'Bambang Irawan',
    hpWali: '085712345678',
    alamat: 'Jl. Rawasari RT 05/RW 02, Desa Pinangsari, Ciasem',
    status: 'Aktif'
  },
  {
    id: 4,
    nisn: '0135892143',
    nis: '2022016',
    nama: 'Fatimah Zahra Salsabila',
    kelas: 'Kelas 5',
    jenisKelamin: 'P',
    tempatLahir: 'Purwakarta',
    tanggalLahir: '2015-09-05',
    namaWali: 'Drs. H. Mulyadi',
    hpWali: '082144558899',
    alamat: 'Kp. Karanganyar RT 02/RW 03, Ciasem, Subang',
    status: 'Aktif'
  },
  {
    id: 5,
    nisn: '0146781290',
    nis: '2023021',
    nama: 'Bilal Habibi',
    kelas: 'Kelas 4',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2016-02-14',
    namaWali: 'Asep Saepudin',
    hpWali: '087812349988',
    alamat: 'Dusun Sukamaju RT 04/RW 01, Desa Pinangsari',
    status: 'Aktif'
  },
  {
    id: 6,
    nisn: '0147983210',
    nis: '2023022',
    nama: 'Nadhira Nur Annisa',
    kelas: 'Kelas 4',
    jenisKelamin: 'P',
    tempatLahir: 'Subang',
    tanggalLahir: '2016-05-30',
    namaWali: 'Dedi Kurniawan',
    hpWali: '081399887711',
    alamat: 'Dusun Pinangsari Tengah RT 02/RW 01',
    status: 'Aktif'
  },
  {
    id: 7,
    nisn: '0158912340',
    nis: '2024031',
    nama: 'Zaid bin Tsabit',
    kelas: 'Kelas 3',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2017-03-21',
    namaWali: 'Lukman Hakim',
    hpWali: '085233441122',
    alamat: 'Dusun Sukamaju RT 01/RW 01, Desa Pinangsari',
    status: 'Aktif'
  },
  {
    id: 8,
    nisn: '0159123847',
    nis: '2024032',
    nama: 'Maryam Khairunnisa',
    kelas: 'Kelas 3',
    jenisKelamin: 'P',
    tempatLahir: 'Subang',
    tanggalLahir: '2017-07-11',
    namaWali: 'Hasan Basri',
    hpWali: '081277665544',
    alamat: 'Kp. Babakan RT 03/RW 02, Desa Pinangsari',
    status: 'Aktif'
  },
  {
    id: 9,
    nisn: '0161234890',
    nis: '2025041',
    nama: 'Hamzah Asadullah',
    kelas: 'Kelas 2',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2018-01-19',
    namaWali: 'Agus Salim',
    hpWali: '089655443322',
    alamat: 'Dusun Pinangjaya RT 02/RW 02, Pinangsari',
    status: 'Aktif'
  },
  {
    id: 10,
    nisn: '0162345901',
    nis: '2025042',
    nama: 'Salma Syafira',
    kelas: 'Kelas 2',
    jenisKelamin: 'P',
    tempatLahir: 'Subang',
    tanggalLahir: '2018-06-25',
    namaWali: 'Supriyanto',
    hpWali: '087788992233',
    alamat: 'Kp. Pasir Honje RT 01/RW 03, Ciasem',
    status: 'Aktif'
  },
  {
    id: 11,
    nisn: '0173456012',
    nis: '2026051',
    nama: 'Kenzi Arkananta',
    kelas: 'Kelas 1',
    jenisKelamin: 'L',
    tempatLahir: 'Subang',
    tanggalLahir: '2019-04-09',
    namaWali: 'Hendrik',
    hpWali: '082133221100',
    alamat: 'Dusun Sukamaju RT 02/RW 01, Pinangsari',
    status: 'Aktif'
  },
  {
    id: 12,
    nisn: '0174567123',
    nis: '2026052',
    nama: 'Zahra Humaira',
    kelas: 'Kelas 1',
    jenisKelamin: 'P',
    tempatLahir: 'Subang',
    tanggalLahir: '2019-10-15',
    namaWali: 'Wahyudin',
    hpWali: '085788991122',
    alamat: 'Dusun Pinangsari RT 01/RW 01, Ciasem',
    status: 'Aktif'
  }
];

// Seed Pengumuman
const INITIAL_PENGUMUMAN: Pengumuman[] = [
  {
    id: 1,
    judul: 'Persiapan Asesmen Madrasah (AM) Tahun Ajaran 2026/2027',
    isi: 'Diberitahukan kepada seluruh dewan guru kelas 6 untuk segera menyerahkan kisi-kisi dan naskah soal Asesmen Madrasah paling lambat hari Jumat ke bagian Kurikulum.',
    tanggal: '2026-10-24',
    tanggalKegiatan: '2026-10-30',
    kategori: 'Kurikulum',
    penulis: 'Kepala Madrasah'
  },
  {
    id: 2,
    judul: 'Verifikasi Data EMIS 4.0 dan Validasi Simpatika Semester Ganjil',
    isi: 'Bapak/Ibu GTK diharapkan memeriksa kembali jam mengajar mingguan dan keaktifan pada portal Simpatika dan EMIS melalui operator madrasah (Pak Irfan) sebelum batas cut-off Kemenag.',
    tanggal: '2026-10-20',
    tanggalKegiatan: '2026-11-05',
    kategori: 'Kedinasan',
    penulis: 'Operator Madrasah'
  },
  {
    id: 3,
    judul: 'Pembiasaan Sholat Dhuha Berjamaah & Tahfidz Pagi',
    isi: 'Seluruh guru piket dimohon mendampingi santri di musholla madrasah mulai pukul 06.50 WIB. Kegiatan dilanjutkan murojaah juz 30 hingga jam pertama dimulai.',
    tanggal: '2026-10-18',
    tanggalKegiatan: '2026-10-28',
    kategori: 'Kegiatan',
    penulis: 'Kesiswaan'
  },
  {
    id: 4,
    judul: 'Rapat Evaluasi Bulanan Dewan Guru dan Staf',
    isi: 'Rapat dinas rutin bulanan akan dilaksanakan pada Sabtu pekan ini pukul 12.30 WIB (setelah sholat Dzuhur berjamaah) di ruang guru MI Darussalam.',
    tanggal: '2026-10-15',
    tanggalKegiatan: '2026-10-31',
    kategori: 'Penting',
    penulis: 'Tata Usaha'
  }
];

// Seed Jadwal
const INITIAL_JADWAL: Jadwal[] = [
  { id: 1, gtk_id: 2, hari: 'Senin', jam: '07.30 - 08.40', mapel: 'Tematik (Bahasa Indonesia)', kelas: 'Kelas 6' },
  { id: 2, gtk_id: 2, hari: 'Senin', jam: '08.40 - 09.50', mapel: 'Akidah Akhlak', kelas: 'Kelas 6' },
  { id: 3, gtk_id: 3, hari: 'Senin', jam: '07.30 - 08.40', mapel: 'Matematika', kelas: 'Kelas 4' },
  { id: 4, gtk_id: 5, hari: 'Senin', jam: '10.15 - 11.25', mapel: 'Fiqih Ibadah', kelas: 'Kelas 5' },
  { id: 5, gtk_id: 6, hari: 'Senin', jam: '08.40 - 09.50', mapel: 'PJOK', kelas: 'Kelas 3' },
  
  { id: 6, gtk_id: 2, hari: 'Selasa', jam: '07.15 - 08.25', mapel: 'Tematik (IPA)', kelas: 'Kelas 6' },
  { id: 7, gtk_id: 4, hari: 'Selasa', jam: '07.15 - 08.25', mapel: 'Bahasa Indonesia', kelas: 'Kelas 3' },
  { id: 8, gtk_id: 5, hari: 'Selasa', jam: '08.45 - 09.55', mapel: 'Bahasa Arab', kelas: 'Kelas 4' },
  { id: 9, gtk_id: 7, hari: 'Selasa', jam: '10.15 - 11.25', mapel: 'Bahasa Inggris', kelas: 'Kelas 5' },
  
  { id: 10, gtk_id: 3, hari: 'Rabu', jam: '07.15 - 08.25', mapel: 'IPAS (Sains)', kelas: 'Kelas 4' },
  { id: 11, gtk_id: 2, hari: 'Rabu', jam: '08.45 - 09.55', mapel: 'Matematika Terapan', kelas: 'Kelas 6' },
  { id: 12, gtk_id: 5, hari: 'Rabu', jam: '07.15 - 08.25', mapel: 'Al-Qur\'an Hadits', kelas: 'Kelas 3' },
  { id: 13, gtk_id: 6, hari: 'Rabu', jam: '10.15 - 11.25', mapel: 'PJOK', kelas: 'Kelas 4' },

  { id: 14, gtk_id: 4, hari: 'Kamis', jam: '07.15 - 08.25', mapel: 'Seni Rupa & Prakarya', kelas: 'Kelas 3' },
  { id: 15, gtk_id: 2, hari: 'Kamis', jam: '08.45 - 09.55', mapel: 'Pendidikan Pancasila', kelas: 'Kelas 6' },
  { id: 16, gtk_id: 7, hari: 'Kamis', jam: '07.15 - 08.25', mapel: 'Bahasa Inggris', kelas: 'Kelas 6' },
  { id: 17, gtk_id: 3, hari: 'Kamis', jam: '10.15 - 11.25', mapel: 'Pendidikan Pancasila', kelas: 'Kelas 4' },

  { id: 18, gtk_id: 5, hari: 'Jumat', jam: '07.15 - 08.15', mapel: 'Tadarus & Fiqih Praktis', kelas: 'Kelas 6' },
  { id: 19, gtk_id: 2, hari: 'Jumat', jam: '08.30 - 09.30', mapel: 'Literasi & Numerasi', kelas: 'Kelas 6' },
  { id: 20, gtk_id: 4, hari: 'Jumat', jam: '07.15 - 08.15', mapel: 'Tahfidz Juz 30', kelas: 'Kelas 3' },

  { id: 21, gtk_id: 6, hari: 'Sabtu', jam: '07.30 - 09.00', mapel: 'Pramuka Siaga & Penggalang', kelas: 'Semua Kelas' },
  { id: 22, gtk_id: 2, hari: 'Sabtu', jam: '09.30 - 11.00', mapel: 'Pengembangan Diri & Ekskul', kelas: 'Kelas 6' }
];

class StorageService {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  public init() {
    if (!localStorage.getItem(STORAGE_KEYS.GTK)) {
      this.set(STORAGE_KEYS.GTK, INITIAL_GTK);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SISWA)) {
      this.set(STORAGE_KEYS.SISWA, INITIAL_SISWA);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PENGUMUMAN)) {
      this.set(STORAGE_KEYS.PENGUMUMAN, INITIAL_PENGUMUMAN);
    }
    if (!localStorage.getItem(STORAGE_KEYS.JADWAL)) {
      this.set(STORAGE_KEYS.JADWAL, INITIAL_JADWAL);
    }

    // Ensure admin has misdarussalam22 / misdarussalam#26
    const users = this.getUsersList();
    const hasNewAdmin = users.some(u => u.username === 'misdarussalam22');
    if (!hasNewAdmin) {
      const adminIdx = users.findIndex(u => u.role === 'admin' && (u.username === 'admin' || u.id === 1));
      if (adminIdx !== -1) {
        users[adminIdx].username = 'misdarussalam22';
        users[adminIdx].password_hash = 'misdarussalam#26';
        users[adminIdx].nama = 'Administrator Madrasah';
      } else {
        users.unshift({
          id: 1,
          username: 'misdarussalam22',
          role: 'admin',
          nama: 'Administrator Madrasah',
          gtk_id: null,
          aktif: true,
          wajib_ganti: false,
          dibuat: '2024-01-01',
          password_hash: 'misdarussalam#26'
        });
      }
      this.set(STORAGE_KEYS.USERS, users);
    }
  }

  public resetToDefault() {
    this.set(STORAGE_KEYS.GTK, INITIAL_GTK);
    this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    this.set(STORAGE_KEYS.SISWA, INITIAL_SISWA);
    this.set(STORAGE_KEYS.PENGUMUMAN, INITIAL_PENGUMUMAN);
    this.set(STORAGE_KEYS.JADWAL, INITIAL_JADWAL);
  }

  // --- STATS ---
  public getStats() {
    const gtk = this.getGTKList();
    const ann = this.getPengumumanList();
    const users = this.getUsersList();
    const siswa = this.getSiswaList();
    const guru = gtk.filter(g => /guru/i.test(g.jabatan)).length;
    return {
      gtkCount: gtk.length,
      guruCount: guru,
      pengumumanCount: ann.length,
      usersCount: users.filter(u => u.aktif).length,
      siswaCount: siswa.length,
      rombelCount: 6
    };
  }

  // --- CURRENT USER & AUTH ---
  public getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  public login(usernameInput: string, passwordInput: string): User {
    const username = usernameInput.trim().toLowerCase();
    const password = passwordInput.trim();

    const users = this.getUsersList();
    const user = users.find(u => u.username.toLowerCase() === username);

    if (!user) {
      throw new Error('Username atau password salah');
    }
    if (!user.aktif) {
      throw new Error('Akun Anda dinonaktifkan oleh administrator madrasah');
    }
    if (user.password_hash !== password) {
      throw new Error('Username atau password salah');
    }

    // Attach gtk_nama if linked
    if (user.gtk_id) {
      const g = this.getGTKById(user.gtk_id);
      if (g) user.gtk_nama = g.nama;
    }

    this.set(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  public changePassword(userId: number, lama: string, baru: string): void {
    const users = this.getUsersList();
    const userIdx = users.findIndex(u => u.id === userId);
    if (userIdx === -1) throw new Error('Pengguna tidak ditemukan');

    if (users[userIdx].password_hash !== lama) {
      throw new Error('Password lama tidak cocok');
    }
    if (baru.length < 8) {
      throw new Error('Password baru minimal 8 karakter');
    }

    users[userIdx].password_hash = baru;
    users[userIdx].wajib_ganti = false;
    this.set(STORAGE_KEYS.USERS, users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.wajib_ganti = false;
      this.set(STORAGE_KEYS.CURRENT_USER, currentUser);
    }
  }

  // --- GTK ---
  public getGTKList(): GTK[] {
    return this.get<GTK[]>(STORAGE_KEYS.GTK, INITIAL_GTK);
  }

  public getGTKById(id: number): GTK | undefined {
    return this.getGTKList().find(g => g.id === id);
  }

  public addGTK(data: Omit<GTK, 'id'>): GTK {
    const list = this.getGTKList();
    const newId = list.length > 0 ? Math.max(...list.map(g => g.id)) + 1 : 1;
    const newGtk: GTK = { ...data, id: newId };
    list.push(newGtk);
    this.set(STORAGE_KEYS.GTK, list);
    return newGtk;
  }

  public updateGTK(id: number, data: Partial<GTK>): GTK {
    const list = this.getGTKList();
    const idx = list.findIndex(g => g.id === id);
    if (idx === -1) throw new Error('Data GTK tidak ditemukan');

    list[idx] = { ...list[idx], ...data };
    this.set(STORAGE_KEYS.GTK, list);

    // Sync user display name if linked
    const users = this.getUsersList();
    users.forEach(u => {
      if (u.gtk_id === id && data.nama) {
        u.nama = data.nama;
      }
    });
    this.set(STORAGE_KEYS.USERS, users);

    // Sync currentUser display name if matches
    const cur = this.getCurrentUser();
    if (cur && cur.gtk_id === id && data.nama) {
      cur.nama = data.nama;
      this.set(STORAGE_KEYS.CURRENT_USER, cur);
    }

    return list[idx];
  }

  public deleteGTK(id: number): void {
    const list = this.getGTKList().filter(g => g.id !== id);
    this.set(STORAGE_KEYS.GTK, list);

    const jadwal = this.getJadwalList().filter(j => j.gtk_id !== id);
    this.set(STORAGE_KEYS.JADWAL, jadwal);

    const users = this.getUsersList();
    users.forEach(u => {
      if (u.gtk_id === id) {
        u.gtk_id = null;
      }
    });
    this.set(STORAGE_KEYS.USERS, users);
  }

  // --- SISWA / MURID ---
  public getSiswaList(): Siswa[] {
    return this.get<Siswa[]>(STORAGE_KEYS.SISWA, INITIAL_SISWA);
  }

  public getSiswaById(id: number): Siswa | undefined {
    return this.getSiswaList().find(s => s.id === id);
  }

  public addSiswa(data: Omit<Siswa, 'id'>): Siswa {
    const list = this.getSiswaList();
    const newId = list.length > 0 ? Math.max(...list.map(s => s.id)) + 1 : 1;
    const newSiswa: Siswa = { ...data, id: newId };
    list.push(newSiswa);
    this.set(STORAGE_KEYS.SISWA, list);
    return newSiswa;
  }

  public updateSiswa(id: number, data: Partial<Siswa>): Siswa {
    const list = this.getSiswaList();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Data siswa tidak ditemukan');

    list[idx] = { ...list[idx], ...data };
    this.set(STORAGE_KEYS.SISWA, list);
    return list[idx];
  }

  public deleteSiswa(id: number): void {
    const list = this.getSiswaList().filter(s => s.id !== id);
    this.set(STORAGE_KEYS.SISWA, list);
  }

  // --- USERS ---
  public getUsersList(): User[] {
    const users = this.get<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const gtks = this.getGTKList();
    return users.map(u => {
      const g = u.gtk_id ? gtks.find(x => x.id === u.gtk_id) : null;
      return {
        ...u,
        gtk_nama: g ? g.nama : undefined
      };
    });
  }

  public addUser(data: { username: string; password: string; role: 'admin' | 'guru'; gtk_id?: number | null; nama?: string }): User {
    const username = data.username.trim().toLowerCase();
    if (!/^[a-z0-9._#-]{3,50}$/.test(username)) {
      throw new Error('Username harus 3-50 karakter (huruf kecil, angka, titik, strip, pagar)');
    }
    if (data.password.length < 8) {
      throw new Error('Password minimal 8 karakter');
    }

    const users = this.getUsersList();
    if (users.some(u => u.username.toLowerCase() === username)) {
      throw new Error('Username sudah digunakan');
    }

    let nama = data.nama?.trim() || '';
    if (data.gtk_id) {
      const g = this.getGTKById(data.gtk_id);
      if (g) {
        nama = nama || g.nama;
      }
    }
    if (!nama) {
      nama = username;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const newUser: User = {
      id: newId,
      username,
      role: data.role,
      nama,
      gtk_id: data.gtk_id || null,
      aktif: true,
      wajib_ganti: true,
      dibuat: today,
      password_hash: data.password
    };

    users.push(newUser);
    this.set(STORAGE_KEYS.USERS, users);
    return newUser;
  }

  public resetUserPassword(id: number, newPass: string): void {
    if (newPass.length < 8) {
      throw new Error('Password baru minimal 8 karakter');
    }
    const users = this.getUsersList();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('Pengguna tidak ditemukan');

    users[idx].password_hash = newPass;
    users[idx].wajib_ganti = true;
    this.set(STORAGE_KEYS.USERS, users);
  }

  public toggleUserActive(id: number, active: boolean, currentUserId?: number): void {
    if (id === currentUserId) {
      throw new Error('Anda tidak dapat menonaktifkan akun sendiri');
    }
    const users = this.getUsersList();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('Pengguna tidak ditemukan');

    users[idx].aktif = active;
    this.set(STORAGE_KEYS.USERS, users);
  }

  // --- JADWAL ---
  public getJadwalList(gtkIdFilter?: number | null): Jadwal[] {
    const list = this.get<Jadwal[]>(STORAGE_KEYS.JADWAL, INITIAL_JADWAL);
    const gtks = this.getGTKList();
    
    const dayOrder: Record<HariSekolah, number> = {
      Senin: 1,
      Selasa: 2,
      Rabu: 3,
      Kamis: 4,
      Jumat: 5,
      Sabtu: 6
    };

    const enriched = list.map(j => {
      const g = gtks.find(x => x.id === j.gtk_id);
      return {
        ...j,
        guru: g ? g.nama : 'Guru'
      };
    }).sort((a, b) => {
      const dayDiff = (dayOrder[a.hari] || 99) - (dayOrder[b.hari] || 99);
      if (dayDiff !== 0) return dayDiff;
      return a.jam.localeCompare(b.jam);
    });

    if (gtkIdFilter) {
      return enriched.filter(j => j.gtk_id === gtkIdFilter);
    }
    return enriched;
  }

  public addJadwal(data: Omit<Jadwal, 'id' | 'guru'>): Jadwal {
    const list = this.get<Jadwal[]>(STORAGE_KEYS.JADWAL, INITIAL_JADWAL);
    const newId = list.length > 0 ? Math.max(...list.map(j => j.id)) + 1 : 1;
    const newJadwal: Jadwal = { ...data, id: newId };
    list.push(newJadwal);
    this.set(STORAGE_KEYS.JADWAL, list);
    return newJadwal;
  }

  public deleteJadwal(id: number): void {
    const list = this.get<Jadwal[]>(STORAGE_KEYS.JADWAL, INITIAL_JADWAL).filter(j => j.id !== id);
    this.set(STORAGE_KEYS.JADWAL, list);
  }

  // --- PENGUMUMAN ---
  public getPengumumanList(): Pengumuman[] {
    return this.get<Pengumuman[]>(STORAGE_KEYS.PENGUMUMAN, INITIAL_PENGUMUMAN)
      .sort((a, b) => b.id - a.id);
  }

  public addPengumuman(data: { 
    judul: string; 
    isi: string; 
    kategori?: Pengumuman['kategori']; 
    penulis?: string;
    tanggalKegiatan?: string;
  }): Pengumuman {
    if (!data.judul.trim()) {
      throw new Error('Judul pengumuman wajib diisi');
    }
    const list = this.getPengumumanList();
    const newId = list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const newAnn: Pengumuman = {
      id: newId,
      judul: data.judul.trim(),
      isi: data.isi.trim(),
      tanggal: today,
      tanggalKegiatan: data.tanggalKegiatan || undefined,
      kategori: data.kategori || 'Umum',
      penulis: data.penulis || 'Admin Madrasah'
    };
    list.unshift(newAnn);
    this.set(STORAGE_KEYS.PENGUMUMAN, list);
    return newAnn;
  }

  public deletePengumuman(id: number): void {
    const list = this.getPengumumanList().filter(p => p.id !== id);
    this.set(STORAGE_KEYS.PENGUMUMAN, list);
  }

  // --- PROFIL GURU ---
  public updateGuruProfil(gtkId: number, data: { nama: string; nuptk: string; hp: string; mapel: string; email?: string; pendidikan?: string }) {
    if (!data.nama.trim()) throw new Error('Nama wajib diisi');
    return this.updateGTK(gtkId, data);
  }

  // --- PROFIL MADRASAH ---
  public getProfilMadrasah(): ProfilMadrasah {
    return this.get<ProfilMadrasah>(STORAGE_KEYS.PROFIL_MADRASAH, INITIAL_PROFIL_MADRASAH);
  }

  public updateProfilMadrasah(data: Partial<ProfilMadrasah>): ProfilMadrasah {
    const current = this.getProfilMadrasah();
    const updated = { ...current, ...data };
    this.set(STORAGE_KEYS.PROFIL_MADRASAH, updated);
    return updated;
  }
}

const INITIAL_PROFIL_MADRASAH: ProfilMadrasah = {
  nama: 'MI Darussalam Pinangsari',
  nsm: '111232130142',
  npsn: '60728914',
  akreditasi: 'B (Baik) - BAN-S/M',
  status: 'Swasta (Yayasan Darussalam)',
  tahunBerdiri: '1985',
  kurikulum: 'Kurikulum Merdeka & Kemenag RI',
  kepalaMadrasah: 'Drs. H. Ahmad Sanusi, M.Pd.I',
  ketuaKomite: 'H. Mulyadi',
  visi: 'Terwujudnya Generasi Santri yang Berakhlakul Karimah, Unggul dalam Prestasi, Mandiri, dan Berwawasan Lingkungan yang Berlandaskan Nilai-Nilai Islam Aswaja.',
  misi: [
    'Menyelenggarakan pendidikan dasar Islam yang memadukan kurikulum nasional dan nilai-nilai keagamaan aswaja.',
    'Membiasakan pengamalan ibadah yaumiyah santri seperti sholat dhuha, sholat dzuhur berjamaah, dan tahfidz juz 30.',
    'Menumbuhkan dan mengasah potensi kecerdasan intelektual, emosional, dan spiritual santri.',
    'Mengembangkan minat, bakat, serta kreativitas santri melalui kegiatan kepanduan pramuka, kesenian Islam, dan olahraga.',
    'Mewujudkan tata kelola madrasah yang akuntabel, transparan, dan terintegrasi dengan sistem digital Kementerian Agama.'
  ],
  tujuan: [
    'Mencetak lulusan yang hafal juz 30 dan tartil membaca Al-Qur\'an.',
    'Mempersiapkan santri berprestasi untuk melanjutkan ke jenjang MTs/SMP unggulan.',
    'Membentuk pribadi santri yang disiplin, jujur, sopan, dan berbakti kepada orang tua dan guru.'
  ],
  alamat: 'Dusun Sukamaju RT 02 / RW 01',
  desa: 'Desa Pinangsari',
  kecamatan: 'Kecamatan Ciasem',
  kabupaten: 'Kabupaten Subang',
  provinsi: 'Jawa Barat',
  kodePos: '41256',
  telepon: '0812-2345-6789',
  email: 'midarussalam.pinangsari@gmail.com',
  sarana: [
    'Ruang Kelas Belajar (Kelas 1 s/d 6)',
    'Musholla Madrasah Darussalam',
    'Ruang Dewan Guru & Kepala Madrasah',
    'Perpustakaan & Pojok Literasi',
    'Lapangan Upacara & Olahraga Santri',
    'Sanitasi & Tempat Wudhu Terpisah'
  ]
};

export const storage = new StorageService();
storage.init();
