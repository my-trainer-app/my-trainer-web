import { CreateWorkoutDayDTO } from "../workoutDay/workoutDay.model";
import { CreateWorkoutProgramDTO, UpdateWorkoutProgramDTO } from "./workoutProgram.model";
import { WorkoutProgramRepository } from "./workoutProgram.repository";


export class WorkoutProgramService {
    constructor(private readonly repo: WorkoutProgramRepository) { }

    async createWorkoutProgram(data: CreateWorkoutProgramDTO) {
        return this.repo.create(data);
    }

    async addWorkoutDay(id: string, createWorkoutDayDTO: CreateWorkoutDayDTO) {
        return this.repo.addWorkoutDay(id, createWorkoutDayDTO);
    }

    async getAllWorkoutPrograms() {
        return this.repo.findAll();
    }

    async getWorkoutProgramById(id: string) {
        return this.repo.findById(id);
    }

    async getUserWorkoutPrograms(userId: string) {
        return this.repo.findByUserId(userId);
    }

    async getUserTodaysExercises(title: string, userId: string) {
        return this.repo.findUserTodaysExercises(title, userId);
    }

    async updateWorkoutProgram(data: UpdateWorkoutProgramDTO) {
        return this.repo.update(data);
    }

    async deleteWorkoutProgram(id: string) {
        return this.repo.delete(id);
    }
}