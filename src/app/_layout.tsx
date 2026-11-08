import { Stack } from 'expo-router';
import { warna } from '@/constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
          color: warna.teks,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Manajemen Tugas Mahasiswa',
        }}
      />
    </Stack>
  );
}
