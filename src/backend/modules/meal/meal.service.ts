import { CreateMealDTO, UpdateMealDTO } from "./meal.model";
import { MealRepository } from "./meal.repository";

export class MealService {
    constructor(private readonly repo: MealRepository) { }

    async createMeal(data: CreateMealDTO) {
        return this.repo.create(data);
    }

    async getAllMeals() {
        return this.repo.findAll();
    }

    async getMealById(id: string) {
        return this.repo.findById(id);
    }
    async updateMeal(data: UpdateMealDTO) {
        return this.repo.update(data);
    }

    async deleteMeal(id: string) {
        return this.repo.delete(id);
    }

}