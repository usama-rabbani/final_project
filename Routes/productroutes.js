import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js'
import {Createproduct, getproduct , getsingleproduct , Getimage , Deleteproduct , Updateproduct} from '../controller/productscontroller.js'
import formidable from 'express-formidable'
import fs from 'fs'
const router = express.Router()

                                       // Routes 

// Create Products

router.post ('/createproduct', requireSignin , isAdmin , formidable() , Createproduct );

// Get all Data

router.get ('/getallproduct',  getproduct );

//Get Single Product

router.get ('/getallproduct/:slug',  getsingleproduct );

// Get Images

router.get ('/getimage/:pid', Getimage);

// Delete Product

router.delete ('/deleteproduct/:pid',  Deleteproduct );

// Update Products

router.put ('/updateproduct/:pid', requireSignin , isAdmin , formidable() , Updateproduct );

export default router
 