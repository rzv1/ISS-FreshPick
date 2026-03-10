export class CartItem{
    public readonly id: number;
    public readonly userId: number;
    public readonly batchId: number | null;
    public imageURL: string;
    public productName: string;
    public quantity: number;
    public appliedPrice: number;
    public discountedPrice: number;


    constructor(id: number, userId: number, batchId: number | null, imageURL: string, productName: string, quantity: number, appliedPrice: number, discountedPrice: number) {
        this.id = id;
        this.userId = userId;
        this.batchId = batchId;
        this.imageURL = imageURL;
        this.productName = productName;
        this.quantity = quantity;
        this.appliedPrice = appliedPrice;
        this.discountedPrice = discountedPrice;
    }
}