import { prisma } from '@/backend/lib/prisma/client';
import { CreateUserDTO } from "./user.model";

export class UserRepository {
    async createUser(data: CreateUserDTO) {
        return prisma.user.create({ data });
    }
} 