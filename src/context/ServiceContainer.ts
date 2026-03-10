import { ProductRepo } from '../repositories/ProductRepo';
import { UserRepo } from '../repositories/UserRepo';
import { BatchItemRepo } from '../repositories/BatchItemRepo';
import { CartItemRepo } from '../repositories/CartItemRepo';

import { AuthService } from '../services/AuthService';
import { InventoryService } from '../services/InventoryService';
import { CartService } from '../services/CartService';
import {OrderRepo} from "../repositories/OrderRepo.ts";

export class ServiceContainer {
    public readonly productRepo = new ProductRepo();
    public readonly userRepo = new UserRepo();
    public readonly batchRepo = new BatchItemRepo();
    public readonly cartItemRepo = new CartItemRepo();
    public readonly orderRepo = new OrderRepo();

    public readonly authService = new AuthService(this.userRepo);
    public readonly inventoryService = new InventoryService(this.productRepo, this.batchRepo, this.orderRepo);
    public readonly cartService = new CartService(this.cartItemRepo, this.orderRepo, this.inventoryService);
}

export const services = new ServiceContainer();