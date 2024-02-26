'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

function projectdetail() {
  const params = useParams();

  const [product, setproduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const Product = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/vi/product/singleproduct/${params.slug}`);
      setproduct(data?.singleproducts);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.slug) Product();
  }, [params?.slug]);


  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    console.log(getSimilarProduct);
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/vi/product/relatedproduct/${pid}/${cid}`
      );
      setRelatedProducts(data?.Similar);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className=''>
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
          </div>

        </div>


        <div>
          <h1 className='text-3xl font-bold text-red-600 pt-5'>Product Details</h1>
          <div className='mt-8 space-y-2'>
            <h1 className=' font-bold flex items-center '>Name: <p className='text-[15px] font-normal pl-2'>{product.name}</p> </h1>
            <h1 className=' font-bold flex items-center '>Description: <p className='text-[15px] font-normal pl-2'> {product.description}</p></h1>
            <h1 className=' font-bold flex items-center '>Price: <p className='text-[15px] font-normal pl-2'>${product.price}</p> </h1>
            <h1 className=' font-bold flex items-center '>category:  <p className='text-[15px] font-normal pl-2'>{product.category}</p> </h1>
            <h1 className=' font-bold flex items-center '>Shipping:  <p className='text-[15px] font-normal pl-2'>{product.shipping}</p> </h1>
            <button className=' md:w-36 w-full bg-black/20 text-white hover:text-red-700 py-2 rounded-full'>Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default projectdetail;
