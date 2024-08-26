import cloudinary, { v2 } from 'cloudinary';
import Razorpay from 'razorpay';
import app from './app.js';
import connectionToDB from './config/dbConnections.js';

const PORT = process.env.PORT || 5014;
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_SECRET
})

app.listen(PORT, async() => {
    await connectionToDB();
    console.log(`App is Running at http:localhost:${PORT}`);
});