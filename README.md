# Tugas Pertemuan 5 - Pemrograman Visual
**Aplikasi Manajemen Tugas Mahasiswa**

Aplikasi mobile sederhana berbasis React Native dan Expo untuk mencatat, mencari, dan mengelola status tugas perkuliahan. Dibuat untuk memenuhi tugas praktikum mata kuliah Pemrograman Visual.

---

## Identitas Mahasiswa
* **Nama:** Mohammad Farhan Pujisatrio
* **NIM:** 14524209
* **Kelas:** TI1
* **Mata Kuliah:** Pemrograman Visual

---

## Fitur Aplikasi
1. **Daftar Tugas:** Menampilkan daftar tugas kuliah menggunakan `FlatList` dengan data awal minimal 5 tugas.
2. **Tambah Tugas:** Form input untuk menambah tugas baru (nama tugas, mata kuliah, deskripsi, deadline). Menggunakan `useRef` untuk auto-focus kembali ke input nama tugas setelah data tersimpan.
3. **Ubah Status Tugas:** Mengubah status antara *Belum Dikerjakan* dan *Selesai*. Tampilan kartu akan berubah warna dan nama tugas dicoret jika sudah selesai.
4. **Hapus Tugas:** Menghapus tugas dari daftar dengan konfirmasi sebelum hapus.
5. **Pencarian:** Pencarian real-time berdasarkan nama tugas atau mata kuliah.
6. **Ringkasan:** Menampilkan ringkasan jumlah total tugas, tugas belum dikerjakan, dan tugas yang sudah selesai.

---

## Penerapan Props dan React Hooks
* **Props:** Digunakan untuk memecah UI menjadi komponen modular. Komponen induk (`src/app/index.tsx`) mengirimkan data dan handler aksi ke komponen anak (`TaskCard`, `TaskForm`, `TaskSummary`, `SearchBar`).
* **useState:**
  * Mengelola nilai input form (`namaTugas`, `mataKuliah`, `deskripsi`, `deadline`).
  * Mengelola state kata kunci pencarian (`keyword`).
* **useEffect:**
  * Memantau perubahan nilai `keyword` pencarian dan mencetaknya ke `console.log()` setiap kali pengguna mengetik.
* **useMemo:**
  * Menghitung kalkulasi jumlah tugas (total, belum selesai, selesai) agar hanya dijalankan ulang ketika data tugas berubah.
  * Memfilter daftar tugas sesuai input pencarian.
* **useCallback:**
  * Mengoptimasi fungsi `tambahTugas`, `hapusTugas`, `ubahStatusTugas`, dan `resetSemuaTugas` agar referensi fungsinya tidak selalu dibuat ulang setiap re-render.
* **useRef:**
  * Menyimpan referensi elemen `TextInput` pada input nama tugas agar kursor langsung fokus kembali ke input tersebut setelah tombol simpan ditekan.
* **useReducer:**
  * Mengelola seluruh operasi data tugas secara terpusat melalui fungsi reducer (`taskReducer`) dengan aksi: `ADD_TASK`, `DELETE_TASK`, `TOGGLE_STATUS`, dan `RESET_TASKS`.

---

## Struktur Folder
```text
manajemen-tugas-mahasiswa/
├── src/
│   ├── app/
│   │   ├── _layout.tsx       # Konfigurasi header Stack navigasi
│   │   └── index.tsx         # Halaman utama (komponen induk)
│   ├── components/
│   │   ├── SearchBar.tsx     # Komponen pencarian tugas
│   │   ├── TaskCard.tsx      # Komponen kartu tugas
│   │   ├── TaskForm.tsx      # Form input tambah tugas
│   │   └── TaskSummary.tsx   # Kartu statistik ringkasan tugas
│   ├── constants/
│   │   └── theme.ts          # Definisi warna dan styling
│   ├── data/
│   │   └── initialTasks.ts   # Data tugas awal & logic taskReducer
│   └── types/
│       └── task.ts           # Tipe data TypeScript
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Cara Menjalankan Proyek

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server Expo:**
   ```bash
   npx expo start
   ```

3. **Buka di perangkat:**
   * Scan QR code menggunakan aplikasi **Expo Go** di HP (Android/iOS).
   * Atau tekan `w` pada terminal untuk membuka via Web Browser.
