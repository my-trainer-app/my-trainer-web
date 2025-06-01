import { prisma } from '@/backend/lib/prisma/client';
import { CreateProfileDTO } from "./profile.model";

export class ProfileRepository {
    async createProfile(data: CreateProfileDTO) {
        return prisma.profile.create({
            data
        });
    }
} 