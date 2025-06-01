import { CreateProfileDTO } from "./profile.model";
import { ProfileRepository } from "./profile.repository";


export class ProfileService {
    constructor(private ProfileRepository: ProfileRepository) { }

    async createProfile(data: CreateProfileDTO) {
        return this.ProfileRepository.createProfile(data);
    }


}