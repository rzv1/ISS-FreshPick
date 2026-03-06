import type {IRepo} from "./IRepo.ts";
import type {CartItem} from "../models/CartItem.ts";

export class CartItemRepo implements IRepo<CartItem>{
    findAll(): CartItem[] {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): CartItem | undefined {
        throw new Error("Method not implemented.");
    }
    save(item: CartItem): void {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
}