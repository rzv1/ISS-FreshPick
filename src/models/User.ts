export type UserRole = 'MANAGER' | 'CUSTOMER'

export class User {
    public readonly id: number;
    public username: string;
    public password: string;
    public readonly name: string;
    public readonly role: UserRole;

    constructor(id: number, username: string, password: string, name: string, role: UserRole) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}