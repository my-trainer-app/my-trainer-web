import api from '@/client/lib/axios';
import { WorkoutExercise } from '../model/WorkoutExercise';

export const getWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
    const res = await api.get(`/api/workoutExercise/`);
    return res.data;
}

export const getWorkoutExercisesById = async (id: string): Promise<WorkoutExercise> => {
    const res = await api.get(`/api/workoutExercise?id=${id}`);
    return res.data;
};

export const createWorkoutExercise = async (data: Omit<WorkoutExercise, 'id'>): Promise<WorkoutExercise> => {
    const res = await api.post('/api/workoutExercise', data);
    return res.data;
};

export const updateWorkoutExercise = async (id: string, data: Partial<WorkoutExercise>): Promise<WorkoutExercise> => {
    const res = await api.put('/api/workoutExercise', { id, ...data });
    return res.data;
};

export const deleteWorkoutExercise = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/workoutExercise', { data: { id } });
    return res.data;
};