export class CartItem{
    public readonly id: number;
    public readonly userId: number;
    public readonly batchId: number;
    public productName: string;
    public selectedQuantity: number;
    public appliedPrice: number;


    constructor(id: number, userId: number, batchId: number, productName: string, selectedQuantity: number, appliedPrice: number) {
        this.id = id;
        this.userId = userId;
        this.batchId = batchId;
        this.productName = productName;
        this.selectedQuantity = selectedQuantity;
        this.appliedPrice = appliedPrice;
    }
}