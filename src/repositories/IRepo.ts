export interface IRepo<T>{
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | undefined>;
    save(item: T): Promise<T | undefined>;
    delete(id: number) : Promise<void>;
}