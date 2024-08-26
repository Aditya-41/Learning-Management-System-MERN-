import {Router} from 'express';
import { addLectureToCourseById, createCourse, getAllCourses, getLectureByCourseId, removeCourse, updateCourse } from '../controllers/courseControllers.js';
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from '../middlewares/authmiddleware.js';
import upload from '../middlewares/multer-middle.js';

const router = Router();
router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    );
    
    

router.route('/:id')
    .get(isLoggedIn ,authorizeSubscriber, getLectureByCourseId)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse
    )
    .post(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        upload.single('lecture'),
        addLectureToCourseById
    );


export default router;