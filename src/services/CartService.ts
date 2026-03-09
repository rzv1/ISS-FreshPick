import {type CartItemRepo} from "../repositories/CartItemRepo.ts";
import {CartItem} from "../models/CartItem.ts";
import type {InventoryService} from "./InventoryService.ts";
import {OrderItem} from "../models/OrderItem.ts";

export class CartService{
    private repo: CartItemRepo;
    private invService: InventoryService;

    constructor(repo: CartItemRepo, srv: InventoryService) {
        this.repo = repo;
        this.invService = srv;
    }

    public async getAllForUser(userId: number){
        return await this.repo.findAllByUser(userId)
    }

    public async addCartItem(userId: number, batchId: number, productName: string, price: number){
        const batch = await this.invService.findBatchItem(batchId);
        if(batch){
            const product = await this.invService.findProduct(batch.productId);
            const item = new CartItem(0, userId, product.imageURL, batchId, productName, 1, price);
            return this.repo.save(item);
        }
        return null;
    }

    public async addOrderItem(orderId: number, name: string, quantity: number, price: number){
        const item = new OrderItem(0, orderId, name, quantity, price)
        return this.repo.save
    }

    public async addProductToCart(productId: number, userId: number){
        const product = await this.invService.findProduct(productId);
        await this.repo.save(new CartItem(0, userId, product.imageURL, null, product.name, 1, product.basePrice))
    }

    public removeCartItem(itemId: number){
        return this.repo.delete(itemId)
    }

    private async removeAllForUser(userId: number) {
        return await this.repo.deleteAllForUser(userId);
    }

    public async confirmOrder(userId: number | null){
        if(userId){
            const items = await this.getAllForUser(userId)
            for (const it of items) {
                if(it.batchId) {
                    const batch = await this.invService.findBatchItem(it.batchId);
                    if(batch)
                        if(batch?.quantity < it.selectedQuantity)
                            return {text: "Selected quantity of" + it.productName + "exceeds stock", type: "error"};
                }
            }
            for (const it of items) {
                this.invService.
            }
        }
        return {text: "Order confirmed", type: "success"}
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