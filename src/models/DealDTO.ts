export interface DealDTO{
    id: number;
    productName: string;
    originalPrice: number;
    discountedPrice: number;
    quantityAvailable: number;
    closestExpiry: Date;
}