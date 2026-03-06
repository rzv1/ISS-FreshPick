export interface IRepo<T>{
    findAll(): T[];
    findOne(id: number): T | undefined;
    save(item: T): void;
    delete(id: number) : void;
}