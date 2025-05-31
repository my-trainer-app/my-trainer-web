export interface CreateFoodDTO {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface UpdateFoodDTO {
    id: string;
    name?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
}
