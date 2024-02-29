import Link from 'next/link'
import React from 'react'
import { MdDoubleArrow } from "react-icons/md";
import Blogsec from '@/components/blog-sec'
function Blogslist({ data }) {
    return (
        <section className='mx-auto container px-4 py-8'>

            <h1 className='text-center font-bold text-3xl group cursor-pointer'>OUR Latest Blog</h1>
            <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2 m-auto' />

            <div className='md:grid md:grid-cols-3 gap-4 py-12 md:space-y-0 space-y-6 '>
                {data?.map((blogs, idx) => {
                    return (
                        <div key={blogs.idx} class="rounded-lg ">
                            <Blogsec
                                title={blogs.title}
                                content={blogs.content}
                                details={blogs.des}
                                bannerimage={blogs.bannerimage.url}
                                slug={blogs.slug}
                            />
                        </div>
                    );
                })}
               
            </div>

        </section>
    )
}

export default Blogslist