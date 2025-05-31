import { Meal } from "./Meal";

export interface NutritionProgram {
    id: string;
    userId: string;
    title: string;
    meals: Meal[];
}