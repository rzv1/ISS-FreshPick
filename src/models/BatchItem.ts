export class BatchItem{
    public readonly id: number;
    public readonly productId: number;
    public readonly addedAt: Date;
    public readonly expiresAt: Date;
    public readonly quantity: number;

    constructor(id:number, productId:number, addedAt:Date, expiresAt:Date, quantity:number) {
        this.id = id;
        this.productId = productId;
        this.addedAt = addedAt;
        this.expiresAt = expiresAt;
        this.quantity = quantity;
    }
}