import User from '../models/User.js';
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

        if (!data || !type) {
            return res.status(400).json({ success: false, error: "Invalid payload" });
        }

        const userData = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address || '',
            username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;

            default:
                console.log(`Unhandled event type: ${type}`);
        }

        res.json({ success: true, message: "Webhook processed" });

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

export default clerkWebHooks;