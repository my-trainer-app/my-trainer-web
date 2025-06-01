export interface CreateUserDTO {
    clerkId: string;
    role: Role;

}


export enum Role {
    USER = "USER",
    TRAINER = "TRAINER",
}