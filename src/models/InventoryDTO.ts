export interface Item{
    id: number;
    name: string;
    units: number;
    status: 'Fresh' | 'Expired';
    imageSrc: string;
}

export interface InventoryDTO{
    totalItems: number;
    expiringSoon: number;
    items: Item[];
}