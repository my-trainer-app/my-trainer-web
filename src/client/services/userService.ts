import api from '@/client/lib/axios';
import { User } from '../model/User';


export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    const res = await api.post('/api/user', data);
    return res.data;
};
