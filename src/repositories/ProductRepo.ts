import  {type Product} from "../models/Product.ts";
import type {IRepo} from "./IRepo.ts";

export class ProductRepo implements IRepo<Product>{
    private urlAPI = "https://iss-harvest.onrender.com/products";

    async findAll(): Promise<Product[]> {
        const res = await fetch(this.urlAPI);
        if(!res.ok)
            throw new Error("findAll error");
        return res.json();
    }

    async findOne(id: number): Promise<Product> {
        const res = await fetch(this.urlAPI + "/" + id);
        if(!res.ok)
            throw new Error("findOne error");
        return res.json();
    }
    async save(item: Omit<Product, 'id'>): Promise<Product> {
        console.log(JSON.stringify(item))
        const res = await fetch(this.urlAPI, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(item)
        });
        return res.json();
    }
    async delete(id: number): Promise<void> {
        await fetch(this.urlAPI + "/" + id, { method: 'DELETE'});
    }
}