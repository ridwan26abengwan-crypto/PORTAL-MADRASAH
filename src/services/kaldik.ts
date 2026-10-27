import { Pengumuman, KaldikEvent } from '../types';

export const OFFICIAL_KALDIK_EVENTS: KaldikEvent[] = [
  // Semester Ganjil 2026/2027
  {
    id: 'kaldik-1',
    judul: 'Upacara Hari Sumpah Pemuda Ke-98',
    kategori: 'Kegiatan',
    tanggalMulai: '2026-10-28',
    keterangan: 'Peringatan Hari Sumpah Pemuda seluruh dewan guru dan santri MI Darussalam di halaman madrasah.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-2',
    judul: 'Peringatan Hari Pahlawan & Da\'i Cilik',
    kategori: 'Kegiatan',
    tanggalMulai: '2026-11-10',
    keterangan: 'Apel bendera dan pentas kreasi santri MI Darussalam memperingati jasa pahlawan.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-3',
    judul: 'Peringatan Hari Guru Nasional (HGN) & Kemenag',
    kategori: 'Kedinasan',
    tanggalMulai: '2026-11-25',
    keterangan: 'Tasyakuran Hari Guru Nasional dan pembinaan dewan asatidz oleh KKM MI Kecamatan Ciasem.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-4',
    judul: 'Asesmen Sumatif Akhir Semester (ASAS) Ganjil',
    kategori: 'Ujian',
    tanggalMulai: '2026-11-30',
    tanggalSelesai: '2026-12-10',
    keterangan: 'Pelaksanaan ujian akhir semester ganjil untuk seluruh siswa Kelas 1 sampai dengan Kelas 6.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-5',
    judul: 'Remedial, Pengolahan Nilai & Class Meeting Santri',
    kategori: 'Kurikulum',
    tanggalMulai: '2026-12-11',
    tanggalSelesai: '2026-12-17',
    keterangan: 'Penyusunan Rapor Digital Madrasah (RDM) dan perlombaan olahraga serta seni antarkelas.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-6',
    judul: 'Pembagian Buku Rapor Semester Ganjil TP 2026/2027',
    kategori: 'Kurikulum',
    tanggalMulai: '2026-12-19',
    keterangan: 'Pemberian hasil belajar santri kepada orang tua/wali murid di ruang kelas masing-masing.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-7',
    judul: 'Libur Pembelajaran Semester Ganjil',
    kategori: 'Libur',
    tanggalMulai: '2026-12-21',
    tanggalSelesai: '2027-01-02',
    keterangan: 'Libur resmi akhir semester ganjil bagi seluruh peserta didik MI Darussalam.',
    semester: 'Ganjil',
    sumber: 'kaldik'
  },

  // Semester Genap 2026/2027
  {
    id: 'kaldik-8',
    judul: 'Hari Amal Bhakti (HAB) Kementerian Agama RI Ke-81',
    kategori: 'Kedinasan',
    tanggalMulai: '2027-01-03',
    keterangan: 'Upacara peringatan Hari Amal Bhakti Kemenag tingkat Kantor Kemenag Kabupaten Subang.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-9',
    judul: 'Hari Pertama Masuk KBM Semester Genap',
    kategori: 'Kurikulum',
    tanggalMulai: '2027-01-04',
    keterangan: 'Awal kegiatan belajar mengajar semester genap Tahun Ajaran 2026/2027.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-10',
    judul: 'Peringatan Isra Mi\'raj Nabi Muhammad SAW 1448 H',
    kategori: 'Kegiatan',
    tanggalMulai: '2027-01-16',
    keterangan: 'Pengajian akbar dan tabligh akbar keluarga besar MI Darussalam Pinangsari.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-11',
    judul: 'Penilaian Tengah Semester (PTS/ASTS) Genap',
    kategori: 'Ujian',
    tanggalMulai: '2027-03-08',
    tanggalSelesai: '2027-03-13',
    keterangan: 'Evaluasi tengah semester genap kelas 1 s.d kelas 6.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-12',
    judul: 'Perkiraan Libur Awal Ramadhan 1448 H & Pesantren Kilat',
    kategori: 'Kegiatan',
    tanggalMulai: '2027-03-22',
    tanggalSelesai: '2027-03-27',
    keterangan: 'Kegiatan Sanlat Ramadhan, tadarus Al-Qur\'an, dan pendalaman fiqih puasa santri.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-13',
    judul: 'Libur Hari Raya Idul Fitri 1448 H',
    kategori: 'Libur',
    tanggalMulai: '2027-04-05',
    tanggalSelesai: '2027-04-17',
    keterangan: 'Libur bersama hari raya Idul Fitri 1448 H sesuai ketetapan pemerintah.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-14',
    judul: 'Asesmen Madrasah (AM) Utama Siswa Kelas 6',
    kategori: 'Ujian',
    tanggalMulai: '2027-04-26',
    tanggalSelesai: '2027-05-04',
    keterangan: 'Ujian kelulusan akhir bagi seluruh santri kelas 6 MI Darussalam.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-15',
    judul: 'Asesmen Akhir Tahun (AAT/PAT) Kelas 1 - 5',
    kategori: 'Ujian',
    tanggalMulai: '2027-06-07',
    tanggalSelesai: '2027-06-16',
    keterangan: 'Ujian kenaikan kelas tahun ajaran 2026/2027.',
    semester: 'Genap',
    sumber: 'kaldik'
  },
  {
    id: 'kaldik-16',
    judul: 'Pembagian Rapor Semester Genap & Wisuda Santri Kelas 6',
    kategori: 'Kurikulum',
    tanggalMulai: '2027-06-26',
    keterangan: 'Pelepasan siswa-siswi kelas 6 dan penyerahan buku rapor kenaikan kelas 1-5.',
    semester: 'Genap',
    sumber: 'kaldik'
  }
];

