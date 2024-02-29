'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from "framer-motion";
import SeoMeta from '@/components/seo';
function About() {
    return (
        <>
            <SeoMeta title="About-us" description="About-us" url="http://smartphonerapair.co.nz/about" />


            <section className='container mx-auto md:px-24 bg-white mt-10 mb-10'>
                <h1 className='text-center font-bold text-3xl group cursor-pointer'>About Us</h1>
                <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2  m-auto' />
                <motion.div
             
              initial={{ x: '100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                stiffness: 100,
                damping: 15,
                duration: 1,
                ease: "easeIn",
              }}className='px-4 py-8'>
                    <h1 className='md:text-2xl font-bold pb-4'> Welcome to Shoe Hacks - Where Comfort Meets Style</h1>
                    <p className='text-lg font-normal '>


                        <strong className='text-teal-800'>At Shoe Hacks</strong>  , we believe that every step you take should be a comfortable and stylish one. Established with a passion for footwear and a commitment to quality, <br />
                        <strong className='text-teal-800 '>we have been serving</strong>  shoe enthusiasts across Pakistan with the finest selection of footwear since [year of establishment].</p>
                    <p className='text-lg font-normal py-2'>
                        <strong className='text-teal-800'>  Our journey began</strong> with a simple yet profound vision: to redefine the shoe shopping experience by offering a diverse range of high-quality products that cater to every taste and occasion. From casual sneakers to elegant dress shoes, we meticulously curate our collection to ensure that you find the perfect pair for every moment.</p>
                    
             <motion.p initial={{ x: '100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                stiffness: 100,
                damping: 15,
                duration: 1,
                ease: "easeIn",
              }} className='text-lg font-normal py-2'><strong className='text-teal-800'>As we continue to grow and evolve,</strong> our mission remains unchanged: to inspire confidence, comfort, and style in every step you take, rain or shine. Thank you for choosing JoeShoe as your trusted footwear partner. We look forward to being part of your journey, one waterproof step at a time.</motion.p>
                  <motion.img initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                stiffness: 100,
                damping: 15,
                duration: 1,
                ease: "easeIn",
              }} src='images/water.png' alt='img'/>

              <motion.div initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                stiffness: 100,
                damping: 15,
                duration: 1,
                ease: "easeIn",
              }}>
                    <p className='text-lg font-normal py-2'>
                        <strong className='text-teal-800'>   What sets Shoe Hacks</strong> apart is our unwavering dedication to craftsmanship and comfort. We work closely with skilled artisans and trusted manufacturers to create shoes that not only look great but also feel great to wear. Each pair is crafted using premium materials, cutting-edge technology, and attention to detail, resulting in footwear that stands the test of time.</p>

                    <p className='text-lg font-normal py-2'>
                        <strong className='text-teal-800'>   At the heart of our philosophy</strong> is a deep understanding of our customers' needs and preferences. We strive to exceed your expectations at every touchpoint, from the moment you browse our website to the day your new shoes arrive at your doorstep. Our friendly and knowledgeable team is always here to assist you, whether you need help finding the right size or advice on caring for your shoes.</p>

                    <p className='text-lg font-normal py-2'>
                        <strong className='text-teal-800'>   Beyond our commitment</strong> to quality and customer satisfaction, Shoe Hacks is also dedicated to making a positive impact on the community and the environment. We actively seek out eco-friendly materials and sustainable practices in our manufacturing process, and we are proud to support local initiatives that promote social welfare and environmental conservation.</p>


                        </motion.div>


                </motion.div>
            </section>
        </>
    )
}

export default About





