import api from '@/client/lib/axios';
import { Food } from '../model/Food';

export const getFoods = async (): Promise<Food[]> => {
    const res = await api.get('/api/food');
    return res.data;
};

export const getFoodById = async (id: string): Promise<Food> => {
    const res = await api.get(`/api/food?id=${id}`);
    return res.data;
};

export const createFood = async (data: Omit<Food, 'id'>): Promise<Food> => {
    const res = await api.post('/api/food', data);
    return res.data;
};

export const updateFood = async (id: string, data: Partial<Food>): Promise<Food> => {
    const res = await api.put('/api/food', { id, ...data });
    return res.data;
};

export const deleteFood = async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete('/api/food', { data: { id } });
    return res.data;
};
