import AppError from "../utils/errorUtil.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated, please login again', 401));

    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    next();
}

const authorizedRoles =(...roles) => async(req,_res,next) => {
    const currentUserRoles = req.user.role;
    if(!roles.includes(currentUserRoles)) {
        return next (
            new AppError('You Do not haver Permit',400)
        )
    }
    next();
}

const authorizeSubscriber =  async (req,res,next) => {
    const subscription = req.user.subscription;

    const currentUserRoles = req.user.role;

    if(currentUserRoles !== 'ADMIN' && subscription.status !== 'active'){
        return next(
            new AppError('Please Subscribe First !!',403)
        )
    }
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}