import api from '@/client/lib/axios';
import { NutritionProgram } from '../model/NutritionProgram';
import { Meal } from '../model/Meal';

export const createNutritionProgram = async (data: Omit<NutritionProgram, 'id'>): Promise<NutritionProgram> => {
    const res = await api.post('/api/nutritionProgram', data);
    return res.data;
};
export const addNutritionProgramToMeal = async (id: string, data: Meal): Promise<NutritionProgram> => {
    const res = await api.post('/api/nutritionProgram/addMeal', { id, createMealDTO: data });
    return res.data;
};

export const getNutritionPrograms = async (): Promise<NutritionProgram[]> => {
    const res = await api.get(`/api/nutritionProgram/`);
    return res.data;
}

export const getNutritionProgramById = async (id: string): Promise<NutritionProgram> => {
    const res = await api.get(`/api/nutritionProgram?id=${id}`);
    return res.data;
};

export const getUserNutritionPrograms = async (userId: string): Promise<NutritionProgram[]> => {
    const res = await api.get(`/api/nutritionProgram?userId=${userId}`);
    return res.data;
};

export const getUserTodaysNutritions = async (title: string, userId: string): Promise<NutritionProgram> => {
    const res = await api.get(`/api/nutritionProgram?title=${title}&userId=${userId}`);
    return res.data;
};

export const updateNutritionProgram = async (data: Partial<NutritionProgram> & { id: string }): Promise<NutritionProgram> => {
    const res = await api.put('/api/nutritionProgram', data);
    return res.data;
};

export const deleteNutritionProgram = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/nutritionProgram', { data: { id } });
    return res.data;
};
