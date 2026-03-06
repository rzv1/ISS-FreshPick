import type {IRepo} from "../repositories/IRepo.ts";
import  {Product} from "../models/Product.ts";
import {BatchItem} from "../models/BatchItem.ts";
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

    public async saveBatchItem(productId: number, quantity: number){
        const product = await this.repo.findOne(productId);
        if(!product)
            throw new Error("Invalid product");
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + product.fixedDurationHours);
        return this.batchRepo.save(new BatchItem(0, productId, new Date(), expireDate, quantity));
    }

    public getAllProducts(){
        return this.repo.findAll();
    }

    public getAllBatchItems(){
        return this.batchRepo.findAll();
    }

    public async getAllProductsByID(ids: number[]){
        const products = new Array<Product>()
        for (const id of ids) {
            const product = await this.repo.findOne(id);
            if (product)
                products.push(product);
        }
        return products;
    }

    public async getAllInventory(){
        const items = await this.batchRepo.findAll();
        let total = 0
        let expired = 0
        items.forEach(it => {
            total += it.quantity;
            if(it.expiresAt < new Date())
                expired += it.quantity;
        });
        return new InventoryDTO(items, total, expired);
    }

    public async checkStock(batchId: number, quantity: number){
        const batch = await this.batchRepo.findOne(batchId);
        if(!batch)
            throw new Error("Invalid batch id")
        return batch?.quantity > quantity
    }

    public findBatchItem(batchId: number){
        return this.batchRepo.findOne(batchId);
    }

    public deleteBatch(batchId: number){
        this.batchRepo.delete(batchId);
    }

    public async getAllDeals(){
        return await this.batchRepo.getDeals();
    }
}