export class Order{
    public readonly id: number;
    public readonly userId: number;
    public readonly total: number;
    public readonly timestamp: Date;

    constructor(id: number, userId: number, totalAmount: number, timestamp: Date) {
        this.id = id;
        this.userId = userId;
        this.total = totalAmount;
        this.timestamp = timestamp;
    }
}