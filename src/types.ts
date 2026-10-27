export type Role = 'admin' | 'guru';

export type StatusKepegawaian = 'PNS' | 'GTY' | 'GTT' | 'PTT';

export type HariSekolah = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';

export interface GTK {
  id: number;
  nama: string;
  nuptk: string;
  jabatan: string;
  status: StatusKepegawaian;
  hp: string;
  mapel: string;
  email?: string;
  pendidikan?: string;
  tmt?: string; // Terhitung Mulai Tanggal
  foto?: string;
}

export interface User {
  id: number;
  username: string;
  role: Role;
  nama: string;
  gtk_id: number | null;
  aktif: boolean;
  wajib_ganti: boolean;
  dibuat: string;
  password_hash?: string;
  gtk_nama?: string;
}

export interface Pengumuman {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  tanggalKegiatan?: string; // Tanggal kegiatan/acara (format YYYY-MM-DD)
  kategori?: 'Penting' | 'Kedinasan' | 'Kurikulum' | 'Kegiatan' | 'Umum';
  penulis?: string;
}

export interface KaldikEvent {
  id: string;
  judul: string;
  kategori: 'Kurikulum' | 'Kedinasan' | 'Kegiatan' | 'Libur' | 'Ujian';
  tanggalMulai: string; // YYYY-MM-DD
  tanggalSelesai?: string; // YYYY-MM-DD (opsional jika beberapa hari)
  keterangan: string;
  semester: 'Ganjil' | 'Genap';
  sumber: 'kaldik' | 'pengumuman';
  pengumumanId?: number;
}

export interface Jadwal {
  id: number;
  gtk_id: number;
  hari: HariSekolah;
  jam: string;
  mapel: string;
  kelas: string;
  guru?: string;
}

export interface Siswa {
  id: number;
  nisn: string;
  nis: string;
  nama: string;
  kelas: string; // 'Kelas 1' to 'Kelas 6'
  jenisKelamin: 'L' | 'P';
  tempatLahir?: string;
  tanggalLahir?: string;
  namaWali: string;
  hpWali: string;
  alamat: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus';
}

export interface ProfilMadrasah {
  nama: string;
  nsm: string;
  npsn: string;
  akreditasi: string;
  status: string;
  tahunBerdiri: string;
  kurikulum: string;
  kepalaMadrasah: string;
  ketuaKomite: string;
  visi: string;
  misi: string[];
  tujuan: string[];
  alamat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  sarana: string[];
}

export type ActivePage = 'landing' | 'login' | 'dash' | 'gtk' | 'siswa' | 'profil-madrasah' | 'akun' | 'jadwal' | 'info' | 'profil' | 'sandi';
