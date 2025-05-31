
import { CreateFoodDTO, UpdateFoodDTO } from './food.model';
import { FoodRepository } from './food.repository';


export class FoodService {
    constructor(private readonly repo: FoodRepository) { }

    async createFood(data: CreateFoodDTO) {
        return this.repo.create(data);
    }

    async getAllFoods() {
        return this.repo.findAll();
    }

    async getFoodById(id: string) {
        return this.repo.findById(id);
    }

    async updateFood(data: UpdateFoodDTO) {
        return this.repo.update(data);
    }

    async deleteFood(id: string) {
        return this.repo.delete(id);
    }
}
