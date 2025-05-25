import { prisma } from '@/backend/lib/prisma/client';
import { CreateWorkoutDayDTO } from './workoutDay.model';

export class WorkoutDayRepository {
    async create(data: CreateWorkoutDayDTO) {
        return prisma.workoutDay.create({ data });
    }

    async findAll() {
        return prisma.workoutDay.findMany({ include: { exercises: true } });
    }

    async findById(id: string) {
        return prisma.workoutDay.findUnique({ where: { id }, include: { exercises: true } });
    }

    async update(data: { id: string; programId?: string; dayName?: string }) {
        return prisma.workoutDay.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.workoutDay.delete({ where: { id } });
    }
}

