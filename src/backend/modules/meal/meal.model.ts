export interface CreateMealDTO {
    programId: string;
    name: string;
    time?: string;
}

export interface UpdateMealDTO {
    id: string;
    programId?: string;
    name?: string;
    time?: string;

}