'use client'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { data } from './data'
import FORM from '../Home/form'
import Link from 'next/link'
import cartpage from '../cartpage/page'
import { toast } from 'react-toastify'
import { useCart } from '../../context/cart'
import { useauth } from '../../context/auth'
import { FaUserTie } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useCategory from '@/hooks/useCategory'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navb() {

  const categoriess = useCategory()
  const [open, setOpen] = useState(false)
  const { auth, setAuth } = useauth();
  const [isOpen, setIsOpen] = useState(false);
  const [isopen, setopen] = useState(false)
  const [cart] = useCart() || [];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglecategories = () => {
    setopen(!isopen);
  };
  const handleclick = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully');
  }
  const isAdmin = auth?.user?.role === 'admin';
  const dashboardPage = isAdmin ? '/admin' : '/user';
  return (
    <div className="bg-white ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40  md:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="">
                    <Tab.List className="-mb-px md:flex md:space-x-8 px-4">
                      {data.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap  px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {data.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900 focus:none">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {data.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {!auth.user ? (
                    <div className='flex space-x-2'>
                      <Link href={'/registered'} className="text-sm  leading-6 bg-orange-500 px-4 py-2 rounded-md text-white">
                        Register <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <Link href={'/login'} className="text-sm  leading-6 bg-orange-500 px-4 py-2 rounded-md text-white">
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center p-2  rounded focus:outline-none"
                        >
                          <p className='text-sm text-red-600 font-bold '>{auth?.user?.name}</p>
                          <FaUserTie className='text-3xl hover:bg-blue-300 hover:border-[1px] absolute p-1 ml-16 rounded-full bg-gray-300' />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-4 h-4 ml-12 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'
                              }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v9.293l3.646-3.647a1 1 0 111.415 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 13.293V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="absolute   bg-white border rounded-lg shadow-lg">
                            <ul>
                              {auth.user ? (
                                <>
                                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={handleclick}>
                                    <Link href="/login">
                                      Logout
                                    </Link>
                                  </li>
                                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" >
                                    <Link href={`dashboard ${auth?.user?.role === 'admin' ? admind : user}`}>
                                      Dashboard
                                    </Link>
                                  </li>

                                </>
                              ) : (
                                <li className="text-sm  bg-orange-500 px-4 py-2 rounded-md text-white leading-6">
                                  <Link href="/login">
                                    Login
                                  </Link>
                                </li>
                              )}

                            </ul>
                          </div>
                        )}
                      </div>
                    </>

                  )

                  }

                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="z-10 relative  ">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className=" flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-20 "
                    src="images/logo.png"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {data.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <motion.div
                            initial={{ y: '-100%', opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{
                              stiffness: 100,
                              damping: 15,
                              duration: 0.5,
                              ease: "easeIn",
                            }}
                            className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center  pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </motion.div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {data.pages.map((page) => (
                    <motion.a
                      initial={{ y: '-100%', opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5,
                        ease: "easeIn"
                      }}
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </motion.a>
                  ))}
                  <FORM />
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div>
                  <button
                    onClick={togglecategories}
                    className="flex items-center p-2 space-x-1 rounded focus:outline-none"
                  >
                    <p className="text-sm text-red-600 font-bold">Categories</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-transform transform ${isopen ? 'rotate-180 ' : 'rotate-0'
                        }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v9.293l3.646-3.647a1 1 0 111.415 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 13.293V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {isopen && (
                      <div className='absolute mt-44 '>
                        {categoriess.map((category) => (
                          <div key={category._id} className='bg-black px-6 py-1   rounded-md '>
                            <Link href={`/category/${category.slug}`} className='hover:text-red-600 text-white border-b-2 border-yellow-500'> {category.name}</Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>

                </div>
                <div>
                  {!auth.user ? (
                    <div className='md:flex hidden items-center space-x-2'>
                      <Link href={'/registered'} className="text-sm  leading-6 bg-orange-500 px-4 py-2 rounded-md text-white">
                        Register
                      </Link>
                      <Link href={'/login'} className="text-sm  bg-orange-500 px-4 py-2 rounded-md text-white leading-6 ">
                        Log in
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center p-2 space-x-5 rounded focus:outline-none"
                        >
                          <p className='text-sm text-red-600 font-bold '>{auth?.user?.name}</p>

                          <FaUserTie className='text-3xl hover:bg-blue-300 hover:border-[1px] absolute p-1 rounded-full bg-gray-300' />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-4 h-4 pr-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'
                              }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v9.293l3.646-3.647a1 1 0 111.415 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 13.293V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="absolute   bg-white border rounded-lg shadow-lg">
                            <ul>
                              {auth.user ? (
                                <>
                                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={handleclick}>
                                    <Link href="/login">
                                      Logout
                                    </Link>
                                  </li>
                                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" >
                                    <Link href={dashboardPage}>
                                      Dashboard
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                  <Link href="/login">
                                    Login
                                  </Link>
                                </li>
                              )}

                            </ul>
                          </div>
                        )}
                      </div>
                    </>

                  )

                  }
                </div>
                <>
                  {/* component */}
                  <div className=" flex justify-center items-center md:pl-2">
                    <Link href={'/cartpage'}>
                      <div className="relative py-2">
                        <div className="t-0 absolute ">
                          <p className="flex h-2 -mt-2 w-2 items-center  justify-center rounded-full bg-red-500 p-2 text-[10px] text-white">
                            {cart?.length}
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="file:  h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </>

              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
export default Navb