import { WorkoutDay } from "./WorkoutDay";

export interface WorkoutProgram {
    id: string;
    userId: string;
    title: string;
    days: WorkoutDay[];
}

