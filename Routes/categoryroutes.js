import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js'
import {category , updatecategory , allcategories , Singlecategories , Deletecategory }from '../controller/categorycontroller.js'

const router = express.Router()
// Create Category

router.post('/categories', category );


//router.post('/categories', requireSignin, isAdmin, category );
// Update Category

router.put ('/updatecategories/:_id',  updatecategory );

//router.put ('/updatecategories/:id', requireSignin, isAdmin, updatecategory );
// Get All Categories

router.get ('/allcategories',  allcategories );

// Get Single Category

router.get ('/singlecategories/:slug',  Singlecategories );

// Delete Category
router.delete ('/deletecategories/:id', Deletecategory );
//router.delete ('/deletecategories/:id', requireSignin, isAdmin, Deletecategory );

export default router 


