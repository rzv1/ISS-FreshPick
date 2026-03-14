import {BatchItem} from "../models/BatchItem.ts";
import type {IRepo} from "./IRepo.ts";
import type {DealDTO} from "../models/DealDTO.ts";

export class BatchItemRepo implements IRepo<BatchItem>{
    private urlAPI='https://iss-harvest.onrender.com/batches';

    async findAll(): Promise<BatchItem[]> {
        const res = await fetch(this.urlAPI);
        if(res.status === 401)
            throw new Error("Batch access error");
        return res.json();
    }
    async findOne(id: number): Promise<BatchItem | undefined> {
        const res = await fetch(this.urlAPI + "/" + id);
        if(res.status === 401)
            return undefined;
        return res.json();
    }

    async findByProductId(productId: number): Promise<BatchItem[] | undefined> {
        const res = await fetch(this.urlAPI + "/product/" + productId);
        if(res.status === 401)
            return undefined
        return res.json();
    }

    async save(item: Omit<BatchItem, 'id'>): Promise<BatchItem | undefined> {
        const res = await fetch(this.urlAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if (res.status === 401)
            return undefined;
        return res.json();
    }

    async update(batchId: number, quantity: number): Promise<BatchItem | undefined> {
        const res = await fetch(this.urlAPI + "/" + batchId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({quantity: quantity})
        })
        return res.json();
    }

    async delete(id: number): Promise<void> {
        const res = await fetch(this.urlAPI + "/" + id, {
            method: 'DELETE'
        });
        if(!res.ok)
            throw new Error("error");
    }

    async getDeals(): Promise<DealDTO[]> {
        const res = await fetch(this.urlAPI + '/deals')
        if(!res.ok)
            throw new Error("error");
        return res.json();
    }
}