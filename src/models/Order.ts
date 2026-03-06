export class Order{
    public readonly id: number;
    public readonly userId: number;
    public readonly totalAmount: number;
    public readonly timestamp: Date;

    constructor(id: number, userId: number, totalAmount: number, timestamp: Date) {
        this.id = id;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.timestamp = timestamp;
    }
}