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


app.listen(3000, () => console.log("Server running on port 3000"));