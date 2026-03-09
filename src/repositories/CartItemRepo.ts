import type {CartItem} from "../models/CartItem.ts";
import type {OrderItem} from "../models/OrderItem.ts";
import type {Order} from "../models/Order.ts";

export class CartItemRepo{
    private urlAPI = 'http://localhost:3000/cartItems';

    async findAllByUser(userId: number): Promise<CartItem[]> {
        const res = await fetch(this.urlAPI + "/users/" + userId);
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

    async saveOrderItem(item: OrderItem): Promise<OrderItem | undefined> {

    }

    async saveOrder(item: Order): Promise<Order | undefined> {
        const res = await fetch(this.)
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