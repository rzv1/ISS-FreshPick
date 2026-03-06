import  {type Order} from "./Order.ts";

export class OrderDTO{
    public readonly orders: Array<Order>;
    public readonly total: number;
    public readonly lastOrder: Date;
    public readonly numberOfOrders: number;


    constructor(orders: Array<Order>, total: number, lastOrder: Date, numberOfOrders: number) {
        this.orders = orders;
        this.total = total;
        this.lastOrder = lastOrder;
        this.numberOfOrders = numberOfOrders;
    }
}