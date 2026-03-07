export interface OrderDTO{
    total: number;
    lastOrder: Date;
    numberOfOrders: number;
    orders: {
        id: number;
        userId: number;
        totalAmount: number;
        timestamp: Date;
    }[]
}