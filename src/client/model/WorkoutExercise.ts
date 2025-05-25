export interface WorkoutExercise {
    id: string;
    dayId: string;
    workoutId: string;
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
}