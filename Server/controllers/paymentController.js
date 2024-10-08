//import subscriptions from "razorpay/dist/types/subscriptions.js";
import User from "../models/userModel.js";
import { razorpay } from "../server.js";  
import AppError from '../utils/errorUtil.js';
import crypto from 'crypto';

export const getRazorpayApiKey = async (req,res,next)=> {
    try{
        res.status(200).json({
            success: true,
            message: 'RAZORPAY API Key',
            key: process.env.RAZORPAY_KEY_ID
        });
    }
    catch(e){
        return next(new AppError(e.message,500));
    }
    
}

export const buyScription = async (req,res,next)=> {
    try{
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(
                new AppError('Unautherized, Please Login')
            )
        }
        if(user.role === 'ADMIN'){
            return next(
                new AppError(
                    'ADMIN cannot purchase a subscription',400
                )
            )
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: RAZORPAY_PLAN_ID,
            customer_notify:1 ,
            total_counts: 12
        })

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscribed Successfully",
            subscription_id : subscription.id
        });
    }
    catch(e){
        return next(new AppError(e.message,500));
    }

    
}

export const verifySubscription = async (req,res,next)=> {
    try{
        const {id} = req.user;
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
    
        const user = await User.findById(id);
    
        if(!user){
            return next(
                new AppError('Unautherized, Please Login')
            )
        }
    
        const subscriptionId = user.subscription.id;
    
        const generatedSignature = crypto
            .createHmac('sha256',process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id} | ${subscriptionId}`)
            .digest('hex')
    
        if(generatedSignature !== razorpay_signature){
            return next(
                new AppError('Payment not verified, Please try Later',500)
            )
        }
    
        await payments.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
        });
    
        user.subscription.status = 'active';
        await user.save();
        res.status(200).json({
            success: true,
            message: "Payment Created and Verifed Successfully"
        })
    }
    catch(e){
        return next(new AppError(e.message,500));
    }
}

export const cancelSubscription = async (req,res,next)=> {
    try{
        const {id} = req.user;
        const user = await User.findById(id);
        if(!user){
            return next(
                new AppError('Unautherized, Please Login')
            )
        }
        if(user.role === 'ADMIN'){
            return next(
                new AppError(
                    'ADMIN cannot purchase a subscription',400
                )
            )
        }

        const subscriptionId = user.subscription.id;

        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId
        )

        user.subscription.status = "Inactive";
    }
    catch(e){
        return next(new AppError(e.message,500));
    } 
}

export const allPayments = async (req,res,next)=> {
    const {count} = req.query;

    const subscription = await razorpay.subscriptions.all({
        count: count|| 10,
    });

    res.status(200).json({
        success: true,
        message: " All payments",
        subscription
    }) 
}

