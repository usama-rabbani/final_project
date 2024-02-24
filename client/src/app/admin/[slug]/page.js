'use client'
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams, useRouter , useSearchParams} from 'next/navigation'

const { Option } = Select

function singleproductSlug() {
  const router = useRouter()
  const params = useParams()
  const [categories, setcategories] = useState()
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [price, setprice] = useState()
  const [quantity, setquantity] = useState()
  const [shipping, setshipping] = useState()
  const [category, setcategory] = useState()
  const [id, setid] = useState('')
  const SearchParams = useSearchParams()



// Get All Categories
  const GetAllCat = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/vi/category/allcategories')
      if (data.success) {
        setcategories(data.getallcategory)
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    GetAllCat();
  }, [])


 

   // Get Single Product
   const getProductDetails = async () => {
   
    try {
      const { data } = await axios.get(`http://localhost:8080/api/vi/product/singleproduct/${params.slug}`);
    
        setname(data.singleproducts.name);
        setdescription(data.singleproducts.description);
        setid(data.singleproducts._id);
        setcategory(data.singleproducts.category._id); 
        setprice(data.singleproducts.price);
        setquantity(data.singleproducts.quantity);
        setshipping(data.singleproducts.shipping);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    getProductDetails();
  }, []);



  // Update Products

  const updateproduct= async(e)=>{
    e.preventDefault();
   
    try {
      const ProductD = new FormData()
      ProductD.append("name",name)
      ProductD.append("description",description)
      ProductD.append("price",price)
      ProductD.append("shipping",shipping)
      ProductD.append("quantity",quantity)
      ProductD.append("image",image)
       ProductD.append("category",category)
      const { data } = await axios.put(`http://localhost:8080/api/vi/product/updateproduct/${id}`, ProductD)
      if (data?.success) {
        toast.success('Product is Updated Successfully');
         router.push('/admind')
      }
      else{
        toast.error(data?.message); 
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong') 
    }
  
  }
  


  const deleteproduct = async () => {
    // Prompt the user for confirmation and store the result in a variable
    const confirmation = window.confirm('Are you sure to delete this product?');
    
    if (confirmation) {
      try {
     
        const { data } = await axios.delete(`http://localhost:8080/api/vi/product/deleteproduct/${id}`);
        toast.success('Product is deleted successfully');
        router.push('/admind');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    }
  };
  
  return (
    <main className='items-center justify-center px-6  mx-auto mb-6'>
    
        <Select
          mode="multiple"
          bordered={false}
          placeholder="Select Categories "
          value={category}
          showSearch
          className='lg:w-[50rem] w-full bg-white rounded-lg border-2 border-blue-600 text-black' onChange={(value) => { setcategory(value) }}
        >
      
          {categories?.map((item) => {
            return (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            )
          })}
        </Select>

        <div className="mt-6 ">
        
          <label className=' cursor-pointer hover:bg-red-200 rounded-lg py-2 px-36 bg-red-100'>
            {image ? image.name : "Upload File"}
            <input type="file" name="image" id="" className="lg:w-[50rem]" onChange={(e) => { setimage(e.target.files[0]) }} hidden accept="image/*" ></input>
          </label>
        </div>

        <div className="mt-6 ">
          {image ? (
            <div className=''>
              <img src={URL.createObjectURL(image)} alt="Product-Image" className=' h-28 m-auto' />
            </div>
          ):
          
          (
            <div className=''>
              <img src={`http://localhost:8080/api/vi/product/getimage/${id}`} alt="Product-Image" className=' h-28 m-auto' />
            </div>
            )
        
        }
        </div>

        <div className='mt-4'>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block lg:w-[50rem] w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={name}
            required
          />
          <div className='mt-4'>
          <textarea
  name="description"
  value={description}
  onChange={(e) => setdescription(e.target.value)}
  className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder={description}
  required
/>

            </div>
           <div className='mt-4'>

            <input
            type="number" 
            name="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="price"
            required
            min="0" 
            step="0" 
          />
          </div>
<div className='mt-4'>
<input
type="number" 
name="quantity"
value={quantity}
onChange={(e) => setquantity(e.target.value)}
className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder="Select Quantity"
required
min="0" 
step="0" 
/>
        </div>
<div className='mt-4'>
<select
  name="shipping"
  value={shipping}
  onChange={(e) => setshipping(e.target.value)}
  className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required
>
  
  <option value="1">Yes</option>
  <option value="0">No</option>
  
</select>
      </div>

      <div className='mt-2'>
      <button className='bg-blue-700 rounded-lg text-white px-2 w-full py-1 hover:bg-blue-900' onClick={updateproduct}>Update Product</button>
      </div>

      <div className='mt-2'>
      <button className='bg-red-700 rounded-lg text-white px-2 w-full py-1 hover:bg-red-900' onClick={deleteproduct}>Delete Product</button>
      </div>
     

    
          </div>


    
       
    </main>
  )
}

export default singleproductSlug












