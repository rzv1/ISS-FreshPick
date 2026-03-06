import {type CartItemRepo} from "../repositories/CartItemRepo.ts";
import {CartItem} from "../models/CartItem.ts";
import type {InventoryService} from "./InventoryService.ts";

export class CartService{
    private repo: CartItemRepo;
    private invService: InventoryService;

    constructor(repo: CartItemRepo, srv: InventoryService) {
        this.repo = repo;
        this.invService = srv;
    }

    public async addCartItem(userId: number, batchId: number, productName: string, price: number){
        const batch = await this.invService.findBatchItem(batchId);
        if(batch){
            const item = new CartItem(0, userId, batchId, productName, 1, price);
            return this.repo.save(item);
        }
        return null;
    }

    public removeCartItem(itemId: number){
        return this.repo.delete(itemId)
    }

    public removeAllForUser(userId: number) {
        return this.repo.deleteAllForUser(userId);
    }

    public async incrementCartItem(itemId: number) {
        const item = await this.repo.findOne(itemId);
        if(item ){
            return await this.repo.updateQuantity(itemId, item.selectedQuantity + 1)
        }
        return undefined
    }

    public async decrementCartItem(itemId: number) {
        const item = await this.repo.findOne(itemId);
        if(item && item.selectedQuantity > 2){
            return await this.repo.updateQuantity(itemId, item.selectedQuantity - 1)
        }
        return undefined
    }
}