# 📱 Aplikasi Manajemen Tugas Mahasiswa

> **Tugas Praktikum Pertemuan 5 - Pemrograman Visual**  
> Dibangun menggunakan **React Native**, **Expo SDK 58**, **Expo Router**, dan **TypeScript**.

Aplikasi mobile ini dirancang untuk membantu mahasiswa mencatat, mengelola, mencari, dan memantau tugas perkuliahan berdasarkan mata kuliah dan status pengerjaannya secara rapi, cepat, dan terstruktur.

---

## 🚀 Fitur Utama Aplikasi

Sesuai dengan ketentuan pada Modul Tugas Pertemuan 5:

1. **Menampilkan Daftar Tugas Perkuliahan (`FlatList`):**
   * Menampilkan data tugas perkuliahan secara efisien dengan performa tinggi menggunakan `FlatList`.
   * Memuat minimal 5 data tugas awal dengan informasi lengkap: *Nama Tugas, Nama Mata Kuliah, Deskripsi Tugas, Tenggat Waktu (Deadline), dan Status Pengerjaan*.

2. **Menambahkan Tugas Baru:**
   * Pengguna dapat menginputkan data tugas baru melalui formulir input.
   * Dilengkapi fitur *auto-focus* kembali ke kolom input nama tugas setelah data tersimpan (`useRef`).
   * Data yang baru ditambahkan langsung muncul secara *real-time* di posisi teratas daftar.

3. **Mengubah Status Tugas:**
   * Memungkinkan pengguna mengubah status tugas dari **Belum Dikerjakan** menjadi **Selesai** (dan sebaliknya).
   * Perbedaan visual yang jelas berdasarkan status:
     * **Selesai:** Kartu berlatar hijau lembut, aksen border hijau, badge hijau dengan ikon centang, dan teks nama tugas dicoret (*strikethrough*).
     * **Belum Dikerjakan:** Aksen border kuning/oranye dengan badge status pending.

4. **Menghapus Tugas:**
   * Pengguna dapat menghapus tugas yang sudah tidak diperlukan dengan konfirmasi dialog agar tidak terhapus secara tidak sengaja.
   * Daftar tugas otomatis diperbarui setelah proses penghapusan.

5. **Pencarian Real-Time:**
   * Fitur pencarian fleksibel berdasarkan **Nama Tugas** maupun **Nama Mata Kuliah**.
   * Daftar tugas langsung terfilter sesuai kata kunci yang dimasukkan.
   * Dilengkapi tombol hapus cepat pencarian (*clear button*).

6. **Ringkasan Aktivitas / Statistik Tugas:**
   * Menampilkan 3 kartu statistik di bagian atas aplikasi:
     * **Total Tugas**
     * **Tugas Belum Selesai**
     * **Tugas Sudah Selesai**
   * Angka statistik diperbarui secara otomatis menggunakan komputasi teroptimasi (`useMemo`).

---

## 🧩 Penerapan Props & React Hooks

Proyek ini mengimplementasikan seluruh konsep state management dan hooks sesuai instruksi modul:

