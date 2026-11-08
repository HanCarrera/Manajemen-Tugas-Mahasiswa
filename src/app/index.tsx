import React, { useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { warna, jarak } from '@/constants/theme';
import { DataTugasAwal, taskReducer } from '@/data/initialTasks';
import { TaskTypes } from '@/types/task';
import TaskSummary from '@/components/TaskSummary';
import TaskForm from '@/components/TaskForm';
import SearchBar from '@/components/SearchBar';
import TaskCard from '@/components/TaskCard';

export default function Index() {
  // 1. useReducer untuk mengelola perubahan data daftar tugas (ADD_TASK, DELETE_TASK, TOGGLE_STATUS, RESET_TASKS)
  const [daftarTugas, dispatch] = useReducer(taskReducer, DataTugasAwal);

  // 2. useState untuk menyimpan keyword pencarian
  const [keyword, setKeyword] = useState<string>('');

  // 3. useEffect untuk memantau perubahan keyword pencarian dan mencetak ke console.log()
  useEffect(() => {
    console.log('Keyword pencarian berubah:', keyword);
  }, [keyword]);

  // 4. useMemo untuk menghitung jumlah tugas selesai dan belum selesai (hanya dihitung ulang saat data tugas berubah)
  const ringkasan = useMemo(() => {
    const total = daftarTugas.length;
    const belumSelesai = daftarTugas.filter((t) => t.status === 'Belum Dikerjakan').length;
    const selesai = daftarTugas.filter((t) => t.status === 'Selesai').length;
    return { total, belumSelesai, selesai };
  }, [daftarTugas]);

  // Pencarian tugas: Filter berdasarkan nama tugas atau nama mata kuliah
  const tugasTerfilter = useMemo(() => {
    const kunci = keyword.trim().toLowerCase();
    if (!kunci) return daftarTugas;
    return daftarTugas.filter(
      (t) =>
        t.namaTugas.toLowerCase().includes(kunci) ||
        t.mataKuliah.toLowerCase().includes(kunci)
    );
  }, [daftarTugas, keyword]);

  // 5. useCallback untuk mengelola fungsi tambah, hapus, ubah status, dan reset tugas
  const tambahTugas = useCallback((tugasBaru: TaskTypes) => {
    dispatch({ type: 'ADD_TASK', payload: tugasBaru });
  }, []);

  const hapusTugas = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const ubahStatusTugas = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: id });
  }, []);

  const resetSemuaTugas = useCallback(() => {
    dispatch({ type: 'RESET_TASKS' });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar style="dark" />

      <FlatList
        data={tugasTerfilter}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.kontenList}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Banner Sambutan / Header Aplikasi */}
            <View style={styles.headerHero}>
              <View>
                <Text style={styles.teksSapaan}>Halo, Mahasiswa! 👋</Text>
                <Text style={styles.subSapaan}>Kelola dan selesaikan tugasmu tepat waktu.</Text>
              </View>
            </View>

            {/* Komponen Ringkasan Tugas (Props: total, belumSelesai, selesai) */}
            <TaskSummary
              total={ringkasan.total}
              belumSelesai={ringkasan.belumSelesai}
              selesai={ringkasan.selesai}
            />

            {/* Komponen Form Input Tugas (useState & useRef) */}
            <TaskForm onAddTask={tambahTugas} onResetTasks={resetSemuaTugas} />

            {/* Komponen Pencarian Tugas (useState & useEffect) */}
            <SearchBar value={keyword} onChangeText={setKeyword} />

            {/* Baris Judul Bagian Daftar Tugas */}
            <View style={styles.barisJudulDaftar}>
              <View style={styles.judulKiri}>
                <Ionicons name="list" size={18} color={warna.primer} />
                <Text style={styles.judulDaftar}>Daftar Tugas Kuliah</Text>
              </View>
              <View style={styles.badgeJumlah}>
                <Text style={styles.teksJumlah}>
                  {tugasTerfilter.length} / {daftarTugas.length}
                </Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          // Komponen Anak: TaskCard menerima Props dari Komponen Induk
          <TaskCard
            id={item.id}
            namaTugas={item.namaTugas}
            mataKuliah={item.mataKuliah}
            deskripsi={item.deskripsi}
            deadline={item.deadline}
            status={item.status}
            onToggleStatus={ubahStatusTugas}
            onDelete={hapusTugas}
          />
        )}
        ListEmptyComponent={
          <View style={styles.kotakKosong}>
            <View style={styles.lingkaranKosong}>
              <Ionicons
                name={keyword ? 'search-outline' : 'checkmark-done-circle-outline'}
                size={40}
                color={warna.teksRedup}
              />
            </View>
            <Text style={styles.judulKosong}>
              {keyword ? 'Tugas Tidak Ditemukan' : 'Belum Ada Tugas'}
            </Text>
            <Text style={styles.deskripsiKosong}>
              {keyword
                ? `Tidak ada tugas yang cocok dengan kata kunci "${keyword}".`
                : 'Daftar tugas kosong. Silakan tambahkan tugas baru melalui form di atas.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: warna.latar,
  },
  kontenList: {
    paddingHorizontal: jarak.md,
    paddingTop: jarak.sm,
    paddingBottom: jarak.xl,
  },
  headerHero: {
    paddingVertical: jarak.md,
    marginBottom: jarak.xs,
  },
  teksSapaan: {
    fontSize: 22,
    fontWeight: '800',
    color: warna.teks,
    letterSpacing: -0.5,
  },
  subSapaan: {
    fontSize: 13,
    color: warna.teksSekunder,
    marginTop: 2,
    fontWeight: '500',
  },
  barisJudulDaftar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: jarak.xs,
    marginBottom: jarak.md,
  },
  judulKiri: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  judulDaftar: {
    fontSize: 15,
    fontWeight: '700',
    color: warna.teks,
  },
  badgeJumlah: {
    backgroundColor: warna.primerSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  teksJumlah: {
    fontSize: 12,
    fontWeight: '700',
    color: warna.primer,
  },
  kotakKosong: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  lingkaranKosong: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  judulKosong: {
    fontSize: 16,
    fontWeight: '700',
    color: warna.teks,
    marginBottom: 4,
  },
  deskripsiKosong: {
    fontSize: 13,
    color: warna.teksSekunder,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
});
