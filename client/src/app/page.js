'use client'
import Image from 'next/image'
import Hero from '../components/hero'
import {getBlogs} from '@/app/blog/page'
import { useEffect, useState } from 'react'
import Blogslist from '@/components/Blogs'
import Contact_Us from '@/app/contact/page'
import About from '@/app/about/page'
import SeoMeta from '@/components/seo'
import Services from './service/page'
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
  <>
    
  <SeoMeta title="JoeShoe" description="JoeShoe" url="" />
        
  <div>
  <Hero/>
  <Services/>
  <About/>
 <Blogslist data={data?.blogs} />
 <Contact_Us/>
   </div>
   </>
);
}

export default Home;
