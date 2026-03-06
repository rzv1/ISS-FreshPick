import {BatchItem} from "../models/BatchItem.ts";
import type {IRepo} from "./IRepo.ts";

export class BatchItemRepo implements IRepo<BatchItem>{
    private urlAPI='http://localhost:3000/batches';

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

    async delete(id: number): Promise<void> {
        const res = await fetch(this.urlAPI + "/" + id, {
            method: 'DELETE'
        });
        if(!res.ok)
            throw new Error("error");
    }

    async getDeals() {
        const res = await fetch(this.urlAPI + '/deals')
        return res.json();
    }
}