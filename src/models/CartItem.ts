export class CartItem{
    public readonly id: number;
    public readonly userId: number;
    public readonly batchId: number | null;
    public imageURL: string;
    public productName: string;
    public selectedQuantity: number;
    public appliedPrice: number;


    constructor(id: number, userId: number, imageURL: string, batchId: number | null, productName: string, selectedQuantity: number, appliedPrice: number) {
        this.id = id;
        this.userId = userId;
        this.batchId = batchId;
        this.imageURL = imageURL;
        this.productName = productName;
        this.selectedQuantity = selectedQuantity;
        this.appliedPrice = appliedPrice;
    }
}