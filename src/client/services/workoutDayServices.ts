import api from '@/client/lib/axios';
import { WorkoutDay } from '../model/WorkoutDay';

export const getWorkoutDays = async (): Promise<WorkoutDay[]> => {
    const res = await api.get(`/api/workoutDay/`);
    return res.data;
}

export const getWorkoutDayById = async (id: string): Promise<WorkoutDay> => {
    const res = await api.get(`/api/workoutDay?id=${id}`);
    return res.data;
};

export const createWorkoutDay = async (data: Omit<WorkoutDay, 'id'>): Promise<WorkoutDay> => {
    const res = await api.post('/api/workoutDay', data);
    return res.data;
};

export const updateWorkoutDay = async (id: string, data: Partial<WorkoutDay>): Promise<WorkoutDay> => {
    const res = await api.put('/api/workoutDay', { id, ...data });
    return res.data;
};

export const deleteWorkoutDay = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/workoutDay', { data: { id } });
    return res.data;
};