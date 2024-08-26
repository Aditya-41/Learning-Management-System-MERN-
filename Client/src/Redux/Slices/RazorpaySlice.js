import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key : "",
    subscription_id : "",
    isPaymentVerified : false,
    allPayments : {},
    finalMonths : {},
    monthlySalesRecord : []
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try{
        const responce = await axiosInstance.get("/payments/razorypay-key");
        console.log(responce?.data);
        
        return responce?.data;
    }
    catch(error) {
        toast.error("Failed to Load Data")
    }
});

export const purchesCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try{
        const responce = await axiosInstance.post("/payments/subscribe");
        return responce.data;
    }
    catch(error) {
        toast.error(error?.responce?.data?.message)
    }
});


export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try{
        const responce = await axiosInstance.post("/payments/verify" , {
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id : data.razorpay_subscription_id,
            razorpay_signature : data.razorpay_signature
        });
        return responce.data;
    }
    catch(error) {
        toast.error(error?.responce?.data?.message)
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record", async (data) => {
    try{
        const responce = await axiosInstance.get("/payments?count=100")
        toast.promise(responce,{
            loading : "Getting the payments records",
            success : (data) => {
                return data?.data?.message
            },
            error : "Failed to get Payments Records"
        })
        return (await responce).data;
    }
    catch(error) {
        toast.error("Operation Failed")
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (data) => {
    try{
        const responce = await axiosInstance.post("/payments/unsubscribe")
        toast.promise(responce,{
            loading : "Unsubscribing the Bundle",
            success : (data) => {
                return data?.data?.message
            },
            error : "Failed to Unsubscribe"
        })
        return (await responce).data;
    }
    catch(error) {
        toast.error(error?.responce?.data?.message)
    }
});

const razorpaySlice = createSlice({
    name : "razorpay",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state,action) => {
            console.log(action?.payload?.key);
            
            state.key = action?.payload?.key;
        })
        .addCase(purchesCourseBundle.fulfilled, (state,action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state,action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.isPaymentVerified;
        })
        .addCase(verifyUserPayment.rejected, (state,action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.isPaymentVerified;
        })
        .addCase(getPaymentRecord.fulfilled, (state,action) => {
            //toast.success(action?.payload?.message)
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        })

    }
});

export default razorpaySlice.reducer;

