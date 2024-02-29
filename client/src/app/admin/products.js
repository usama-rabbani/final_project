import React, { useState, useEffect } from 'react'; import axios from 'axios'
import Link from 'next/link';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
function Products() {
  const [products, setproducts] = useState([])
  // Get All Products
  const GetAllProducts = async () => {

    try {
      const { data } = await axios.get('http://localhost:8080/api/vi/product/getallproduct')
      if (data?.success) {
        setproducts(data.allproducts)
        console.log(data)
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    GetAllProducts();
  }, [])
  return (
    <section className='max-w-[1000px]'>

      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{
          stiffness: 100,
          damping: 15,
          duration: 1,
          ease: "easeIn",
        }} className='md:grid md:grid-cols-3 gap-4  '>
        {products?.map((item) => {

          return (
            <Link className='' key={item._id} href={`/admin/${item.slug}`}
            // {`/admin/dashboard/${item.slug}`}
            >
              <div className='md:w-64 '>
                <div className="  bg-white border border-gray-200 rounded-lg mb-4 md:mb-0 shadow dark:bg-gray-800 dark:border-gray-700">


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
                  </div>
                </div>
              </div>
            </Link>

          )

        })}

      </motion.div>
    </section>

  )
}

export default Products
