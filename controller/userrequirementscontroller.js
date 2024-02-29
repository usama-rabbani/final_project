
import slugify from "slugify"
import RequiredSchema from '../models/userrequirementsmodel.js'
import fs from 'fs'
import { request } from "http";


export const userrequirements = async (req, res) => {
    const { name, category, quantity , slug, size } = req.fields
    const { image } = req.files
    // Validation
    switch (true) {
        case !name:
            return res.status(500).send({ error: 'Name is Required' })
        case !category:
            return res.status(500).send({ error: 'Category is Required' })
        case !size:
            return res.status(500).send({ error: 'Size is Required' })
        case !quantity:
            return res.status(500).send({ error: 'Quantity is Required' })
        case !image:
            return res.status(500).send({ error: 'Image is Required' })
    }

    // Create new product
    const Products = new RequiredSchema({ ...req.fields, slug: slugify(name) })
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