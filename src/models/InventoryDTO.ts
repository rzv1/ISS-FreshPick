import  {type BatchItem} from "./BatchItem.ts";

export class InventoryDTO{
    public readonly batches: Array<BatchItem>;
    public readonly totalItems: number;
    public readonly totalExpired: number;


    constructor(batches: Array<BatchItem>, totalItems: number, totalExpired: number) {
        this.batches = batches;
        this.totalItems = totalItems;
        this.totalExpired = totalExpired;
    }
}