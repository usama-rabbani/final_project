'use client'
import Image from 'next/image'
import Hero from '../components/hero'
import {getBlogs} from '@/app/hygraph/page'
import { useEffect, useState } from 'react'
import Blogs from '@/components/Blogs'
 function Home() {
  const [data, setdata] = useState()
useEffect(() => {
  getBannerData()
}, [])

const getBannerData = async()=>{
  const res = await getBlogs()
  setdata(res)
  return;
 
}
console.log(data,'abc');
return (
  <div>
  <Hero/>
 <Blogs data={data?.blogs} />
   </div>
);
}

export default Home;
