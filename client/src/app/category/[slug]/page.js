
'use client'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
function page() {
    const [products, setProducts] = useState([])
    const [categories, setcategories] = useState( )
    const params = useParams()

// filter product by category 
console.log('categories', categories);
 const categoryproducts = async()=>{
    try {
      
        const { data } = await axios.get(`http://localhost:8080/api/vi/product/categorieswise/${params.slug}`)
        
        if (data?.success) {
            setcategories(data.catgory )
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
    <div className=''>
   <h1 className='text-center font-bold text-3xl'>{categories}</h1> 
   <h2 className='text-center font-bold text-3xl'>{products?.length}</h2> 
   <div className="grid grid-cols-3 mx-auto px-6 items-center">
    {products?.map((item)=>{
    
        return(
           
            <div key={item._id} className='lg:w-72 w-full '>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={`http://localhost:8080/api/vi/product/getimage/${item._id}`}
          alt={item.image}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {item.name}
          </h5>
        </a>
       
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${item.price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
    </div>
    
    
        )
       
      })}
      </div>
    </div>
  )
}

export default page
