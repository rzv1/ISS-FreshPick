export class Product{
    public readonly id: number;
    public name: string;
    public imageURL: string;
    public basePrice: number;
    public fixedDurationHours: number;

    constructor(id: number, name: string, imageURL: string, basePrice: number, fixedDurationHours: number) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.basePrice = basePrice;
        this.fixedDurationHours = fixedDurationHours;
    }
}