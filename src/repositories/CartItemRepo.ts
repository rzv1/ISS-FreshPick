import type {IRepo} from "./IRepo.ts";
import type {CartItem} from "../models/CartItem.ts";

export class CartItemRepo implements IRepo<CartItem>{
    private urlAPI = 'http://localhost:3000/CartItems';

    findAll(): Promise<CartItem[]> {
        throw new Error("Method not implemented.");
    }

    async findAllByUser(userId: number) {
        const res = await fetch(this.urlAPI + "?userId=" + userId);
        if(!res.ok)
            throw new Error("Not found")
        return res.json();
    }

    async findOne(id: number): Promise<CartItem | undefined> {
        const res = await fetch(this.urlAPI + '/' + id)
        if(!res.ok)
            throw new Error("Not found")
        return res.json();
    }
    async save(item: CartItem): Promise<CartItem | undefined> {
        const res = await fetch(this.urlAPI, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(item)
        });
        if(!res.ok)
            throw new Error("CartItem creation error");
        return res.json();
    }

    async delete(itemId: number): Promise<void> {
        const res = await fetch(this.urlAPI + '/' + itemId, {
            method: 'DELETE'
        });
        if(!res.ok)
            throw new Error("error");
    }

    async deleteAllForUser(userId: number) {
        const res = await fetch(this.urlAPI + "?userId=" + userId, {
            method: 'DELETE'
        });
        if(!res.ok)
            throw new Error("error");
    }

    public async updateQuantity(id: number, quantity: number): Promise<CartItem> {
        const res = await fetch(this.urlAPI + "/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({quantity})
        });
        return res.json();
    }
}