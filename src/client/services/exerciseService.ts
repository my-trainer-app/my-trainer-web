import api from '@/client/lib/axios';
import { Exercise } from '../model/Exercise';

export const getExercises = async (): Promise<Exercise[]> => {
    const res = await api.get('/api/exercise');
    return res.data;
};

export const createExercise = async (data: Omit<Exercise, 'id'>): Promise<Exercise> => {
    const res = await api.post('/api/exercise', data);
    return res.data;
};

export const updateExercise = async (id: string, data: Partial<Exercise>): Promise<Exercise> => {
    const res = await api.put('/api/exercise', { id, ...data });
    return res.data;
};

export const deleteExercise = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/exercise', { data: { id } });
    return res.data;
};
