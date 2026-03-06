import type {IRepo} from "../repositories/IRepo.ts";
import  {Product} from "../models/Product.ts";
import type {BatchItem} from "../models/BatchItem.ts";
import type {BatchItemRepo} from "../repositories/BatchItemRepo.ts";
import {InventoryDTO} from "../models/InventoryDTO.ts";

export class InventoryService{
    private repo: IRepo<Product>
    private batchRepo: BatchItemRepo

    constructor(repo: IRepo<Product>, batchRepo: BatchItemRepo) {
        this.repo = repo;
        this.batchRepo = batchRepo;
    }

    public saveProduct(name: string, price: number, imageURL: string, ttl: number){
        return this.repo.save(new Product(0, name, imageURL, price, ttl));
    }

    public getAllProducts(){
        return this.repo.findAll();
    }

    public getAllBatchItems(){
        return this.batchRepo.findAll();
    }

    public getAllProductsByID(ids: number[]){
        const products = new Array<Product>()
        ids.forEach(id => {
            const product = this.repo.findOne(id);
            if (product)
                products.push(product);
        });
        return products;
    }

    public getAllInventory(){
        const items = this.batchRepo.findAll();
        let total = 0
        let expired = 0
        items.forEach(it => {

        });
        return new InventoryDTO(items, )
    }

    public checkStock(batchId: number, quantity: number){
        return this.batchRepo.isAvailable(batchId, quantity);
    }

    public incrementStock(batchId: number, quantity: number){
        return this.batchRepo.incrementStock(batchId, quantity);
    }

    public decrementStock(batchId: number, quantity: number){
        return this.batchRepo.decrementStock(batchId, quantity);
    }

    public findBatchItem(batchId: number){
        return this.batchRepo.findOne(batchId);
    }

    public deleteBatch(batchId: number){
        this.batchRepo.delete(batchId);
    }

    public getDeals(){
        const items = this.batchRepo.findAll();
        const ids = new Array<number>();
        items.forEach();
        const products = this.getAllProductsByID(ids);
    }
}