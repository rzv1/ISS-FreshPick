import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import {PrismaPg} from "@prisma/adapter-pg"
import {PrismaClient} from "./generated/prisma/client";
import * as process from "node:process";

const app = express();
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({adapter});

app.use(cors());
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
       res.status(201).json(newUser);
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
        res.status(400).json({err: err.message})
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

app.listen(3000, () => console.log("Server running on port 3000"));