import { prisma } from "@/backend/lib/prisma/client";
import { CreateMealItemDTO, UpdateMealItemDTO } from "./mealItem.model";


export class MealItemRepository {
    async create(data: CreateMealItemDTO) {
        return prisma.mealItem.create({ data });
    }

    async findAll() {
        return prisma.mealItem.findMany();
    }

    async findById(id: string) {
        return prisma.mealItem.findUnique({ where: { id } });
    }

    async update(data: UpdateMealItemDTO) {
        return prisma.mealItem.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.mealItem.delete({ where: { id } });
    }
}