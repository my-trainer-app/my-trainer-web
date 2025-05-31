import { prisma } from '@/backend/lib/prisma/client';
import { CreateFoodDTO, UpdateFoodDTO } from './food.model';

export class FoodRepository {
    async create(data: CreateFoodDTO) {
        return prisma.food.create({ data });
    }

    async findAll() {
        return prisma.food.findMany();
    }

    async findById(id: string) {
        return prisma.food.findUnique({ where: { id } });
    }

    async update(data: UpdateFoodDTO) {
        return prisma.food.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.food.delete({ where: { id } });
    }
}
