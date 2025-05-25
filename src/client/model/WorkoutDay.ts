import { WorkoutExercise } from "../../../generated/prisma";

export interface WorkoutDay {
    id: string;
    programId: string;
    dayName: string;
    exercises: WorkoutExercise[];
}