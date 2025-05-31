import api from '@/client/lib/axios';
import { Meal } from '../model/Meal';

export const getMeals = async (): Promise<Meal[]> => {
    const res = await api.get(`/api/meal/`);
    return res.data;
}

export const getMealById = async (id: string): Promise<Meal> => {
    const res = await api.get(`/api/meal?id=${id}`);
    return res.data;
};

export const createMeal = async (data: Omit<Meal, 'id'>): Promise<Meal> => {
    const res = await api.post('/api/meal', data);
    return res.data;
};

export const updateMeal = async (id: string, data: Partial<Meal>): Promise<Meal> => {
    const res = await api.put('/api/meal', { id, ...data });
    return res.data;
};

export const deleteMeal = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/meal', { data: { id } });
    return res.data;
};