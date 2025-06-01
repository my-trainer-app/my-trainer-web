export interface CreateProfileDTO {
    userId: string;
    age: number;
    weight: number;
    height: number;
    fatPercentage?: number;
    muscleMass?: number;
    activityLevel: string;
    goal: string;
    sportExperience: string;
    disieaseHistory: string;
    injuryHistory: string;
    allergies: string;
}

