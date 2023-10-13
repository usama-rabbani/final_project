import express from "express";
import {registerController, loginController, testController, forgetController} from '../controller/authcontroller.js'
import {isAdmin, requireSignin} from '../middlewares/authmiddleware.js'

// router object

const router = express.Router()

// routing
// regiter / post Method

router.post('/registered', registerController)

//test JWT

router.get('/test' , requireSignin  , testController)

//login || post method

router.post('/login' , loginController)

// forget password

router.post('/forget' , forgetController )

// user protected Route 

router.get('/user' , requireSignin ,(req,res)=>{
    res.status(200).send({ok:true})
} )

// Admin protected routes

router.get('/admin' , requireSignin, isAdmin ,(req,res)=>{
    res.status(200).send({ok:true})
} )
export default router