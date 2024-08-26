import {Router} from 'express';
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from '../controllers/userControllers.js';
import { isLoggedIn } from '../middlewares/authmiddleware.js';
import upload from '../middlewares/multer-middle.js';

const router = Router();
router.post('/register', upload.single("avatar"), register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.put('/update',isLoggedIn ,upload.single("avatar"),updateUser)
export default router
