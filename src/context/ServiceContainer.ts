import { ProductRepo } from '../repositories/ProductRepo';
import { UserRepo } from '../repositories/UserRepo';
import { BatchItemRepo } from '../repositories/BatchItemRepo';
import { CartItemRepo } from '../repositories/CartItemRepo';

import { AuthService } from '../services/AuthService';
import { InventoryService } from '../services/InventoryService';
import { CartService } from '../services/CartService';

export class ServiceContainer {
    public readonly productRepo = new ProductRepo();
    public readonly userRepo = new UserRepo();
    public readonly batchRepo = new BatchItemRepo();
    public readonly cartItemRepo = new CartItemRepo();

    public readonly authService = new AuthService(this.userRepo);
    public readonly inventoryService = new InventoryService(this.productRepo, this.batchRepo);
    public readonly cartService = new CartService(this.cartItemRepo, this.inventoryService);
}

export const services = new ServiceContainer();