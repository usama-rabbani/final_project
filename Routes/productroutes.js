import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js'
import {Createproduct, getproduct , getsingleproduct , Getimage , Deleteproduct , Updateproduct , filtercontroller, countcontroller , pagecontroller ,searchProductController , realtedProductController , categorywiseController, braintreeController,braintreepaymentController , roughtesting ,paymentgg } from '../controller/productscontroller.js'
import formidable from 'express-formidable'
import fs from 'fs'
const router = express.Router()

                                       // Routes 

// Create Products                  

router.post ('/createproduct', formidable() , Createproduct );

//router.post ('/createproduct', requireSignin , isAdmin , formidable() , Createproduct );

// Get all Data

router.get ('/getallproduct',  getproduct );

//Get Single Product

router.get ('/singleproduct/:slug',  getsingleproduct );

// Get Images

router.get ('/getimage/:pid', Getimage);

// Delete Product

router.delete ('/deleteproduct/:pid',  Deleteproduct );

// Update Products

router.put ('/updateproduct/:pid', formidable() , Updateproduct );
//router.put ('/updateproduct/:pid', requireSignin , isAdmin , formidable() , Updateproduct );

// Filter Products

router.post ('/filterproducts',  filtercontroller );

// count product

router.get ('/countproducts',  countcontroller );

//pagination

router.get ('/pageproducts/:page',  pagecontroller ); 

// serach products

router.get("/search/:keyword", searchProductController);

//similar product

router.get("/relatedproduct/:pid/:cid", realtedProductController);

// Categories wise filters

router.get("/categorieswise/:slug", categorywiseController);

// payment Gateway
//Token

router.get("/braintree/token", braintreeController);

// Payment

router.post("/braintree/payment", requireSignin , braintreepaymentController);
// Rough testing

router.get("/checkout", roughtesting);

router.post("/paymentpost", paymentgg );

export default router
 