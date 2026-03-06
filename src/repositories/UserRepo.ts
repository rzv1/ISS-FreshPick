import type {User} from "../models/User.ts";

export class UserRepo{
    public findOne(username: string, password: string): User | undefined {
        return new User(1, username, password, "Ca", UserRole.MANAGER);
    }
}