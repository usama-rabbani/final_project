'use client'
import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { Prices } from './pricedata';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useCart } from '@/context/cart';
function Accordion() {
    const router = useRouter()
    const [cart, setCart] = useCart() || [];
    const [products, setproducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [checked, setchecked] = useState([]);
    const [radio, setRadio] = useState([]);

    // const [total, settotal] = useState(0);
    // const [page, setpage] = useState(1);
    // const [loading, setloading] = useState(1);

    // Get all categories
    const GetAllCat = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/vi/category/allcategories');
            if (data?.success) {
                setCategories(data.getallcategory);
                console.log(cart);

            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetAllCat();

    }, []);

    // Get All Products
    const GetAllProducts = async () => {
        console.log('abc', GetAllProducts);
        try {
            // setloading(true)
            const { data } = await axios.get('http://localhost:8080/api/vi/product/getallproduct')
            //   setloading(false)
            if (data?.success) {
                setproducts(data.allproducts)
            }
        } catch (error) {
            // setloading(false)
            console.error(error);
        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) GetAllProducts();
    }, [checked.length, radio.length]);

    // Filter Api


    const GetFilterProducts = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/vi/product/filterproducts', { checked, radio });

            setproducts(data?.Filterproducts);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        // console.log("GetFilterProducts:", GetFilterProducts);
        // console.log("radio:", radio);
        if (checked.length || radio.length) GetFilterProducts();
    }, [checked, radio]);


    // filter by categories
    const handlecategoryfilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(item => item !== id)
        }
        setchecked(all)
    }

    // Total count 

    //   const CountProducts = async () => {


    //     try {
    //         const { data } = await axios.get('http://localhost:8080/api/vi/product/countproducts');

    //         settotal(data?.Filterscount);
    //     } catch (error) {
    //         console.error(error);
    //     }

    // }

    // useEffect(() => {
    //     if (page === 1) return;
    //     Loadmore();
    //   }, [page]);

    // Load More

    // const Loadmore = async () => {


    //     try {
    //         setloading(true)
    //         const { data } = await axios.get(`http://localhost:8080/api/vi/product/pageproducts/${page}`);
    //         setloading(false)
    //         setproducts([...pagefilter , ...data?.pagefilter]);
    //     } catch (error) {
    //         setloading(false)
    //         console.error(error);
    //     }

    // }
    console.log("checked:", checked);

    return (

        <section className='mx-auto  max-w-7xl px-4 py-4 sm:px-6 md:px-8'>

            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{
                    stiffness: 100,
                    damping: 15,
                    duration: 1,
                    ease: "easeIn",
                }}
                className='md:flex md:space-x-16 space-y-6 md:space-y-0'>


                <div>
                    <div className="space-y-2 md:w-72">
                        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                                <span className="text-sm font-medium"> Categories </span>
                                <span className="transition group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="border-t border-gray-200 bg-white">
                                <header className="p-4">


                                </header>
                                <label htmlFor="FilterInStock" className=" space-y-2 pb-6">

                                    {categories.map((item) => (
                                        <div key={item._id} className="flex space-x-16 items-center pl-6 pb-3">
                                            <input type="checkbox" className="h-8 w-8 rounded border-gray-300" onChange={(e) => handlecategoryfilter(e.target.checked, item._id)} />
                                            <li className="text-xl font-bold text-gray-700 list-none	">{item.name}</li>
                                        </div>
                                    ))}
                                </label>

                                <button className='px-2 ' onClick={() => window.location.reload()}>Reset All</button>
                            </div>
                        </details>
                        <h1>Filter By Price</h1>
                        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                                <span className="text-sm font-medium"> Prices </span>
                                <span className="transition group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="border-t border-gray-200 bg-white">
                                <header className="p-4">


                                </header>
                                <label htmlFor="FilterInStock" className="space-y-1 pb-6">
                                    {Prices.map((item) => (
                                        <div key={item._id} className="flex space-x-16 items-center pl-6 pb-3">
                                            <input
                                                type="radio"
                                                className="h-6 w-6 rounded border-gray-300"
                                                value={item.array}
                                                name="priceGroup"
                                                onChange={(e) => setRadio(e.target.value)}
                                            />
                                            <li className=" text-xl font-bold text-gray-700 list-none">{item.name}</li>
                                        </div>
                                    ))}
                                </label>



                            </div>
                        </details>
                    </div>
                </div>




                <div>
                    <div>
                        <div
                            className='md:grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0'>
                            {products?.map((item) => {

                                return (

                                    <motion.div
                                        initial={{ y: '-100%', opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        exit={{ y: '100%', opacity: 0 }}
                                        transition={{
                                            stiffness: 100,
                                            damping: 15,
                                            duration: 1,
                                            ease: "easeIn",
                                        }} key={item._id} className='w-64 '>
                                        <div className="  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

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

                                                        className="text-red-500   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Read More
                                                    </button>
                                                    <button onClick={() => {
                                                        setCart([...cart, item]);
                                                        localStorage.setItem("cart", JSON.stringify([...cart, item]));
                                                        toast.success('Item Added to Cart')
                                                    }}

                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>



                                )

                            })}

                        </div>


                    </div>
                </div>

            </motion.div>






        </section>
    );
}

export default Accordion;


// <div className='mt-8'>
// {products && products.length < total && (
//     <button onClick={() => setpage(page + 1)} className= "bg-yellow-700 px-2 rounded-lg text-black">{loading ? 'loading...' : "Load More" }</button>
// ) }
// </div>