import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { warna, jarak, bayangan } from '@/constants/theme';
import { TaskTypes } from '@/types/task';

type Props = {
  onAddTask: (tugasBaru: TaskTypes) => void;
  onResetTasks: () => void;
};

export default function TaskForm({ onAddTask, onResetTasks }: Props) {
  // 1. useState untuk mengelola 4 nilai input sesuai ketentuan modul
  const [namaTugas, setNamaTugas] = useState<string>('');
  const [mataKuliah, setMataKuliah] = useState<string>('');
  const [deskripsi, setDeskripsi] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  // State untuk toggle tampilan form agar rapi dan hemat ruang
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // 2. useRef untuk mengakses TextInput nama tugas dan auto-focus setelah tambah tugas
  const namaTugasInputRef = useRef<any>(null);

  const handleSubmit = () => {
    if (!namaTugas.trim() || !mataKuliah.trim() || !deskripsi.trim() || !deadline.trim()) {
      Alert.alert('Perhatian', 'Mohon lengkapi semua kolom input tugas terlebih dahulu.');
      return;
    }

    const tugasBaru: TaskTypes = {
      id: Date.now().toString(),
      namaTugas: namaTugas.trim(),
      mataKuliah: mataKuliah.trim(),
      deskripsi: deskripsi.trim(),
      deadline: deadline.trim(),
      status: 'Belum Dikerjakan',
    };

    onAddTask(tugasBaru);

    // Kosongkan form setelah submit
    setNamaTugas('');
    setMataKuliah('');
    setDeskripsi('');
    setDeadline('');

    // Arahkan fokus kembali ke input nama tugas sesuai ketentuan tugas
    namaTugasInputRef.current?.focus();
  };

  const handleResetWithConfirm = () => {
    Alert.alert(
      'Konfirmasi Reset',
      'Apakah Anda yakin ingin menghapus seluruh daftar tugas?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya, Hapus Semua', style: 'destructive', onPress: onResetTasks },
      ]
    );
  };

  return (
    <View style={[styles.kartuForm, bayangan.md]}>
      {/* Header Form dengan Tombol Collapse */}
      <Pressable
        style={styles.headerForm}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.judulWrapper}>
          <View style={styles.ikonJudul}>
            <Ionicons name="add-circle" size={20} color={warna.primer} />
          </View>
          <Text style={styles.judulForm}>Tambah Tugas Baru</Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'}
          size={22}
          color={warna.teksSekunder}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.isiForm}>
          {/* Input Nama Tugas */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Ionicons name="document-text-outline" size={14} color={warna.teksSekunder} />
              <Text style={styles.label}>Nama Tugas</Text>
            </View>
            <TextInput
              ref={namaTugasInputRef}
              style={styles.input}
              placeholder="Contoh: Aplikasi Manajemen Tugas"
              placeholderTextColor={warna.teksRedup}
              value={namaTugas}
              onChangeText={setNamaTugas}
            />
          </View>

          {/* Input Mata Kuliah */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Ionicons name="school-outline" size={14} color={warna.teksSekunder} />
              <Text style={styles.label}>Nama Mata Kuliah</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Pemrograman Visual"
              placeholderTextColor={warna.teksRedup}
              value={mataKuliah}
              onChangeText={setMataKuliah}
            />
          </View>

          {/* Input Deskripsi Tugas */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Ionicons name="create-outline" size={14} color={warna.teksSekunder} />
              <Text style={styles.label}>Deskripsi Tugas</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Rincian atau instruksi pengerjaan tugas..."
              placeholderTextColor={warna.teksRedup}
              value={deskripsi}
              onChangeText={setDeskripsi}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Input Deadline */}
          <View style={styles.fieldWrapper}>
            <View style={styles.labelRow}>
              <Ionicons name="calendar-outline" size={14} color={warna.teksSekunder} />
              <Text style={styles.label}>Tenggat Waktu (Deadline)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 15 Nov 2026, 23:59 WIB"
              placeholderTextColor={warna.teksRedup}
              value={deadline}
              onChangeText={setDeadline}
            />
          </View>

          {/* Tombol Aksi Form */}
          <View style={styles.barisTombol}>
            <Pressable
              style={({ pressed }) => [styles.tombolTambah, pressed && { opacity: 0.9 }]}
              onPress={handleSubmit}
            >
              <Ionicons name="checkmark-sharp" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.teksTombolTambah}>Simpan Tugas</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.tombolReset, pressed && { opacity: 0.8 }]}
              onPress={handleResetWithConfirm}
            >
              <Ionicons name="refresh-outline" size={15} color={warna.bahaya} style={{ marginRight: 4 }} />
              <Text style={styles.teksTombolReset}>Reset</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kartuForm: {
    backgroundColor: warna.kartu,
    padding: jarak.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: warna.garis,
    marginBottom: jarak.lg,
  },
  headerForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  judulWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ikonJudul: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: warna.primerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  judulForm: {
    fontSize: 16,
    fontWeight: '700',
    color: warna.teks,
  },
  isiForm: {
    marginTop: jarak.md,
    gap: 12,
  },
  fieldWrapper: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: warna.teksSekunder,
  },
  input: {
    borderWidth: 1,
    borderColor: warna.garis,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    backgroundColor: '#fafbfc',
    color: warna.teks,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  barisTombol: {
    flexDirection: 'row',
    gap: jarak.sm,
    marginTop: 6,
  },
  tombolTambah: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: warna.primer,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: warna.primer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  teksTombolTambah: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  tombolReset: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: warna.bahayaSoft,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  teksTombolReset: {
    color: warna.bahaya,
    fontWeight: '600',
    fontSize: 13,
  },
});