| Konsep / Hook | Implementasi pada Proyek |
| :--- | :--- |
| **Props** | Digunakan untuk mengalirkan data satu arah dari Komponen Induk (`src/app/index.tsx`) ke Komponen Anak (`TaskCard.tsx`, `TaskForm.tsx`, `TaskSummary.tsx`, `SearchBar.tsx`). |
| **`useState`** | 1. Mengelola 4 nilai input formulir: `namaTugas`, `mataKuliah`, `deskripsi`, dan `deadline`.<br>2. Menyimpan dan mengelola teks kata kunci pencarian (`keyword`). |
| **`useEffect`** | Memantau perubahan pada `keyword` pencarian dengan *dependency array* `[keyword]` dan mencatat setiap perubahan melalui `console.log()`. |
| **`useMemo`** | 1. Menghitung ringkasan jumlah tugas (total, belum selesai, selesai) hanya saat data tugas berubah (`[daftarTugas]`).<br>2. Memfilter daftar tugas berdasarkan kata kunci pencarian secara efisien. |
| **`useCallback`** | Membungkus fungsi `tambahTugas`, `hapusTugas`, `ubahStatusTugas`, dan `resetSemuaTugas` agar tidak dibuat ulang pada setiap render, menjaga performa komponen anak. |
| **`useRef`** | Mengakses referensi langsung komponen `TextInput` pada input nama tugas untuk mengembalikan fokus kursor otomatis setelah tugas berhasil disimpan. |
| **`useReducer`** | Mengelola seluruh state daftar tugas secara terpusat dan terprediksi dengan 4 *action types*:<br>• `ADD_TASK`: Menambah tugas baru ke daftar.<br>• `DELETE_TASK`: Menghapus tugas berdasarkan ID.<br>• `TOGGLE_STATUS`: Mengubah status antara 'Belum Dikerjakan' dan 'Selesai'.<br>• `RESET_TASKS`: Menghapus seluruh data tugas. |

---

## 📂 Struktur Direktori Proyek

Arsitektur folder modular disusun rapi sesuai standar pengembangan Expo Router:

```text
manajemen-tugas-mahasiswa/
├── assets/                  # Aset ikon dan splash screen
├── src/
│   ├── app/                 # Halaman & navigasi (Expo Router)
│   │   ├── _layout.tsx      # Konfigurasi Stack Header navigasi
│   │   └── index.tsx        # Komponen Induk (Screen Utama & alur Hooks)
│   ├── components/          # Komponen Anak modular
│   │   ├── TaskCard.tsx     # Komponen kartu tugas (Props & status visual)
│   │   ├── TaskForm.tsx     # Formulir input tugas (useState & useRef)
│   │   ├── TaskSummary.tsx  # Ringkasan statistik tugas (useMemo)
│   │   └── SearchBar.tsx    # Komponen kolom pencarian
│   ├── constants/
│   │   └── theme.ts         # Konstanta tema, warna, jarak, dan bayangan
│   ├── data/
│   │   └── initialTasks.ts  # Data dummy awal (5 tugas) & fungsi taskReducer
│   └── types/
│       └── task.ts          # Definisi tipe data & interface TypeScript
├── app.json                 # Konfigurasi Expo Application
├── package.json             # Daftar pustaka & dependensi proyek
├── tsconfig.json            # Konfigurasi TypeScript & path alias (@/*)
└── README.md                # Dokumentasi proyek
```

---

## 🛠️ Panduan Menjalankan Aplikasi

Pastikan di laptop Anda sudah terinstal **Node.js** (versi 18 ke atas) dan aplikasi **Expo Go** di ponsel Anda.

### 1. Kloning Repositori & Masuk ke Folder Proyek
```bash
git clone https://github.com/username-anda/manajemen-tugas-mahasiswa.git
cd manajemen-tugas-mahasiswa
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npx expo start
```

### 4. Menjalankan di Perangkat:
* **Ponsel Fisik (Android / iOS):** Buka aplikasi **Expo Go**, lalu pindai (*scan*) QR Code yang muncul di terminal VS Code.
* **Web Browser:** Tekan tombol `w` di terminal VS Code untuk membukanya di browser Chrome/Edge.
* **Android Emulator:** Tekan tombol `a` di terminal jika Android Studio emulator sudah terpasang.

---

## 📦 Teknologi & Pustaka

* **Framework:** [React Native](https://reactnative.dev/) (v0.88.1)
* **SDK:** [Expo](https://expo.dev/) (SDK 58)
* **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (v58)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Ikon:** [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons)
* **Safe Area:** `react-native-safe-area-context`

---

*Disusun untuk memenuhi Tugas Pertemuan 5 Mata Kuliah Pemrograman Visual.*
