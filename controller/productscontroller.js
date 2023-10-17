 import productsmodel from "../models/productsmodel.js";
import slugify from "slugify"
import fs from 'fs'
import { request } from "http";
export const Createproduct = async (req, res) => {

    const { name, description, category, price, quantity, shipping, slug } = req.fields
    const { image } = req.files

    // Validation

    switch (true) {
        case !name:
            return res.status(500).send({ error: 'PName is Required' })

        case !description:
            return res.status(500).send({ error: 'PDescription is Required' })

        case !category:
            return res.status(500).send({ error: 'PCategory is Required' })

        case !price:
            return res.status(500).send({ error: 'PPrice is Required' })

        case !quantity:
            return res.status(500).send({ error: 'PQuantity is Required' })

        case !image && image.size > 200000:
            return res.status(500).send({ error: 'Image is Required' })

    }
    const Products =  new productsmodel({...req.fields , slug:slugify(name)})
    if(image){
        Products.image.data = fs.readFileSync(image.path)
        Products.image.contentType = image.type
    }
    await Products.save()
    res.status(201).send({
        success:true,
        message:'product Created Successfully',
        Products
    })
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Product Creating',
            error: error.message,
        });
    }

}


//  Get All Products

export const getproduct = async (req, res) => {

    try {
        const allproducts = await productsmodel.find({}).select("-image").limit(10).sort({sortAt: -1}).populate('category')
        res.status(201).send({
            success:true,
            totalproduct : allproducts.length,
            message:'All Products... ',
            allproducts ,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting Products',
            error: error.message,
        }); 
    }

}


// Get Single Product

export const getsingleproduct  = async (req, res) => {

    try {
        const singleproducts = await productsmodel.findOne({slug:req.params.slug}).select("-image").populate('category')
        res.status(201).send({
            success:true,
           
            message:'Single Product... ',
            singleproducts ,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting Single Products',
            error: error.message,
        }); 
    }

}


// Get Images

export const Getimage  = async (req, res) => {

    try {
        const images= await productsmodel.findById(req.params.pid).select("image")
        if(images.image.data){
            res.set("Content-type" , images.image.contentType);
           return  res.status(200).send(
            images.image.data
             )
        }
        // res.status(201).send({
        //     success:true,
       
        //     message:'Product Image... ',
        //     images ,
        // })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error on Image',
            error: error.message,
        }); 
    }

}


// Delete Product  

export const Deleteproduct =  async (req, res) => {

    try {
        const deleteproducts  = await productsmodel.findByIdAndDelete(req.params.pid).select("-image")
        res.status(201).send({
            success:true,
           
            message:'Product Deleted Successfuly... ',
            deleteproducts ,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Delete Product Failed',
            error: error.message,
        }); 
    }

}

// Update Products

export const Updateproduct = async (req, res) => {
   

    const { name, description, category, price, quantity, shipping, slug } = req.fields
    const { image } = req.files

    // Validation

    switch (true) {
        case !name:
            return res.status(500).send({ error: 'PName is Required' })

        case !description:
            return res.status(500).send({ error: 'PDescription is Required' })

        case !category:
            return res.status(500).send({ error: 'PCategory is Required' })

        case !price:
            return res.status(500).send({ error: 'PPrice is Required' })

        case !quantity:
            return res.status(500).send({ error: 'PQuantity is Required' })

        case !image && image.size > 200000:
            return res.status(500).send({ error: 'Image is Required' })

    }
    try {
        const updatedProduct = await productsmodel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (image) {
            updatedProduct.image.data = fs.readFileSync(image.path);
            updatedProduct.image.contentType = image.type;
        }

        await updatedProduct.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Updation Failed',
            error: error.message,
        });
    }

}