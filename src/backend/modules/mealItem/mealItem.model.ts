export interface CreateMealItemDTO {
    mealId: string;
    foodId: string;
    quantity: number;
}

export interface UpdateMealItemDTO {
    id: string;
    mealId?: string;
    foodId?: string;
    quantity?: number;
}