export function mapPengumumanCategoryToKaldik(kat?: string): KaldikEvent['kategori'] {
  switch (kat) {
    case 'Kurikulum':
      return 'Kurikulum';
    case 'Kedinasan':
      return 'Kedinasan';
    case 'Kegiatan':
      return 'Kegiatan';
    case 'Penting':
      return 'Ujian';
    default:
      return 'Kegiatan';
  }
}

/**
 * Menggabungkan agenda Kaldik Kemenag dengan agenda dari daftar Pengumuman
 */
export function getMergedKaldikEvents(pengumumanList: Pengumuman[]): KaldikEvent[] {
  const events: KaldikEvent[] = [...OFFICIAL_KALDIK_EVENTS];

  pengumumanList.forEach((p) => {
    // Tanggal kegiatan diambil dari p.tanggalKegiatan jika ada, atau p.tanggal
    const eventDate = p.tanggalKegiatan || p.tanggal;
    if (!eventDate) return;

    // Tentukan semester
    const month = parseInt(eventDate.split('-')[1] || '1', 10);
    const semester: 'Ganjil' | 'Genap' = month >= 7 && month <= 12 ? 'Ganjil' : 'Genap';

    events.push({
      id: `ann-${p.id}`,
      judul: p.judul,
      kategori: mapPengumumanCategoryToKaldik(p.kategori),
      tanggalMulai: eventDate,
      keterangan: p.isi,
      semester,
      sumber: 'pengumuman',
      pengumumanId: p.id
    });
  });

  // Urutkan berdasarkan tanggalMulai (dari yang terdekat)
  return events.sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai));
}

/**
 * Dapatkan agenda madrasah mendatang (mulai hari ini ke depan)
 */
export function getUpcomingEvents(
  pengumumanList: Pengumuman[],
  referenceDateStr?: string
): Array<KaldikEvent & { hariLagi: number; labelHari: string }> {
  const allEvents = getMergedKaldikEvents(pengumumanList);
  
  // Tanggal acuan (default hari ini)
  const now = referenceDateStr ? new Date(referenceDateStr) : new Date();
  now.setHours(0, 0, 0, 0);

  const results: Array<KaldikEvent & { hariLagi: number; labelHari: string }> = [];

  for (const ev of allEvents) {
    // Gunakan tanggal selesai jika ada untuk mengecek apakah kegiatan masih berlangsung
    const checkDateStr = ev.tanggalSelesai || ev.tanggalMulai;
    const evEndDate = new Date(checkDateStr);
    evEndDate.setHours(23, 59, 59, 999);

    const evStartDate = new Date(ev.tanggalMulai);
    evStartDate.setHours(0, 0, 0, 0);

    // Hitung selisih hari dari startDate
    const diffTime = evStartDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Jika acara belum selesai (end date >= now)
    if (evEndDate.getTime() >= now.getTime()) {
      let labelHari = '';
      if (diffDays <= 0) {
        labelHari = 'Sedang Berlangsung / Hari Ini';
      } else if (diffDays === 1) {
        labelHari = 'Besok';
      } else if (diffDays <= 7) {
        labelHari = `${diffDays} hari lagi`;
      } else if (diffDays <= 30) {
        const weeks = Math.round(diffDays / 7);
        labelHari = `${diffDays} hari lagi (~${weeks} pekan)`;
      } else {
        const months = Math.round(diffDays / 30);
        labelHari = `${diffDays} hari lagi (~${months} bln)`;
      }

      results.push({
        ...ev,
        hariLagi: diffDays,
        labelHari
      });
    }
  }

  return results.sort((a, b) => a.hariLagi - b.hariLagi);
}

/**
 * Format tanggal Indonesia (contoh: "28 Oktober 2026")
 */
export function formatTanggalIndo(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      return `${day} ${months[monthIdx]} ${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Helper format rentang tanggal
 */
export function formatRentangTanggal(mulai: string, selesai?: string): string {
  if (!selesai || mulai === selesai) {
    return formatTanggalIndo(mulai);
  }
  const partsMulai = mulai.split('-');
  const partsSelesai = selesai.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  if (partsMulai[0] === partsSelesai[0] && partsMulai[1] === partsSelesai[1]) {
    // Bulan dan tahun sama: "30 Nov - 10 Des 2026"
    return `${parseInt(partsMulai[2], 10)} - ${parseInt(partsSelesai[2], 10)} ${months[parseInt(partsMulai[1], 10) - 1]} ${partsMulai[0]}`;
  }

  return `${parseInt(partsMulai[2], 10)} ${months[parseInt(partsMulai[1], 10) - 1]} - ${parseInt(partsSelesai[2], 10)} ${months[parseInt(partsSelesai[1], 10) - 1]} ${partsSelesai[0]}`;
}
