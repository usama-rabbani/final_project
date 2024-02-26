'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/cart';
import { useauth } from '@/context/auth'
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { BiSolidMinusCircle } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const cartpage = () => {
  const router = useRouter()
  const { auth, setAuth } = useauth();
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(0);
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState("");
  const [loading, setloading] = useState(false)

  // Handle incrementing the quantity
  const increment = () => {
    setQuantity(quantity + 1);
  };
  // Handle decrementing the quantity
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success(' item is deleted successfully')
    } catch (error) {
      console.log(error);
    }
  };
  // Calculate the total cart price
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cart) {
      total += item.price;
    }
    return total;
  };



  return (
    <main className=' items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <motion.h1
          initial={{ x:'-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="text-center bg-light p-2 mb-1">
        {!auth?.user
          ? "Hello Guest"
          : `Hello  ${auth?.token && auth?.user?.name}`}
        <p className="text-center">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
            }` : " Your Cart Is Empty"}</p>
      </motion.h1>
      <div className='md:grid md:grid-cols-2 '>
      <motion.div
          initial={{ y:'-100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="text-center bg-light p-2 mb-1 space-y-2 md-space-y-0">
          {cart?.map((item) => {
            return (
              <div key={item._id} className='md:grid md:grid-cols-4 gap-5 items-center md:w-[45rem] border-2 px-6 py-8'>
                <img
                  className="rounded-t-lg m-auto w-36 h-24  border-2 px-3 py-2"
                  src={`http://localhost:8080/api/vi/product/getimage/${item._id}`}
                  alt={item.image}
                />
                <div className="space-y-2">
                  <p className="text-lg font-bold"> {item.name}</p>
                  <p className="text-lg font-bold"> ${item.price}</p>
                </div>
                <div  className='md:flex items-center md:space-x-4 md:sapce-y-0 space-y-2'>
                <div className='flex mx-auto text-center  icons items-center bg-black md:px-6 md:py-2 border-t-teal-600  border-l-yellow-500  border-r-red-500  border-b-fuchsia-700 border-[5px]'>
                  <BsFillPlusCircleFill className=" mx-auto text-center  fill-white cursor-pointer lg:text-2xl hover:fill-red-500 " onClick={() => increment(item._id)} />
                  <p className="text-white lg:mx-5">{quantity}</p>
                  <BiSolidMinusCircle className=" mx-auto text-center  fill-white cursor-pointer lg:text-3xl hover:fill-red-500" onClick={() => decrement(item._id)} /></div>
                <div>
                  <Button className='bg-black text-red-500 ' onClick={() => removeCartItem(item._id)}>Remove Item</Button>
                </div>
                </div>
              </div>
            )
          })}
        </motion.div>
         <motion.div
          initial={{ x:'-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className=' md:w-[25rem]  md:ml-36 border-2 px-6 py-8 mb-4'>
          <div className="text-center ">
            <h1 className="text-center text-2xl font-bold"> Cart Summary</h1>
            <p className="pt-4 pb-4">Total | Checkout | Payment </p>
            <hr />
            <h1 className='font-bold text-3xl text-red-600 pt-4 pb-4'>Total : ${calculateTotalPrice()}</h1>
            <hr />

          </div>


          <div className='text-center mt-6'>
            <button className='w-full  py-2 bg-blue-700 text-white font-bold hover:text-black'>Checkout Cart</button>
          </div>
          <div className='text-center mt-6'>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="w-full py-2 bg-yellow-300 text-black font-bold hover:text-red-700 hover:bg-black"
                    onClick={() => router.push("/user")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="w-full py-2 bg-yellow-300 text-black font-bold hover:text-red-700 hover:bg-black"
                    onClick={() => router.push("/user")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      router.push("/login"
                        // , {
                        //   state: "/cartpage",
                        // }
                      )
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>

          <div className='text-center mt-6'>

            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: 'vault'
                }

              }}
              onInstance={(instance) => setInstance(instance)}

            />
            <button className='w-full  py-2 bg-blue-700 text-white font-bold hover:text-black'>Make Payment</button>
          </div>

        </motion.div>
      </div>
    </main>
  )
}
export default cartpage
