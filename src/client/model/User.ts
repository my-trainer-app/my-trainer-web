export interface User {
    id: string;
    clerkId: string;
    role: Role;
}

export enum Role {
    USER = "USER",
    TRAINER = "TRAINER",
}