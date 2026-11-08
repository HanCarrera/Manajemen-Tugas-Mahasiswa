import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { warna, jarak, bayangan } from '@/constants/theme';
import { TaskStatus } from '@/types/task';

// Komponen anak menerima data tugas melalui Props sesuai ketentuan tugas
type Props = {
  id: string;
  namaTugas: string;
  mataKuliah: string;
  deskripsi: string;
  deadline: string;
  status: TaskStatus;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({
  id,
  namaTugas,
  mataKuliah,
  deskripsi,
  deadline,
  status,
  onToggleStatus,
  onDelete,
}: Props) {
  const isSelesai = status === 'Selesai';

  const handleDeleteWithConfirm = () => {
    Alert.alert(
      'Hapus Tugas',
      `Apakah Anda yakin ingin menghapus tugas "${namaTugas}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => onDelete(id) },
      ]
    );
  };

  return (
    <View style={[styles.kartu, bayangan.sm, isSelesai ? styles.kartuSelesai : styles.kartuPending]}>
      {/* Baris Atas: Badge Mata Kuliah & Status */}
      <View style={styles.headerKartu}>
        <View style={styles.chipMatkul}>
          <Ionicons name="school-outline" size={13} color={warna.primer} />
          <Text style={styles.teksMatkul} numberOfLines={1}>{mataKuliah}</Text>
        </View>

        <View style={[styles.badgeStatus, isSelesai ? styles.badgeSukses : styles.badgePending]}>
          <Ionicons
            name={isSelesai ? 'checkmark-circle' : 'time-outline'}
            size={12}
            color={isSelesai ? '#15803d' : '#b45309'}
          />
          <Text style={[styles.teksBadge, isSelesai ? styles.teksSukses : styles.teksPending]}>
            {status}
          </Text>
        </View>
      </View>

      {/* Nama Tugas */}
      <Text style={[styles.namaTugas, isSelesai && styles.teksCoret]}>
        {namaTugas}
      </Text>

      {/* Deskripsi Tugas */}
      <Text style={[styles.deskripsi, isSelesai && styles.deskripsiRedup]}>
        {deskripsi}
      </Text>

      {/* Tenggat Waktu (Deadline) */}
      <View style={styles.barisDeadline}>
        <Ionicons name="calendar-outline" size={14} color={warna.teksSekunder} />
        <Text style={styles.deadlineLabel}>Batas Waktu:</Text>
        <Text style={styles.deadlineNilai}>{deadline}</Text>
      </View>

      {/* Tombol Aksi (Ubah Status & Hapus Tugas) */}
      <View style={styles.aksiContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.tombolAksi,
            isSelesai ? styles.tombolBatal : styles.tombolSelesai,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => onToggleStatus(id)}
        >
          <Ionicons
            name={isSelesai ? 'arrow-undo-outline' : 'checkmark-done'}
            size={16}
            color="#ffffff"
          />
          <Text style={styles.teksAksi}>
            {isSelesai ? 'Tandai Belum' : 'Tandai Selesai'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.tombolAksi,
            styles.tombolHapus,
            pressed && { opacity: 0.85 },
          ]}
          onPress={handleDeleteWithConfirm}
        >
          <Ionicons name="trash-outline" size={15} color={warna.bahaya} />
          <Text style={styles.teksHapus}>Hapus</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kartu: {
    backgroundColor: warna.kartu,
    borderRadius: 16,
    padding: jarak.md,
    borderWidth: 1,
    borderColor: warna.garis,
    borderLeftWidth: 5,
  },
  kartuPending: {
    borderLeftColor: warna.peringatan,
  },
  kartuSelesai: {
    backgroundColor: '#fbfdfc',
    borderLeftColor: warna.sukses,
  },
  headerKartu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  chipMatkul: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: warna.primerSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexShrink: 1,
  },
  teksMatkul: {
    fontSize: 11,
    fontWeight: '700',
    color: warna.primer,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  badgeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePending: {
    backgroundColor: '#fef3c7',
  },
  badgeSukses: {
    backgroundColor: '#dcfce7',
  },
  teksBadge: {
    fontSize: 11,
    fontWeight: '700',
  },
  teksPending: {
    color: '#b45309',
  },
  teksSukses: {
    color: '#15803d',
  },
  namaTugas: {
    fontSize: 16,
    fontWeight: '700',
    color: warna.teks,
    marginBottom: 6,
    lineHeight: 22,
  },
  teksCoret: {
    textDecorationLine: 'line-through',
    color: warna.teksRedup,
  },
  deskripsi: {
    fontSize: 13,
    color: warna.teksSekunder,
    lineHeight: 19,
    marginBottom: 12,
  },
  deskripsiRedup: {
    color: warna.teksRedup,
  },
  barisDeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#edf2f7',
    marginBottom: 14,
  },
  deadlineLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: warna.teksSekunder,
  },
  deadlineNilai: {
    fontSize: 12,
    fontWeight: '700',
    color: warna.teks,
  },
  aksiContainer: {
    flexDirection: 'row',
    gap: jarak.sm,
  },
  tombolAksi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  tombolSelesai: {
    flex: 2,
    backgroundColor: warna.sukses,
  },
  tombolBatal: {
    flex: 2,
    backgroundColor: warna.teksSekunder,
  },
  tombolHapus: {
    flex: 1,
    backgroundColor: warna.bahayaSoft,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  teksAksi: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  teksHapus: {
    color: warna.bahaya,
    fontSize: 13,
    fontWeight: '700',
  },
});
