'use client'
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const { Option } = Select
function Selectedproduct() {
    const router = useRouter()
    const [categories, setcategories] = useState()
    const [name, setname] = useState('')
    const [image, setimage] = useState('')
    const [size, setsize] = useState()
    const [quantity, setquantity] = useState()

    const [category, setcategory] = useState()

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


  // Create Products
  const handleproduct = async (e) => {
    e.preventDefault();
    console.log(handleproduct);
    try {
      const ProductD = new FormData()
      ProductD.append("name", name)
      ProductD.append("size", size)
      ProductD.append("quantity", quantity)
      ProductD.append("image", image)
      ProductD.append("category", category)
      const { data } = await axios.post('http://localhost:8080/api/vi/required/userreq', ProductD)
      if (data?.success) {
        toast.success('Product is Created Successfully');
        router.push('/')
      }
      else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong')
    }

  }
  return (
    <section>

<motion.div
            initial={{ y: '-100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              stiffness: 100,
              damping: 15,
              duration: 1,
              ease: "easeIn",
            }} className='max-w-[700px] my-8'>

            <Select
              mode="multiple"
              bordered={false}
              placeholder="Select Categories "

              showSearch
              className=' w-full bg-white rounded-lg border-2 border-blue-600 text-black' onChange={(value) => { setcategory(value) }}>
              {categories?.map((item) => {
                return (
                  <Option key={item._id} value={item.name}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>

            <div className="mt-6 text-center">
              <label className='cursor-pointer hover:bg-red-200 rounded-lg py-2 md:px-36 px-16 bg-red-100'>
                Choose Your Logo
                <input type="file" name="img" id="" className="md:w-[50rem] w-full" onChange={(e) => { setimage(e.target.files[0]) }} hidden accept="image/*" />
              </label>
            </div>

            <div className="mt-6">
              {image && (
                <div className=''>
                  <img src={URL.createObjectURL(image)} alt="Product-Image" className='h-28 m-auto' />
                </div>
              )}
            </div>

            <div className='mt-4'>
            <Select
              mode="multiple"
              bordered={false}
              placeholder="Select Your Style "
              
             
              className=' w-full bg-white rounded-lg border-2 border-blue-600 text-black' onChange={(value) => { setname(value) }}>
                   <option value="1">Shoes</option>
            <option value="0">Sandle</option>
            <option value="2">Flat</option>
               
            </Select>
              <div className='mt-4'>

                <input
                  type="number"
                  name="size"
                  value={size}
                  onChange={(e) => setsize(e.target.value)}
                  className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Shoes Size"
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

              <div className='mt-2'>
                <button className='bg-blue-700 rounded-lg text-white px-2 w-full py-1 hover:bg-blue-900' onClick={handleproduct}>Select Product</button>
              </div>



            </div>




          </motion.div>

    </section>
  )
}

export default Selectedproduct