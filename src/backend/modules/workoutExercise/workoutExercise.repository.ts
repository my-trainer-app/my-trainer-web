import { prisma } from "@/backend/lib/prisma/client";
import { CreateWorkoutExerciseDTO, UpdateWorkoutExerciseDTO } from "./workoutExercise.model";


export class WorkoutExerciseRepository {
    async create(data: CreateWorkoutExerciseDTO) {
        return prisma.workoutExercise.create({ data });
    }

    async findAll() {
        return prisma.workoutExercise.findMany();
    }

    async findById(id: string) {
        return prisma.workoutExercise.findUnique({ where: { id } });
    }

    async update(data: UpdateWorkoutExerciseDTO) {
        return prisma.workoutExercise.update({
            where: { id: data.id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.workoutExercise.delete({ where: { id } });
    }
}