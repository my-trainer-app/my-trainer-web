import { prisma } from "@/backend/lib/prisma/client";
import { CreateNutritionProgramDTO, UpdateNutritionProgramDTO } from "./nutritionProgram.model";
import { CreateMealDTO } from "../meal/meal.model";

export class NutritionProgramRepository {

    async create(data: CreateNutritionProgramDTO) {
        const { meals, ...programData } = data;
        return prisma.nutritionProgram.create({
            data: {
                ...programData,
                meals: meals
                    ? {
                        create: meals
                    }
                    : undefined,
            },
        });
    }

    async addMeal(id: string, createMealDTO: CreateMealDTO) {
        return prisma.nutritionProgram.update({
            where: { id },
            data: {
                meals: {
                    create: createMealDTO
                }
            }
        });

    }

    async findAll() {
        return prisma.nutritionProgram.findMany();
    }

    async findById(id: string) {
        return prisma.nutritionProgram.findUnique({
            where: { id },
        });
    }

    async findByUserId(userId: string) {
        return prisma.nutritionProgram.findMany({
            where: { userId: userId },
            include: {
                meals: {
                    include: {
                        items: true,
                    },
                },
            },
        });
    }

    async findUserTodaysNutrition(title: string, userId: string) {
        return prisma.nutritionProgram.findFirst({
            where: {
                title: title,
                userId: userId,
            },
            include: {
                meals: {
                    include: {
                        items: true,
                    },
                },
            },
        });
    }

    async update(data: UpdateNutritionProgramDTO) {
        const { id, meals, ...programData } = data;
        return prisma.nutritionProgram.update({
            where: { id },
            data: {
                ...programData,
                meals: meals
                    ? {
                        update: meals.map(meal => ({
                            where: { id: meal.id },
                            data: meal,
                        })),
                    }
                    : undefined,
            },
        });
    }

    async delete(id: string) {
        return prisma.nutritionProgram.delete({
            where: { id },
        });
    }


}