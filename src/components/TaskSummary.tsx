import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { warna, jarak, bayangan } from '@/constants/theme';

type Props = {
  total: number;
  belumSelesai: number;
  selesai: number;
};

export default function TaskSummary({ total, belumSelesai, selesai }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.judulBagian}>Ringkasan Aktivitas</Text>
      <View style={styles.baris}>
        {/* Total Tugas */}
        <View style={[styles.kartu, bayangan.sm, { borderTopColor: warna.primer }]}>
          <View style={[styles.ikonWrapper, { backgroundColor: warna.primerSoft }]}>
            <Ionicons name="folder-open" size={18} color={warna.primer} />
          </View>
          <Text style={[styles.angka, { color: warna.primer }]}>{total}</Text>
          <Text style={styles.label}>Total Tugas</Text>
        </View>

        {/* Belum Dikerjakan */}
        <View style={[styles.kartu, bayangan.sm, { borderTopColor: warna.peringatan }]}>
          <View style={[styles.ikonWrapper, { backgroundColor: warna.peringatanSoft }]}>
            <Ionicons name="time" size={18} color={warna.peringatan} />
          </View>
          <Text style={[styles.angka, { color: warna.peringatan }]}>{belumSelesai}</Text>
          <Text style={styles.label}>Belum Selesai</Text>
        </View>

        {/* Selesai */}
        <View style={[styles.kartu, bayangan.sm, { borderTopColor: warna.sukses }]}>
          <View style={[styles.ikonWrapper, { backgroundColor: warna.suksesSoft }]}>
            <Ionicons name="checkmark-circle" size={18} color={warna.sukses} />
          </View>
          <Text style={[styles.angka, { color: warna.sukses }]}>{selesai}</Text>
          <Text style={styles.label}>Selesai</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: jarak.lg,
  },
  judulBagian: {
    fontSize: 14,
    fontWeight: '700',
    color: warna.teksSekunder,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: jarak.sm,
  },
  baris: {
    flexDirection: 'row',
    gap: jarak.sm,
  },
  kartu: {
    flex: 1,
    backgroundColor: warna.kartu,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: warna.garis,
    borderTopWidth: 3,
  },
  ikonWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  angka: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: warna.teksSekunder,
    marginTop: 2,
    textAlign: 'center',
  },
});
