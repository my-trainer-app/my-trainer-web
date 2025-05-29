import api from '@/client/lib/axios';
import { WorkoutProgram } from '../model/WorkoutProgram';
import { WorkoutDay } from '../model/WorkoutDay';

export const createWorkoutProgram = async (data: Omit<WorkoutProgram, 'id'>): Promise<WorkoutProgram> => {
    const res = await api.post('/api/workoutProgram', data);
    return res.data;
};
export const addWorkoutProgramToDay = async (id: string, data: WorkoutDay): Promise<WorkoutProgram> => {
    const res = await api.post('/api/workoutProgram/addWorkoutDay', { id, createWorkoutDayDTO: data });
    return res.data;
};

export const getWorkoutPrograms = async (): Promise<WorkoutProgram[]> => {
    const res = await api.get(`/api/workoutProgram/`);
    return res.data;
}

export const getWorkoutProgramById = async (id: string): Promise<WorkoutProgram> => {
    const res = await api.get(`/api/workoutProgram?id=${id}`);
    return res.data;
};

export const getUserWorkoutPrograms = async (userId: string): Promise<WorkoutProgram[]> => {
    const res = await api.get(`/api/workoutProgram?userId=${userId}`);
    return res.data;
};

export const getUserTodaysExercises = async (title: string, userId: string): Promise<WorkoutProgram> => {
    const res = await api.get(`/api/workoutProgram?title=${title}&userId=${userId}`);
    return res.data;
};

export const updateWorkoutProgram = async (data: Partial<WorkoutProgram> & { id: string }): Promise<WorkoutProgram> => {
    const res = await api.put('/api/workoutProgram', data);
    return res.data;
};

export const deleteWorkoutProgram = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/workoutProgram', { data: { id } });
    return res.data;
};
