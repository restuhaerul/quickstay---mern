import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebHooks.js";

const app = express();

// ✅ Harus pakai raw di endpoint Clerk webhook
app.use("/api/clerk", express.raw({ type: "*/*" }), clerkWebHooks);

// Middleware lainnya
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API berjalan dengan baik"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
