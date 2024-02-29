'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogs } from '../lib/api';
import { MdDoubleArrow } from "react-icons/md";
import { motion } from 'framer-motion'

export default function Services() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 ">
        <h1 className='text-center font-bold text-3xl group cursor-pointer'>Our Latest Blogs</h1>
            <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2 m-auto' />
      <div className='md:grid md:grid-cols-3 gap-4 py-4 md:space-y-0 space-y-6'>
        {blogs.map((blog) => (
          <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{
              stiffness: 100,
              damping: 15,
              duration: 1,
              ease: "easeIn",
          }} key={blog.slug} className="md:max-w-96">
            <div>
            <img className='md:w-96 w-full max-h-42 rounded-t-lg' src={blog?.bannerimage?.url} alt='img' />
            </div>
            <div className='bg-slate-200 rounded-b-lg px-6 md:w-96 w-full'>
                    <h1 className='text-lg font-semibold py-4'>{blog?.title}</h1>
                    <p className='text-sm '>{blog?.content.split(" ").slice(0, 30).join(" ")}</p>
                    <Link href={`/blog/${blog?.slug}`} className='text-green-700 pb-4 pt-2 font-bold text-xs flex items-center space-x-4'>READ MORE <MdDoubleArrow /></Link>
                </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
