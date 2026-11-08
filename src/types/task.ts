export type TaskStatus = 'Belum Dikerjakan' | 'Selesai';

export interface TaskTypes {
  id: string;
  namaTugas: string;
  mataKuliah: string;
  deskripsi: string;
  deadline: string;
  status: TaskStatus;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: TaskTypes }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string }
  | { type: 'RESET_TASKS' };