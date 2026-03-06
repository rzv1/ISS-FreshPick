import  {type Product} from "../models/Product.ts";
import type {IRepo} from "./IRepo.ts";

export class ProductRepo implements IRepo<Product>{
    private repo: IRepo<Product>;

    constructor(repo: IRepo<Product>) {
        this.repo = repo;
    }

    public getAll(){
        return this.repo.findAll();
    }
    public add()
}