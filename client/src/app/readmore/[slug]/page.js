'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'
import { Select } from 'antd';
import { useCart } from '@/context/cart';
import { motion } from 'framer-motion'
function projectdetail() {
  const params = useParams();
  const router = useRouter()
  const [name, setname] = useState('')
  const [cart, setCart] = useCart() || [];
  const [image, setimage] = useState('')
  const [size, setsize] = useState()
  const [quantity, setquantity] = useState()
  const [category, setcategory] = useState()
  const [product, setproduct] = useState([]);
  const [categories, setcategories] = useState()
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Product = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/vi/product/singleproduct/${params.slug}`);
      setproduct(data?.singleproducts);
      // getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.slug) Product();
  }, [params?.slug]);

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

  // //get similar product
  // const getSimilarProduct = async (pid, cid) => {
  //   console.log(getSimilarProduct);
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8080/api/vi/product/relatedproduct/${pid}/${cid}`
  //     );
  //     setRelatedProducts(data?.Similar);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // userRequirements

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
        toast.success('Product is Selected Successfully');
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
    <main className='mx-auto  px-4 container py-4 sm:px-6 lg:px-8'>

      <div className='md:grid md:grid-cols-2 '>
        <div>
          <h1 className='text-3xl font-bold text-red-600 pt-5'>Products Images</h1>
          <img
            className="rounded-t-lg w-72 h-72 mt-8 mb-6"
            src={`http://localhost:8080/api/vi/product/getimage/${product._id}`}
            alt={product.image}

          />
          <hr />
          {/* <div className=''>
            <h1>Similar Products</h1>
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products found</p>
            )}
            {relatedProducts?.map((p) => {

              return (
                <div className='lg:w-72 w-full'>
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={`http://localhost:8080/api/vi/product/getimage/${p.id}`}
                        alt={p.image}
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {p.name}
                        </h5>
                      </a>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${item.price}
                        </span>
                        <a
                          href="#"
                          className="text-white bg-black/20 hover:text-red-800 focus:ring-4 focus:outline-none"
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div> */}

        </div>


        <div>
          <h1 className='text-3xl font-bold text-red-600 pt-5'>Product Details</h1>
          <div className='mt-8 space-y-2'>
            <h1 className=' font-bold flex items-center '>Name: <p className='text-[15px] font-normal pl-2'>{product.name}</p> </h1>
            <h1 className=' font-bold flex items-center '>Description: <p className='text-[15px] font-normal pl-2'> {product.description}</p></h1>
            <h1 className=' font-bold flex items-center '>Price: <p className='text-[15px] font-normal pl-2'>${product.price}</p> </h1>
            <h1 className=' font-bold flex items-center '>category:  <p className='text-[15px] font-normal pl-2'>{product.category}</p> </h1>
            <h1 className=' font-bold flex items-center pb-4'>Shipping:  <p className='text-[15px] font-normal pl-2'>{product.shipping}</p> </h1>
            <button onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success('Item Added to Cart')
            }} className=' md:w-36 w-full bg-black/20 text-white hover:text-red-700 py-2 rounded-full'>Add to Cart</button>
          </div>

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
        </div>
      </div>
    </main>
  );
}

export default projectdetail;
