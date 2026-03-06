import type {UserRepo} from "../repositories/UserRepo.ts";

export class AuthService{
    private repo: UserRepo;

    constructor(repo: UserRepo) {
        this.repo = repo;
    }

    public login(username: string, password: string){
        return this.repo.findOne(username, password);
    }
}