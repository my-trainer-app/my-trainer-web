import { prisma } from "@/backend/lib/prisma/client";
import { CreateWorkoutProgramDTO, UpdateWorkoutProgramDTO } from "./workoutProgram.model";
import { CreateWorkoutDayDTO } from "../workoutDay/workoutDay.model";


export class WorkoutProgramRepository {

    async create(data: CreateWorkoutProgramDTO) {
        const { days, ...programData } = data;
        return prisma.workoutProgram.create({
            data: {
                ...programData,
                days: days
                    ? {
                        create: days
                    }
                    : undefined,
            },
        });
    }

    async addWorkoutDay(id: string, createWorkoutDayDTO: CreateWorkoutDayDTO) {
        return prisma.workoutProgram.update({
            where: { id },
            data: {
                days: {
                    create: createWorkoutDayDTO
                }
            }
        });

    }

    async findAll() {
        return prisma.workoutProgram.findMany();
    }

    async findById(id: string) {
        return prisma.workoutProgram.findUnique({
            where: { id },
        });
    }

    async findByUserId(userId: string) {
        return prisma.workoutProgram.findMany({
            where: { userId: userId },
            include: {
                days: {
                    include: {
                        exercises: true,
                    },
                },
            },
        });
    }

    async findUserTodaysExercises(title: string, userId: string) {
        return prisma.workoutProgram.findFirst({
            where: {
                title: title,
                userId: userId,
            },
            include: {
                days: {
                    include: {
                        exercises: true,
                    },
                },
            },
        });
    }

    async update(data: UpdateWorkoutProgramDTO) {
        const { id, days, ...programData } = data;
        return prisma.workoutProgram.update({
            where: { id },
            data: {
                ...programData,
                days: days
                    ? {
                        update: days.map(day => ({
                            where: { id: day.id },
                            data: day,
                        })),
                    }
                    : undefined,
            },
        });
    }

    async delete(id: string) {
        return prisma.workoutProgram.delete({
            where: { id },
        });
    }


}