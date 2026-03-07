import  {Product} from "../models/Product.ts";
import {BatchItem} from "../models/BatchItem.ts";
import type {BatchItemRepo} from "../repositories/BatchItemRepo.ts";
import type {ProductRepo} from "../repositories/ProductRepo.ts";
import type {Item} from "../models/InventoryDTO.ts";

export class InventoryService{
    private repo: ProductRepo
    private batchRepo: BatchItemRepo

    constructor(repo: ProductRepo, batchRepo: BatchItemRepo) {
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
        console.log(product);
        expireDate.setHours(expireDate.getHours() + Number(product.TTL));
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
        const items = new Array<Item>();
        const batches = await this.batchRepo.findAll();
        let totalItems = 0
        let expiringSoon = 0
        for (const it of batches){
            const p = await this.repo.findOne(it.productId);
            items.push({
                id: it.id, name: p.name, units: it.quantity, status: it.expiresAt > new Date() ? "Fresh" : "Expired", imageSrc: p.imageURL
            })
            totalItems += it.quantity;
            if(it.expiresAt < new Date())
                expiringSoon += it.quantity;
        }
        return { items, totalItems, expiringSoon };
    }

    public async checkStock(batchId: number, quantity: number){
        const batch = await this.batchRepo.findOne(batchId);
        if(!batch)
            throw new Error("Invalid batch id")
        return batch?.quantity > quantity;
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