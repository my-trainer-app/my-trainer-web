import { prisma } from "@/backend/lib/prisma/client";
import { CreateMealDTO, UpdateMealDTO } from "./meal.model";


export class MealRepository {
    async create(data: CreateMealDTO) {
        return prisma.meal.create({ data });
    }

    async findAll() {
        return prisma.meal.findMany();
    }

    async findById(id: string) {
        return prisma.meal.findUnique({ where: { id } });
    }

    async update(data: UpdateMealDTO) {
        return prisma.meal.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.meal.delete({ where: { id } });
    }
}