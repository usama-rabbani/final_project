import React from 'react'
import Link from 'next/link'
import { MdDoubleArrow } from "react-icons/md";
import { motion } from 'framer-motion'
function Blogsec({
    title, content, details, bannerimage, slug
}) {
    return (
        <section>

            <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{
                    stiffness: 100,
                    damping: 15,
                    duration: 1,
                    ease: "easeIn",
                }} className='md:max-w-96 cursor-pointer '>
                <img className='md:w-96 w-full max-h-42 rounded-t-lg' src={bannerimage} alt='img' />
                <div className='bg-slate-200 rounded-b-lg px-6 md:w-96 w-full'>
                    <h1 className='text-lg font-semibold py-4'>{title}</h1>
                    <p className='text-sm '>{content.split(" ").slice(0, 30).join(" ")}</p>
                    <Link href={`/blog/${slug}`} className='text-green-700 pb-4 pt-2 font-bold text-xs flex items-center space-x-4'>READ MORE <MdDoubleArrow /></Link>
                </div>

            </motion.div>

        </section>
    )
}

export default Blogsec