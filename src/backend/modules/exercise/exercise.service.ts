
import { ExerciseRepository } from './exercise.repository';
import { CreateExerciseDTO, UpdateExerciseDTO } from './exercise.model';

export class ExerciseService {
    constructor(private readonly repo: ExerciseRepository) { }

    async createExercise(data: CreateExerciseDTO) {
        return this.repo.create(data);
    }

    async getAllExercises() {
        return this.repo.findAll();
    }

    async getExerciseById(id: string) {
        return this.repo.findById(id);
    }

    async updateExercise(data: UpdateExerciseDTO) {
        return this.repo.update(data);
    }

    async deleteExercise(id: string) {
        return this.repo.delete(id);
    }
}
