
import productsmodel from "../models/productsmodel.js";
import slugify from "slugify"
import createcategory from '../models/createcategory.js'
import fs from 'fs'
import { request } from "http";
import orders from "../models/orders.js";
import braintree from 'braintree';

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '8sqhcx7sn3p2359g',
    publicKey: '3hkhrxkxcbqfxqfy',
    privateKey: '25bc040be480a73a19de3dc6ff239411',
  });


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
        case !image:
            return res.status(500).send({ error: 'Image is Required' })
    }

    // Create new product
    const Products = new productsmodel({ ...req.fields, slug: slugify(name) })
    if (image) {
        Products.image.data = fs.readFileSync(image.path)
        Products.image.contentType = image.type
    }
    await Products.save()
    res.status(201).send({
        success: true,
        message: 'product Created Successfully',
        Products
    })

}


//  Get All Products

export const getproduct = async (req, res) => {

    try {
        const allproducts = await productsmodel.find({}).select("-image").limit(10).sort({ sortAt: -1 })
        res.status(201).send({
            success: true,
            totalproduct: allproducts.length,
            message: 'All Products... ',
            allproducts,
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

export const getsingleproduct = async (req, res) => {

    try {
        const singleproducts = await productsmodel.findOne({ slug: { $regex: new RegExp(req.params.slug, "i") } }).select("-image");


        res.status(201).send({
            success: true,

            message: 'Single Product... ',
            singleproducts,
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

export const Getimage = async (req, res) => {

    try {
        const images = await productsmodel.findById(req.params.pid).select("image")
        if (images.image.data) {
            res.set("Content-type", images.image.contentType);
            return res.status(200).send(
                images.image.data
            )
        }

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

export const Deleteproduct = async (req, res) => {

    try {
        const deleteproducts = await productsmodel.findByIdAndDelete(req.params.pid).select("-image")
        res.status(201).send({
            success: true,

            message: 'Product Deleted Successfuly... ',
            deleteproducts,
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

        case !image:
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

// Filter Products

export const filtercontroller = async (req, res) => {

    try {
        const { radio, checked } = req.body
        let args = {}
console.log(checked);
console.log(radio);


if (checked && checked.length > 0) {
    args.category = { $in: checked }; 
}

if (radio && radio.length) {
    args.price = { $gte: radio[0], $lte: radio[1] };
}
        const Filterproducts = await productsmodel.find(args)

        res.status(200).send({ success: true, Filterproducts }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Filtering Failed',
            error: error.message,
        });
    }

}

// Count Products

export const countcontroller = async (req, res) => {
    try {
        const Filterscount = await productsmodel.find({}).estimatedDocumentCount();
        res.status(200).send({ success: true, Filterscount })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'counting Failed',
            error: error.message,
        });
    }
}

//pagination



export const pagecontroller = async (req, res) => {
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page : 1;
        const pagefilter = await productsmodel
            .find({})
            .select("-photo")
            .skip((page - 1) * perpage)
            .limit(perpage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            pagefilter,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// Search Products 


export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productsmodel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};


// similar products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const Similar = await productsmodel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-image")
            .limit(3)
        console.log("Similar products:", Similar);

        res.status(200).send({
            success: true,
            Similar,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};


// GET PRODUCT BY CAtegory

export const categorywiseController = async (req, res) => {
    try {
        // const catgory = await createcategory.findOne({ slug: req.params.slug }); 
        const Prducts = await productsmodel.find({ category: req.params.slug });
        res.status(200).send({
            success: true,
            catgory: req.params.slug,
            Prducts,

        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting category product",
            error,
        });
    }
}

// Payment Gateway

export const braintreeController = async (req, res) => {

    try {
        gateway.clientToken.generate({}, function (err, response) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(response);
          }
        });
      } catch (error) {
        console.log(error);
      }

}


//Braintree Payment

export const braintreepaymentController = async (req, res) => {

    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map((i) => { total += i.price });

        let newTransaction = gateway.transaction.sale(
            {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
          function (error, result) {
                if (result) {
                    const order = new orders({
                        product: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error)
                }
            }
        )

    } catch (error) {
        console.log(error);
      
    }

}


// Rough Payment
export const  roughtesting = async (req,res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json({ clientToken: response.clientToken });
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }



  //    next 


  export const  paymentgg = async (req,res) => {
    try {
      const { paymentMethodNonce, user_id } = req.body;
  
      const transaction = await gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce,
        options: {
          submitForSettlement: true,
        },
      });
  
      if (transaction.success) {
        res.status(200).json({ result: 'success' });
      } else {
        res.status(500).json({ result: 'failure' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }