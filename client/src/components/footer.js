import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTwitter } from 'react-icons/fa'
function Footer() {
  return (
    <section>

      <footer className="bg-black py-12 px-8 font-[sans-serif]">
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="grid max-sm:grid-cols-1 lg:grid-cols-3 items-center gap-8">
          <h2 className="lg:col-span-2 text-2xl font-semibold text-white">
            Join our newsletter to keep up to date with us!
            <br /> Enter your email Subscribe
          </h2>
          <div className="bg-transparent border border-gray-800 flex px-2 py-1 rounded-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent pl-3 text-sm text-gray-300"
            />
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
            >
              Subscribe
            </button>
          </div>
        </motion.div>
        <hr className="my-12 border-gray-800" />
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-20 max-lg:gap-8">
          <div className="lg:col-span-3 max-lg:col-span-full">
            <a href="javascript:void(0)">
              <img
                src="images/logo.png"
                alt="logo"
                className="w-60 "
              />
            </a>
            <p className="text-gray-300 text-sm lg:max-w-sm mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
              mi eu pulvinar cursus, sem elit interdum mauris.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/service"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white text-sm"
                >
                Blogs
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-white text-sm"
                >
                 Faq
                </a>
              </li>
            
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="registered"
                  className="text-gray-300 hover:text-white text-sm"
                >
                 Register
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-300 hover:text-white text-sm"
                >
                 Login
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
        <hr className="my-12 border-gray-800" />
        <div className='md:flex justify-between items-center'>
          <div>
        <motion.p
          initial={{ y: '-100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} className="text-sm text-gray-300 mt-8">
          Copyright © 2024
          <a
            href="https://readymadeui.com/"
            target="_blank"
            className="hover:underline mx-1"
          >
           Shoe Hacks
          </a>
          All Rights Reserved.
        </motion.p>
        </div>
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }} >
          <p className='text-base font-normal text-white/90'>
            Connect with us!
          </p>
          <ul className='flex gap-2 mt-5'>
            <li>
              <Link href="https://pk.linkedin.com/" className='inline-block hover:border-primary border border-[#CACACA] p-2.5 rounded text-white hover:text-primary'>
                <FaLinkedinIn />
              </Link>
            </li>
            <li>
              <Link href="https://web.facebook.com/" className='inline-block hover:border-primary border border-[#CACACA] p-2.5 rounded text-white hover:text-primary'>
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/" className='inline-block hover:border-primary border border-[#CACACA] p-2.5 rounded text-white hover:text-primary'>
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/" className='inline-block hover:border-primary border border-[#CACACA] p-2.5 rounded text-white hover:text-primary'>
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link href="https://www.pinterest.com/" className='inline-block hover:border-primary border border-[#CACACA] p-2.5 rounded text-white hover:text-primary'>
                <FaPinterestP />
              </Link>
            </li>
          </ul>
        </motion.div>
        </div>
      </footer>


    </section>
  )
}

export default Footer



