import { CreateMealItemDTO, UpdateMealItemDTO } from "./mealItem.model";
import { MealItemRepository } from "./mealItem.repository";

export class MealItemService {
    constructor(private readonly repo: MealItemRepository) { }

    async createMealItem(data: CreateMealItemDTO) {
        return this.repo.create(data);
    }

    async getAllMealItems() {
        return this.repo.findAll();
    }

    async getMealItemById(id: string) {
        return this.repo.findById(id);
    }
    async updateMealItem(data: UpdateMealItemDTO) {
        return this.repo.update(data);
    }

    async deleteMealItem(id: string) {
        return this.repo.delete(id);
    }

}