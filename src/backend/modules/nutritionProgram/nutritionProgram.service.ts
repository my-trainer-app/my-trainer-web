import { CreateMealDTO } from "../meal/meal.model";
import { CreateNutritionProgramDTO, UpdateNutritionProgramDTO } from "./nutritionProgram.model";
import { NutritionProgramRepository } from "./nutritionProgram.repository";


export class NutritionProgramService {
    constructor(private readonly repo: NutritionProgramRepository) { }

    async createNutritionProgram(data: CreateNutritionProgramDTO) {
        return this.repo.create(data);
    }

    async addMeal(id: string, createMealDTO: CreateMealDTO) {
        return this.repo.addMeal(id, createMealDTO);
    }

    async getAllNutritionPrograms() {
        return this.repo.findAll();
    }

    async getNutritionProgramById(id: string) {
        return this.repo.findById(id);
    }

    async getUserNutritionPrograms(userId: string) {
        return this.repo.findByUserId(userId);
    }

    async getUserTodaysExercises(title: string, userId: string) {
        return this.repo.findUserTodaysNutrition(title, userId);
    }

    async updateNutritionProgram(data: UpdateNutritionProgramDTO) {
        return this.repo.update(data);
    }

    async deleteNutritionProgram(id: string) {
        return this.repo.delete(id);
    }
}