import { Profile } from "./Profile";
import { User } from "./User";

export interface Onboarding {
    user: Omit<User, 'id'>;
    profile: Omit<Profile, 'id'>;
}