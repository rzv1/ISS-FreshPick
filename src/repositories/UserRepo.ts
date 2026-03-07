import type {User} from "../models/User.ts";

export class UserRepo{
    private urlAPI = 'http://localhost:3000/users/login';

    async findOne(username: string, password: string): Promise<User | undefined> {
        const res = await fetch(this.urlAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });
        if (res.status === 401)
            return undefined;
        return res.json();
    }
}