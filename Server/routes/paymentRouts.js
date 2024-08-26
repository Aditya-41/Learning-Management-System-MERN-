import {Router} from 'express';
import { allPayments, buyScription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/paymentController.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/authmiddleware.js';

const router = Router();

router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    )


router
    .route('/subscribe')
    .post(
        isLoggedIn,
        buyScription
    )

router
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    )

router
    .route('/unsubscribe')
    .post(
        isLoggedIn,
        cancelSubscription
    )

router
    .route('/')
    .get(
        isLoggedIn,
        authorizedRoles("ADMIN"),
        allPayments
    )

export default router;
