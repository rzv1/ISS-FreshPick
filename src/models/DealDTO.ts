export class DealDTO{
    public readonly productName: string;
    public readonly originalPrice: number;
    public readonly discountedPrice: number;
    public readonly quantityAvailable: number;
    public readonly closestExpiry: Date;


    constructor(productName: string, originalPrice: number, discountedPrice: number, quantityAvailable: number, closestExpiry: Date) {
        this.productName = productName;
        this.originalPrice = originalPrice;
        this.discountedPrice = discountedPrice;
        this.quantityAvailable = quantityAvailable;
        this.closestExpiry = closestExpiry;
    }
}