'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SeoMeta from '@/components/seo'
import { GetSer } from '@/app/lib2/api';
import { MdDoubleArrow } from "react-icons/md";
import { motion } from 'framer-motion'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Home() {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                autoplay: true,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2, 
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
            }
        }
    ]
};
  const [services, setservices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await GetSer();
            const servicesData = response.services; // Extract the services array from the response
            setservices(servicesData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };
    fetchServices();
}, []);
  console.log(services, 'abc');
  const slider = React.useRef(null);
  return (
  <>
    <SeoMeta title={"Blogs"} description="blogs" url="" />
    <div className="container mx-auto px-4 py-8 ">
      <h1 className='text-center font-bold text-3xl group cursor-pointer'>Our Latest Services</h1>
      <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2  m-auto' />
      <div className='w-full mt-16'>
      
      <Slider ref={slider} {...settings}>
         {services.map((item) => (
            <motion.div
              key={item.slug}
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{
                stiffness: 100,
                damping: 15,
                duration: 1,
                ease: "easeIn",
              }}
              className=" rounded-full w-64 "
            >
              <div className='rounded-full cursor-pointer'>
                <img className=' w-64 m-auto rounded-full border-4 border-black'  src={item?.image?.url} alt='img' />
              </div>
              {/* <div className='bg-slate-200 rounded-b-lg px-6 md:w-42 w-full'>
                <h1 className='text-lg font-semibold py-4'>{item?.title}</h1>
                <p className='text-sm '>{item?.description.split(" ").slice(0, 30).join(" ")}</p>
                <Link href={`/service/${item?.slug}`} className='text-green-700 pb-4 pt-2 font-bold text-xs flex items-center space-x-4'>READ MORE <MdDoubleArrow /></Link>
              </div> */}
            </motion.div>
          ))
      
            }
       </Slider>

      </div>
    </div>
    </>
  );
}
