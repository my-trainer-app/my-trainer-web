import api from '@/client/lib/axios';
import { Profile } from '../model/Profile';


export const createProfile = async (data: Omit<Profile, 'id'>): Promise<Profile> => {
    const res = await api.post('/api/profile', data);
    return res.data;
};
