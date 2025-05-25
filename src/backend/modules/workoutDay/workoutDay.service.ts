import { CreateWorkoutDayDTO, UpdateWorkoutDayDTO } from "./workoutDay.model";
import { WorkoutDayRepository } from "./workoutDay.repository";

export class WorkoutDayService {
    constructor(private readonly repo: WorkoutDayRepository) { }

    async createWorkoutDay(data: CreateWorkoutDayDTO) {
        return this.repo.create(data);
    }

    async getAllWorkoutDays() {
        return this.repo.findAll();
    }

    async getWorkoutDayById(id: string) {
        return this.repo.findById(id);
    }

    async updateWorkoutDay(data: UpdateWorkoutDayDTO) {
        return this.repo.update(data);
    }
    async deleteWorkoutDay(id: string) {
        return this.repo.delete(id);
    }

}