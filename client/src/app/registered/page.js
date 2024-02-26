'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
function page() {
  const router = useRouter()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [phone, setphone] = useState()
  const [name, setname] = useState()
  const [address, setaddress] = useState()
  const [role, setrole] = useState()
  const [question, setquestion] = useState()
  const handlesubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/vi/auth/registered', {
        email, password, phone, name, address, role, question

      });

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem('auth', JSON.stringify(res.data))
        router.push('/login')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Registration failed');
    }

  };

  return (
    <main>
      <section className="bg-gradient-to-t from-purple-300 to-pink-400 dark:bg-gray-900 flex flex-col items-center justify-center px-6  mx-auto  ">
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="w-full  my-8 shadow dark:border sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
          <div className='flex  items-center bg-teal-700'>
            <img
              className=" h-24 "
              src="images/logo.png"
              alt="logo"
            />
            <span className='text-orange-500 text-[25px]  font-bold'>Hoo Hacks</span>

          </div>
          <div className="  md:space-y-6 p-6 bg-white">

            <form onSubmit={handlesubmit} className=" md:space-y-6" action="#">
              <div className='space-y-2'>
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register Page
                </h1>
                <div>
                  <label
                    htmlFor="email"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"

                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setpassword(e.target.value)}
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Phone"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"

                    value={phone}
                    placeholder="+92..."
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Phone"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"

                    value={name}
                    placeholder="+92..."
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Phone"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"

                    value={address}
                    placeholder="+92..."
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Phone"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="text"

                    value={role}
                    placeholder="+92..."
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setrole(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Phone"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question
                  </label>
                  <input
                    type="text"

                    value={question}
                    placeholder="what is your best friend"
                    className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setquestion(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-white font-bold rounded-md w-full hover:bg-teal-500"
                >
                  Submit
                </button>

              </div>
            </form>
          </div>
        </motion.div>

      </section>


    </main>
  )
}

export default page