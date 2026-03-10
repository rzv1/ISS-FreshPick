export class OrderItem{
    public readonly id: number;
    public readonly orderId: number;
    public readonly productName: string;
    public readonly quantity: number;
    public readonly imageURL: string;
    public readonly price: number;


    constructor(id: number, orderId: number, productName: string, quantity: number, imageURL: string, price: number) {
        this.id = id;
        this.orderId = orderId;
        this.productName = productName;
        this.quantity = quantity;
        this.imageURL = imageURL;
        this.price = price;
    }
}