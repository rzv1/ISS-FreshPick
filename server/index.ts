import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import {PrismaPg} from "@prisma/adapter-pg"
import {PrismaClient} from "./generated/prisma/client";
import * as process from "node:process";
import {DealDTO} from "../src/models/DealDTO";
import * as os from "node:os";

const app = express();
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({adapter});

app.use(cors({
    origin: 'https://iss-harvest.vercel.app'
}));
app.use(express.json());

app.post('/products', async (req, res) => {
   const {name, basePrice, imageURL, TTL} = req.body;

   try{
       const newProduct = await prisma.product.create({
           data: {
               name,
               basePrice: parseFloat(basePrice),
               TTL: parseInt(TTL),
               imageURL: imageURL || ""
           }
       });
       res.status(201).json(newProduct);
   } catch (err) {
       res.status(400).json({ err : err.message});
   }
});

app.get('/products', async (_req, res) => {
   try{
       const prod = await prisma.product.findMany();
       res.json(prod)
   } catch (err) {
       res.status(400).json({err: err.message})
   }
});

app.get('/products/:id', async (req, res) => {
    try{
        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json(product);
    } catch (err) {
        res.json({err: err.message})
    }
})

app.post('/users', async (req, res) => {
   const {username, password, role} = req.body;

   try {
       const newUser = await prisma.user.create({
           data: {
               username,
               password,
               role
           }
       })

       res.status(201).json(process.env.DATABASE_URL!)
       //res.status(201).json(newUser);
   }
   catch (err) {
       res.status(400).json({err: err.message})
   }
});

app.post('/users/login', async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({err: err.message + process.env.DATABASE_URL})
    }
});

app.get('/batches', async (_req, res) => {
    try{
        const batches = await prisma.batch.findMany();
        res.json(batches);
    }
    catch(err){
        res.status(500).json("error" + err)
    }
})

app.post('/batches', async (req, res) => {
    const { productId, addedAt, expiresAt, quantity } = req.body;
    try{
        const newBatch = await prisma.batch.create({
            data: {
                addedAt: new Date(addedAt),
                expiresAt: new Date(expiresAt),
                quantity: Number(quantity),
                product: {
                    connect : {id: Number(productId) }
                }
            }
        })
        res.status(201).json(newBatch);
    } catch (err) {
        res.json({err: err.message});
    }
})

app.post('/orders', async (req, res) => {
    const { total, userId } = req.body;
    try {
        const newOrder = await prisma.order.create({
            data: {
                userId: userId,
                total: Number(total)
            }
        })
        res.status(201).json(newOrder)
    } catch (err) {
        res.json({err: err.message});
    }
})

app.get('/orders/:id', async (req, res) => {
    try{
        const orders = await prisma.order.findMany({
            where: {
                userId: Number(req.params.id)
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
        res.json(orders);
    } catch (err){
        res.status(500).json("error" + err);
    }
})

app.post('/orderItems', async (req, res) => {
    const { orderId, price, productName, imageURL, quantity } = req.body;
    try {
        const newOrderItem = await prisma.orderItem.create({
            data: {
                orderId: orderId,
                price: price,
                imageURL: imageURL,
                quantity: quantity,
                productName: productName
            }
        })
        res.status(201).json(newOrderItem);
    } catch (err) {
        res.json({err: err.message});
    }
})

app.get('/orderItems/:id', async (req, res) => {
    try{
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId: Number(req.params.id)
            }
        });
        res.json(orderItems);
    } catch (err){
        res.status(500).json("error" + err);
    }
})

app.post('/cartItems', async (req, res) => {
    const { batchId, appliedPrice, discountedPrice, productName, imageURL, quantity, userId } = req.body;
    try{
        const cartItem = await prisma.cartItem.create({
            data: {
                batchId: batchId ? Number(batchId) : null,
                quantity: quantity,
                userId: Number(userId),
                appliedPrice: Number(appliedPrice),
                discountedPrice: Number(discountedPrice),
                productName: productName,
                imageURL: imageURL
            }
        })
        res.json(cartItem);
    } catch(err){
        res.json({err: err.message})
    }
})

app.get('/cartItems/:id', async (req, res) => {
    try{
        const cartItems = await prisma.cartItem.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json(cartItems);
    } catch (err){
        res.status(500).json("error" + err);
    }
})

app.patch('/batches/:id', async (req, res) => {
    try{
        const batch = await prisma.batch.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                quantity: Number(req.body.quantity)
            }
        })
        res.json(batch);
    } catch (err){
        res.json({err: err.message})
    }
})

app.patch('/cartItems/:id', async (req, res) => {
    try{
        const cartItem = await prisma.cartItem.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                quantity: Number(req.body.quantity)
            }
        })
        res.json(cartItem);
    } catch (err){
        res.json({err: err.message});
    }
})

app.get('/cartItems/users/:id', async (req, res) => {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: Number(req.params.id)
            }
        })
        res.json(cartItems);
    } catch (err){
        res.status(500).json("error" + err);
    }
})

app.delete('/cartItems/:id', async (req, res) => {
    try {
        const cartItem = await prisma.cartItem.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(cartItem);
    } catch (err) {
        res.json({err: err.message});
    }
})

app.delete('/batches/:id', async (req, res) => {
    try{
        const batch = await prisma.batch.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(batch)
    } catch (err){
        res.json({err: err.message})
    }
})

app.get('/batches/deals', async (req, res) => {
    try{
        const now = new Date();
        const batches = await prisma.batch.findMany({
            where: {
                expiresAt: {
                    gt: now
                }
            },
            include: {
                product: true
            }
        })
        const groupedByProduct: Record<string, typeof batches> = {};

        batches.forEach(batch => {
            const productName = batch.product.name;
            if (!groupedByProduct[productName]){
                groupedByProduct[productName] = [];
            }
            groupedByProduct[productName].push(batch);
        })

        const finalDeals: DealDTO[] = Object.values(groupedByProduct).map(batches => {
            const sorted = batches.sort((a, b) => {
                return a.expiresAt.getTime() - b.expiresAt.getTime()
            })
            const closestBatch = sorted[0];
            let discountedPrice = 0;
            const diffInMs = closestBatch.expiresAt.getTime() - new Date().getTime()
            const numberOfHours = diffInMs / (1000 * 60 * 60)
            if (numberOfHours < 12)
                discountedPrice = 0.5
            else if (numberOfHours < 24)
                discountedPrice = 0.65
            else if (numberOfHours < 36)
                discountedPrice = 0.8
            else
                discountedPrice = 0.9

            return {
                batchId: closestBatch.id,
                imageURL: closestBatch.product.imageURL,
                productName: closestBatch.product.name,
                originalPrice: Number(closestBatch.product.basePrice),
                discountedPrice: discountedPrice,
                quantityAvailable: closestBatch.quantity,
                closestExpiry: closestBatch.expiresAt
            }
        })
        res.status(200).json(finalDeals)
    } catch(err){
        res.json({err: err.message})
    }
})

app.get('/batches/product/:id', async (req, res) => {
    try {
        const batches = await prisma.batch.findMany({
            where: {
                productId: Number(req.params.id)
            }
        })
        res.json(batches)
    } catch (err){
        res.json({err: err.message})
    }
})

app.get('/batches/:id', async (req, res) => {
    try{
        const batch = await prisma.batch.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(batch)
    } catch (err) {
        res.json({err: err.message})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});