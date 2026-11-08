import { TaskTypes, TaskAction } from '@/types/task';

export const DataTugasAwal: TaskTypes[] = [
  {
    id: '1',
    namaTugas: 'Aplikasi Manajemen Tugas (Modul 5)',
    mataKuliah: 'Pemrograman Visual',
    deskripsi: 'Implementasi Props, useState, useEffect, useMemo, useCallback, useRef, dan useReducer.',
    deadline: '15 Nov 2026',
    status: 'Belum Dikerjakan',
  },
  {
    id: '2',
    namaTugas: 'Audit Keamanan Jaringan & Firewall',
    mataKuliah: 'Keamanan Informasi Jaringan',
    deskripsi: 'Konfigurasi aturan iptables dan analisis paket trafik menggunakan Kali Linux.',
    deadline: '17 Nov 2026',
    status: 'Belum Dikerjakan',
  },
  {
    id: '3',
    namaTugas: 'Normalisasi Skema Basis Data E-Commerce',
    mataKuliah: 'Basis Data',
    deskripsi: 'Merancang ERD dan normalisasi tabel transaksi hingga bentuk 3NF.',
    deadline: '10 Nov 2026',
    status: 'Selesai',
  },
  {
    id: '4',
    namaTugas: 'Implementasi REST API Endpoint Auth',
    mataKuliah: 'Pemrograman Web',
    deskripsi: 'Membuat autentikasi JWT dan middleware validasi request.',
    deadline: '12 Nov 2026',
    status: 'Selesai',
  },
  {
    id: '5',
    namaTugas: 'Proposal Konsep Projek Akhir',
    mataKuliah: 'Metodologi Penelitian',
    deskripsi: 'Menyusun latar belakang, rumusan masalah, dan studi literatur sistem.',
    deadline: '22 Nov 2026',
    status: 'Belum Dikerjakan',
  },
];

export function taskReducer(state: TaskTypes[], action: TaskAction): TaskTypes[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'DELETE_TASK':
      return state.filter((item) => item.id !== action.payload);
    case 'TOGGLE_STATUS':
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              status: item.status === 'Belum Dikerjakan' ? 'Selesai' : 'Belum Dikerjakan',
            }
          : item
      );
    case 'RESET_TASKS':
      return [];
    default:
      return state;
  }
}