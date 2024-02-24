
'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useauth } from '@/context/auth'
function Profile() {
  const router = useRouter()
  const { auth, setAuth } = useauth();
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [phone, setphone] = useState()
  const [name, setname] = useState()
  const [address, setaddress] = useState()


  const handlesubmit = async (e) => {

    e.preventDefault();
    try {

      const { data } = await axios.put(`http://localhost:8080/api/vi/auth/profileupdate/${auth?.user._id}`, {
        name,
        email,
        password,
        phone,
        address,

      });

      if (data?.error) {
        toast.success(data?.error);


      } else {
        setAuth({ ...auth, user: data?.updateuser })
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");

      }
    } catch (error) {
      console.error(error);
      toast.error('Updated Failed');
    }

  };

  useEffect(() => {
    const { email, password, phone, name, address } = auth?.user
    setname(name)
    setemail(email)
    setpassword(password)
    setphone(phone)
    setaddress(address)

  }, [auth?.user])
  console.log(auth, 'auth')
  return (
    <main>
      <section className=" mt-4 mb-16 bg-gradient-to-t from-purple-300 to-pink-400 dark:bg-gray-900 flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">



        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className='flex items-center bg-teal-700'>
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

                    disabled
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

                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>





                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-white font-bold rounded-md w-full hover:bg-teal-500"
                >
                  Update
                </button>

              </div>
            </form>
          </div>
        </div>

      </section>


    </main>
  )
}

export default Profile
