import Link from 'next/link'
import React from 'react'
import { MdDoubleArrow } from "react-icons/md";
import Blogsec from '@/components/blog-sec'
function Blogslist({ data }) {
    return (
        <section className='mx-auto container px-4 py-8'>

            <h1 className='text-center font-bold text-3xl group cursor-pointer'>Our Latest Blogs</h1>
            <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2 m-auto' />

            <div className='md:grid md:grid-cols-3 gap-4 py-4 md:space-y-0 space-y-6'>
                {data?.map((blogs, idx) => {
                    return (
                        <div key={blogs.idx} class="rounded-lg">
                            <Blogsec
                                title={blogs.title}
                                content={blogs.content}
                                details={blogs.details.raw}
                                bannerimage={blogs.bannerimage.url}
                                slug={blogs.slug}
                            />
                        </div>
                    );
                })}
                {/* {
                    data?.blogs?.map((item, idx) => {
                        return (
                            <div key={idx} className='md:w-96'>
                                <img className='md:w-96 max-h-42 rounded-t-lg' src={item?.bannerimage?.url} alt='img' />
                                <div className='bg-slate-200 rounded-b-lg px-6'>
                                    <h1 className='text-lg font-semibold py-4'>{item.title}</h1>
                                    <p className='text-sm '>{item.content.split(" ").slice(0, 30).join(" ")}</p>
                                    <Link href={item?.slug} className='text-green-700 pb-4 pt-2 font-bold text-xs flex items-center space-x-4'>READ MORE <MdDoubleArrow /></Link>
                                </div>

                            </div>
                        )
                    })
                } */}
            </div>

        </section>
    )
}

export default Blogslist