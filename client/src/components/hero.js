'use client'
import React from 'react'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const data=[
    {
        img: "images/bbg.avif",
    },
    {
        img: "images/nik1.avif",
    },
    {
        img: "images/shoes.avif",
    }
]
function Hero() {
    const items = data.map((item)=>{
        return(
    <img className='cursor-pointer w-full md:h-[70vh] -z-10' role='presentation' src={item.img} alt = ''></img>
        )
    })
  return (
    <div >
         <AliceCarousel
        mouseTracking
        items={items}
     disableButtonsControls
     autoPlay
     autoPlayInterval={2000}
        infinite
    />
    </div>
  )
}

export default Hero