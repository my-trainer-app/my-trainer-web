export interface CreateExerciseDTO {
    name: string;
    description: string;
    videoUrl?: string;
}

export interface UpdateExerciseDTO {
    id: string;
    name?: string;
    description?: string;
    videoUrl?: string;
}
