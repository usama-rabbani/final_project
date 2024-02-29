
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
function page() {
  const [products, setProducts] = useState([])
  const [categories, setcategories] = useState()
  const params = useParams()
  const router = useRouter()
  // filter product by category 
  console.log('categories', categories);
  const categoryproducts = async () => {
    try {

      const { data } = await axios.get(`http://localhost:8080/api/vi/product/categorieswise/${params.slug}`)

      if (data?.success) {
        setcategories(data.catgory)
        setProducts(data?.Prducts)

      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (params?.slug) categoryproducts();

  }, [params?.slug])
  return (
    <section className='mx-auto container px-4 py-8'>
      <h1 className='text-center font-bold text-3xl'>{categories}</h1>
      <h2 className='text-center font-bold text-3xl'>{products?.length}</h2>
      <div className="md:grid md:grid-cols-3 mx-auto px-6 items-center">
        {products?.map((item) => {

          return (

            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{
                    stiffness: 100,
                    damping: 15,
                    duration: 1,
                    ease: "easeIn",
                }} className="md:w-64  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

              <img
                className="rounded-t-lg w-64 h-36"
                src={`http://localhost:8080/api/vi/product/getimage/${item._id}`}
                alt={item.image}
              />

              <div className="px-5 pb-5 bg-slate-200">
                <div className='flex justify-between items-center'>
                  <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${item.price}
                  </span>
                </div>


                <div className='flex justify-between items-center mt-2'>
                  <button onClick={() => router.push(`/readmore/${item.slug}`)}

                    className="text-red-500 md:text-sm whitespace-nowrap  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px]   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read More
                  </button>
                  <button 

                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-2 py-2 md:text-sm md:px-5 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>


          )

        })}
      </div>
    </section>
  )
}

export default page
