export class OrderItem{
    public readonly id: number;
    public readonly orderId: number;
    public readonly productName: string;
    public readonly selectedQuantity: number;
    public readonly appliedPrice: number;


    constructor(id: number, orderId: number, productName: string, selectedQuantity: number, appliedPrice: number) {
        this.id = id;
        this.orderId = orderId;
        this.productName = productName;
        this.selectedQuantity = selectedQuantity;
        this.appliedPrice = appliedPrice;
    }
}