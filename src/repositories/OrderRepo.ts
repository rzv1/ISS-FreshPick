import type {Order} from "../models/Order.ts";
import type {OrderItem} from "../models/OrderItem.ts";

export class OrderRepo {
    private urlAPI = "https://iss-harvest.onrender.com/orders";
    private urlAPIitems = "https://iss-harvest.onrender.com/orderItems"
    public async findAll(id: number): Promise<Order[] | undefined> {
        const res = await fetch(this.urlAPI + "/" + id);
        return res.json()
    }
    public async findAllForOrder(id: number): Promise<OrderItem[] | undefined> {
        const res = await fetch(this.urlAPIitems + "/" + id)
        return res.json();
    }
    public async saveOrder(item: Order): Promise<Order | undefined> {
        const res = await fetch(this.urlAPI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        })
        return res.json()
    }

    public async saveOrderItem(item: OrderItem): Promise<OrderItem | undefined> {
        const res = await fetch(this.urlAPIitems, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        })
        return res.json();
    }
}