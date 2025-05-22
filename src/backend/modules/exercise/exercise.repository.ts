import { prisma } from '@/backend/lib/prisma/client';
import { CreateExerciseDTO, UpdateExerciseDTO } from './exercise.model';

export class ExerciseRepository {
    async create(data: CreateExerciseDTO) {
        return prisma.exercise.create({ data });
    }

    async findAll() {
        return prisma.exercise.findMany();
    }

    async findById(id: string) {
        return prisma.exercise.findUnique({ where: { id } });
    }

    async update(data: UpdateExerciseDTO) {
        return prisma.exercise.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.exercise.delete({ where: { id } });
    }
}
