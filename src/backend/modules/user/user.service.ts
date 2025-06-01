import { CreateUserDTO } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async createUser(data: CreateUserDTO) {
        return this.userRepository.createUser(data);
    }


}