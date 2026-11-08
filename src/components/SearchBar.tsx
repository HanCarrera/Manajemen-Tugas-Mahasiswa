import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { warna, jarak, bayangan } from '@/constants/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={[styles.kotak, bayangan.sm]}>
      <Ionicons name="search" size={20} color={warna.primer} style={styles.ikonCari} />
      <TextInput
        style={styles.input}
        placeholder="Cari tugas atau mata kuliah..."
        placeholderTextColor={warna.teksRedup}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          style={({ pressed }) => [styles.tombolHapus, pressed && { opacity: 0.7 }]}
          hitSlop={8}
        >
          <Ionicons name="close-circle" size={18} color={warna.teksRedup} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kotak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: warna.kartu,
    borderRadius: 14,
    paddingHorizontal: jarak.md,
    borderWidth: 1,
    borderColor: warna.garis,
    marginBottom: jarak.md,
  },
  ikonCari: {
    marginRight: jarak.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: warna.teks,
  },
  tombolHapus: {
    padding: 2,
  },
});
