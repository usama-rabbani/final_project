'use client'
import Link from 'next/link'
import {FaUserTie} from 'react-icons/fa'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {toast} from 'react-toastify'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {useauth} from '../context/auth'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


 export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { auth, setAuth } = useauth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleclick = ()=>{
    setAuth({
      ...auth,
      user:null,
      token: ''
    })
    localStorage.removeItem('auth')
    toast.success( 'Logout Successfully');
  }
  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto  flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={'/'}  className=" ">
            <span className="sr-only">Your Company</span>
            <img className=" w-auto h-8 " src="images/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 ">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"f
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href={'/'} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link href={'/'}
                      key={item.name}
                      
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link href={'/Home'} className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link href={'/'} className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </Link>
          {/* {auth?.token ? ( */}
          {auth?.token ? (
        <Link href={"/user"} className="text-sm font-semibold leading-6 text-gray-900">
          User Dash
        </Link>
      ) : null}
          {/* ) : null} */}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2 lg:pr-14">
          {!auth.user ?(
            <>
             <Link href={'/registered'} className="text-sm font-semibold leading-6 text-gray-900">
             Register <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href={'/login'} className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            </>
          ):(
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
          className={`w-4 h-4 ml-12 transition-transform transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
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
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={handleclick }>
          <Link href="/login">
            Logout
          </Link>
        </li>
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
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={'/'}  className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link href={'/Home'}
                  
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                 Home
                </Link>
                <Link href={'/'}
                 
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                <Link href={'/'}
                 
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </Link>
              </div>
              <div className="py-6">
         
          {!auth.user ?(
            <>
            <div className='space-x-4'>
             <Link href={'/registered'} className="text-sm font-semibold leading-6 text-gray-900">
             Register <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href={'/login'} className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            </div>
            </>
          ):(
            <Link href={'/login'} className="text-sm font-semibold leading-6 text-gray-900">
             Logout <span aria-hidden="true">&rarr;</span>
            </Link>
          )
          
        }
       
        
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}


// export function generateMetadata() {
//     return {
//         title: 'About Page'
//     }
// }