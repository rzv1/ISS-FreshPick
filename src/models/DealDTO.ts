export interface DealDTO{
    batchId: number;
    imageURL: string;
    productName: string;
    originalPrice: number;
    discountedPrice: number;
    quantityAvailable: number;
    closestExpiry: Date;
}