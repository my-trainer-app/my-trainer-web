import { CreateMealDTO, UpdateMealDTO } from "../meal/meal.model";

export interface CreateNutritionProgramDTO {
    userId: string;
    title: string;
    meals: CreateMealDTO[];
}

export interface UpdateNutritionProgramDTO {
    id: string;
    userId?: string;
    title?: string;
    meals?: UpdateMealDTO[];
}