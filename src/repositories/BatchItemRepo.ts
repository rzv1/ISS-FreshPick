import {BatchItem} from "../models/BatchItem.ts";
import type {IRepo} from "./IRepo.ts";

export class BatchItemRepo implements IRepo<BatchItem>{
    public findOne(id: number){
        return new BatchItem();
    }

    public findAll(){
        return true;
    }

    public isAvailable(id: number, quant: number){
        return true;
    }

    public incrementStock(id: number, quant: number){
        return true;
    }

    public decrementStock(id: number, quant: number){
        return true;
    }

    delete(id: number): void {
    }

    save(item: BatchItem): void {
    }
}