import Course from "../models/courseModel.js"
import AppError from '../utils/errorUtil.js';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';

const getAllCourses = async function(_req,res,next){
    try{
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: "All courses",
            courses,
        });
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }

    

}
const getLectureByCourseId = async function(req,res,next){
    try{
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return next(new AppError('Invalid course id or course not found.', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures,
        });
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}

const createCourse = async(req,res,next) => {
    try{
        const {title,description, category, createdBy} = req.body;

        if(!title || !description || !category || !createdBy){
            return next(
                new AppError("All fields are required",400)
            )
        }
        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail : {
                public_id : "Dummy",
                secure_url: "Dummy"
            }
        });

        if(!course){
            return next(
                new AppError("Course could not be created, Please try again",500)
            )
        }
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "LMS-MERN"
            });
            if(result){
                course.thumbnail.public_id =result.public_id ;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();
        res.status(200).json({
            success: true,
            message: "Course created succesfully",
            course,
        });
    }
    catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}
const updateCourse = async(req,res,next) => {
    try{
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set : req.body
            },
            {
                runValidators: true
            }
        );
  
        if(!course){
            return next(
                new AppError("Course is not Found",500)
            )
        }
        res.status(200).json({
            success: true,
            message: "Course Updated Succesfully !",
            course
        })
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}
const removeCourse = async(req,res,next) => {
    try{
        const{ id } = req.params;
        const course = await Course.findById(id);
        if(!course){
            return next(
                new AppError("Course is not Found",500)
            )
        }
        await Course.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Course Deleted Succesfully !"
        })
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}

const addLectureToCourseById = async(req,res,next) =>{
    try{
        const {title,description} = req.body;
        const {id} = req.params;

        if(!title || !description){
            return next(
                new AppError("All fields are required",400)
            )
        }

        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError("Course Does not exists",500)
            )
        }
        const lectureData = {
            title,
            description,
            lecture: {
                public_id: "sdss",
                secure_url: "wsws"
            }
        };
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "LMS-MERN"
            });
            if(result){
                lectureData.lecture.public_id =result.public_id ;
                lectureData.lecture.secure_url = result.secure_url;
            }

        fs.rm(`uploads/${req.file.filename}`);
        }
        course.lectures.push(lectureData);

        course.numbersOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture added succesfully to course ",
            course

        })

    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}


export {
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}