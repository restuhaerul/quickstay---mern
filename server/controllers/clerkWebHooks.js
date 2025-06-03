import User from '../models/user.js';
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try{
        // buat svix instance dengan clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Dapatkan Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verifikasi Headers
        await whook.verify(JSON.stringify(req.body), headers)

        // Dapatkan data dari request body
        const {data, type} = req.body

        const userData = {
            _id: data.id,
            email: data.email_adresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        // Switch Cases dengan Events yang berbeda
        switch (key) {
            case "user.created":{
                await User.create(userData);
                break;
            }

            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
            }

            default:
                break;
        }
        res.json({success: true, message: "Webhook Diterima"})

    } catch (error){
        console.error(error.message);
        res.json({success: false, error: error.message});
    }
}

export default clerkWebHooks;