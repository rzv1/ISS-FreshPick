import {type CartItemRepo} from "../repositories/CartItemRepo.ts";
import {CartItem} from "../models/CartItem.ts";
import  {type InventoryService} from "./InventoryService.ts";
import {OrderItem} from "../models/OrderItem.ts";
import  {type OrderRepo} from "../repositories/OrderRepo.ts";
import {Order} from "../models/Order.ts";

export class CartService{
    private repo: CartItemRepo;
    private orderRepo: OrderRepo
    private invService: InventoryService;

    constructor(repo: CartItemRepo, orderRepo: OrderRepo, invService: InventoryService) {
        this.repo = repo;
        this.orderRepo = orderRepo;
        this.invService = invService;
    }

    public async getAllForUser(userId: number){
        return await this.repo.findAllByUser(userId)
    }

    public async addCartItem(userId: number, batchId: number, productName: string, imageURL: string, discountedPrice: number, price: number){
        const batch = await this.invService.findBatchItem(batchId);
        if(batch){
            const product = await this.invService.findProduct(batch.productId);
            const item = new CartItem(0, userId, product.imageURL, batchId, productName, 1, price);
            return this.repo.save(item);
        }
        return null;
    }

    public async addProductToCart(productId: number, userId: number){
        const product = await this.invService.findProduct(productId);
        if(product)
        await this.repo.save(new CartItem(0, userId, product.imageURL, null, product.name, 1, product.basePrice))
    }

    public removeCartItem(itemId: number){
        return this.repo.delete(itemId)
    }

    public async confirmOrder(userId: number | null){
        let total = 0;
        if(userId){
            const items = await this.getAllForUser(userId)
            for (const it of items) {
                total += it.appliedPrice
                if(it.batchId) {
                    if(!await this.invService.checkStock(it.batchId, it.quantity))
                        return {text: "Selected quantity of" + it.productName + "exceeds stock", type: "fail"};
                }
            }
            const order = await this.orderRepo.saveOrder(new Order(0, userId, total, new Date()))
            if(order)
            for (const it of items) {
                const orderItem = new OrderItem(0, order.id, it.productName, it.quantity, it.imageURL, it.appliedPrice)
                this.orderRepo.saveOrderItem(orderItem).then();
            }
            const cartItems = await this.getAllForUser(userId);
            for (const it of cartItems) {
                await this.repo.delete(it.id)
            }
        }
        return {text: "Order confirmed", type: "success"}
    }

    public async incrementCartItem(itemId: number) {
        const item = await this.repo.findOne(itemId)
        if(item ){
            return await this.repo.updateQuantity(itemId, item.quantity + 1)
        }
        return undefined
    }

    public async decrementCartItem(itemId: number) {
        const item = await this.repo.findOne(itemId);
        if(item && item.quantity > 1){
            return await this.repo.updateQuantity(itemId, item.quantity - 1)
        }
        return undefined
    }
}