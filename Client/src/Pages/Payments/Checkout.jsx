import { handler } from "@tailwindcss/line-clamp";
import { color } from "chart.js/helpers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getRazorPayId, purchesCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice.js";

function Checkout () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) =>state?.razorpay?.key);
    const subscriptionId = useSelector((state) =>state?.razorpay?.subscription_id);
    const userData = useSelector((state) => state?.auth?.data);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);


    const paymentDetails = {
        razorpay_payment_id : "",
        razorpay_subscription_id : "",
        razorpay_signature : ""
    }

    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscriptionId){
            toast.error("Something went wrong");
            return;
        }
        const option = {
            key : razorpayKey,
            subscription_id : subscriptionId,
            name : "Coursify Pvt.Ltd",
            description : "Subscription",
            theme : {
                color : '#F37254'
            },
            prefill : {
                email : userData.email,
                name : userData.fullName
            },
            handler : async function (responce){
                paymentDetails.razorpay_payment_id = responce.razorpay_payment_id;
                paymentDetails.razorpay_signature = responce.razorpay_signature;
                paymentDetails.razorpay_subscription_id = responce.razorpay_subscription_id;

                toast.success("Payment Successful");
                await dispatch(verifyUserPayment(paymentDetails));
                isPaymentVerified ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }
        const paymentObject = new Window.Razorpay(options);
        paymentObject.open();
    }
    async function load () {
        await dispatch(getRazorPayId());
        await dispatch(purchesCourseBundle());
    }

    useEffect (() => {
        load();
    }, [])

    return (
        <HomeLayout>
            <form 
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] relative rounded-lg">
                    <h1>Subscription Bundle</h1>
                </div>
            </form>
        </HomeLayout>
    );
}

export default Checkout