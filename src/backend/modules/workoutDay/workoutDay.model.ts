export interface CreateWorkoutDayDTO {
    programId: string;
    dayName: string;
}

export interface UpdateWorkoutDayDTO {
    id: string;
    programId?: string;
    dayName?: string;
}
