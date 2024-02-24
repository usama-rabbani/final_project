import createcategory  from "../models/createcategory.js"
import slugify from "slugify"
export const category = async (req, res) => {
    try {
      const { name } = req.body;
     
      if (!name) {
        return res.status(401).send({
          message: 'Name is Missing',
        });
      }
      const slug = slugify(name);
      const existingCategory = await createcategory.findOne({ name, slug  });
  
      if (existingCategory) {
        return res.status(200).send({
          success: true,
          message: 'Category is Already Exists',
          category: existingCategory,
        });
      }
  
      const result = await new createcategory({
        name,slug,
      }).save();
  
      res.status(201).send({
        success: true,
        message: 'New Category is Created',
        category: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in Category',
        error: error.message,
      });
    }
  };


  // Update Category

  export const updatecategory = async (req ,res)=>{

try {
  
   const { name } = req.body;
   const { _id } = req.params;
   const slug = slugify(name);
   const updatecat= await createcategory.findByIdAndUpdate(_id,{ name, slug }, {new:true} );
   console.log(updatecat);
   return res.status(200).send({
    success: true,
    message: 'Category is Updated Successfully',
    updatecat
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: 'Error in Update Category',
    error: error.message,
  });
}
  }


  // Get All Categories

  export const allcategories = async(req,res)=>{
try {
  const getallcategory= await createcategory.find({});
  return res.status(200).send({
  
    success: true,
    message: 'All Caategories Are Here',
    getallcategory,
  });

} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: 'Error in Categories',
    error: error.message,
  })
  
}
  }


  // Get Single Category

  export const Singlecategories = async(req,res)=>{
    try {
      const getsinglecategory = await createcategory.findOne({slug:req.params.slug});
      return res.status(200).send({
              success: true,
        message: 'Single Category',
        getsinglecategory,
      });
    
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in Findling Single Category',
        error: error.message,
      })
      
    }
      }
    

      // Delete Category
      
      export const Deletecategory = async(req,res)=>{
        try {
          const {id} = req.params
          const deletecategory = await createcategory.findByIdAndDelete(id);
          return res.status(200).send({
                  success: true,
            message: 'Delete Category',
            deletecategory,
          });
        
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: 'Error in Deleting Category',
            error: error.message,
          })
          
        }
          }
        