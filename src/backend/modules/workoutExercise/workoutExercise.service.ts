import { CreateWorkoutExerciseDTO, UpdateWorkoutExerciseDTO } from "./workoutExercise.model";
import { WorkoutExerciseRepository } from "./workoutExercise.repository";

export class WorkoutExerciseService {
    constructor(private readonly repo: WorkoutExerciseRepository) { }

    async createWorkoutExercise(data: CreateWorkoutExerciseDTO) {
        return this.repo.create(data);
    }

    async getAllWorkoutExercises() {
        return this.repo.findAll();
    }

    async getWorkoutExerciseById(id: string) {
        return this.repo.findById(id);
    }
    async updateWorkoutExercise(data: UpdateWorkoutExerciseDTO) {
        return this.repo.update(data);
    }

    async deleteWorkoutExercise(id: string) {
        return this.repo.delete(id);
    }

}