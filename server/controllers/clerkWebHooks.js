// clerkWebHooks.js
import connectDB from "../configs/db.js";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        await connectDB(); // ✅ WAJIB ADA supaya koneksi MongoDB aktif

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const payload = wh.verify(req.body, headers);
        const { data, type } = payload;

        if (type === "user.created") {
            await User.create({
                _id: data.id,
                email: data.email_addresses[0].email_address,
                username: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            });
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("❌ Clerk Webhook error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

export default clerkWebHooks;
