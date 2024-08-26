import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const res = axiosInstance.get("/courses");
        toast.promise(res, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });
        // console.log("Hii there");
        
        return (await res).data.courses;
    } catch(error) {
        toast.error(error?.res?.data?.message);
    }
}); 

export const createNewCourse = createAsyncThunk("/course/create",async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const responce = axiosInstance.post("/courses",formData);
        toast.promise(responce,{
            loading : "Creating New Course",
            success : "Course Created Successfully",
            error : "Failed to Create Course"
        })

        return (await responce).data
    } catch (error) {
        toast.error(error?.responce?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                console.log(action.payload);
                
                state.courseData = [...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;