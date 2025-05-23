export interface CreateWorkoutExerciseDTO {
    dayId: string;
    exerciseId: string;
    sets: number;
    reps: number;
    restSeconds: number;
}

export interface UpdateWorkoutExerciseDTO {
    id: string;
    dayId?: string;
    exerciseId?: string;
    sets?: number;
    reps?: number;
    restSeconds?: number;
}