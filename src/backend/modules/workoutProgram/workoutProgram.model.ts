import { CreateWorkoutDayDTO, UpdateWorkoutDayDTO } from "../workoutDay/workoutDay.model";

export interface CreateWorkoutProgramDTO {
    userId: string;
    title: string;
    days: CreateWorkoutDayDTO[];
}

export interface UpdateWorkoutProgramDTO {
    id: string;
    userId?: string;
    title?: string;
    days?: UpdateWorkoutDayDTO[];
}