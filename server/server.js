import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import {clerkMiddleware} from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebHooks";

connectDB()

const app = express()
app.use(cors())

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks
app.use("/api/clerk", clerkWebHooks);

app.get('/', (req, res) => res.send("API berjalan dengan baik"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));