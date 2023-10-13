'use client'
import React, {useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'


function forgetpassword() {
    const [email, setemail] = useState()
    const [newpassword, setnewpassword] = useState()
    const [question, setquestion] = useState()
   
    const handlesubmit = async (e) => {
     
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:8080/api/vi/auth/forget',{
           email, newpassword , question
         
        });
    
        if (res.data.success) {
          toast.success(res.data.message);
         
          localStorage.setItem('auth',JSON.stringify(res.data))
          window.location.href = '/login';
         
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Reset Error');
      }
     
    };
  return (
<main>
<section className = "bg-gradient-to-t from-purple-300 to-pink-400 dark:bg-gray-900 flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">

   
  
    <div className = "w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className = 'flex items-center bg-teal-700'>
    <img
        className=" h-24 "
        src="images/logo.png"
        alt="logo"
      />
      <span className = 'text-orange-500 text-[25px] font-bold'>Hoo Hacks</span>
    
    </div>
      <div className  = " space-y-2 md:space-y-6 sm:p-8 bg-white">
        <h1 className = "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
         Reset Password
        </h1>
        <form onSubmit={handlesubmit}  className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
            
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Question
            </label>
            <input
              type="text"
            
              value={question}
              onChange={(e)=>setquestion(e.target.value)}
              className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
             New Password
            </label>
            <input
              type="text"
             
              value={newpassword}
              placeholder="••••••••"
              onChange={(e)=>setnewpassword(e.target.value)}
              className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

        
                                <button
            type="submit" 
            className="bg-blue-600 px-4 py-2 text-white font-bold rounded-md w-full hover:bg-teal-500"
          >
           Reset
          </button>
        
        
        </form>
      </div>
    </div>

</section>


  </main>

   
  )
}

export default forgetpassword