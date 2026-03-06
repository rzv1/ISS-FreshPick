import  {type CartItemRepo} from "../repositories/CartItemRepo.ts";
import type {IRepo} from "../repositories/IRepo.ts";
import {CartItem} from "../models/CartItem.ts";
import type {InventoryService} from "./InventoryService.ts";

export class CartService{
    private repo: IRepo<CartItem>;
    private invService: InventoryService;

    constructor(repo: CartItemRepo, srv: InventoryService) {
        this.repo = repo;
        this.invService = srv;
    }

    public addCartItem(userId: number, batchId: number, productName: string, price: number){
        if(this.invService.findBatchItem(batchId)){
            const item = new CartItem(0, userId, batchId, productName, 1, price);
            return this.repo.save(item);
        }
        return null;
    }
}