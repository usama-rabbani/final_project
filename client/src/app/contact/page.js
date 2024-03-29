'use client'
// import PageBanner from '@/components/page-banner'
import SeoMeta from '@/components/seo';
import Link from 'next/link';
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

import { FaGlobeAfrica, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

function Contact_Us() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const [sending, setSending] = useState(false)

    const onSubmit = (data) => {
        setSending(true)
        fetch('/api/email', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log('Response received');
            if (res.status === 200) {
                console.log('Response succeeded!');
                toast.success('Something Successfully Send');
                reset();
                setSending(false)
            }
        });
    }
    return (
        <>
        <SeoMeta title="Contact Us " description="contact" url="" /> 

            {/* <PageBanner
                Custm_BG="bg-[url('/images/about.jpg')]"
                title="Contact Us" />  */}
             <motion.section
                initial={{ x: '100%', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{
                    stiffness: 100,
                    damping: 15,
                    duration: 1,
                    ease: "easeIn",
                }} className="mt-16 container mx-auto bg-red-50 my-8">
           
                <div className="container px-6 md:px-12">
                
                    <div className="block rounded-lg  px-6 py-8   md:px-12 -mt-[100px] backdrop-blur-[30px]">
                        <div className="mx-auto max-w-[700px]">
                        <h1 className='text-center font-bold text-3xl group cursor-pointer'>Contact-Us</h1>
                <hr className='w-36 border-2 border-red-500 group-hover:w-48 mt-2  m-auto' />
                            <form className=" grid gap-5" onSubmit={handleSubmit(onSubmit)}>

                                <h3 className="text-lg font-bold leading-7 pb-1 border-b">
                                    Get In Touch
                                </h3>
                                <div className="md:flex w-full gap-5 items-center">
                                    <div className="md:w-1/2 flex flex-col">
                                        <label className="text-base font-semibold leading-none hidden">Name</label>
                                        <input {...register("name", { required: true })} tabIndex={0} arial-label="Your Name" type="name" className="text-sm leading-none p-3 border-black focus:outline-none focus:border-[#34A777] bg-transparent border rounded border-[#F0F0F0] text-[#777777] placeholder:text-[#777777]" placeholder="Your Name" />
                                        {errors.name && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                    <div className="md:w-1/2 flex flex-col md:mt-0 mt-7">
                                        <label className="text-base font-semibold leading-none hidden">Email</label>
                                        <input {...register("email", { required: true })} type="email" className="text-sm leading-none p-3 focus:outline-none focus:border-[#34A777] bg-transparent border border-black rounded border-[#F0F0F0] text-[#777777] placeholder:text-[#777777]" placeholder="E-mail address" />
                                        {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                                <div className="md:flex w-full gap-5 items-center">
                                    <div className="md:w-1/2 flex flex-col">
                                        <label className="text-base font-semibold leading-none hidden">Telephone</label>
                                        <input {...register("phone")} type="tel" className="text-sm leading-none p-3 focus:outline-none focus:border-[#34A777] bg-transparent border border-black rounded border-[#F0F0F0] text-[#777777] placeholder:text-[#777777]" placeholder="Telephone" />
                                        {errors.phone && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                    <div className="md:w-1/2 flex flex-col md:mt-0 mt-7">

                                        <label className="text-base font-semibold leading-none hidden">Subject</label>
                                        <input {...register("subject", { required: true })} type="text" className="text-sm leading-none p-3 focus:outline-none focus:border-[#34A777] bg-transparent border-black border rounded border-[#F0F0F0] text-[#777777] placeholder:text-[#777777]" placeholder="Subject" />
                                        {errors.subject && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <label className="text-base font-semibold leading-none hidden">Message</label>
                                    <textarea {...register("comment", { required: true })} tabIndex={0} aria-label="Write your message" role="textbox" className="text-sm leading-none p-3 border-black focus:outline-none focus:border-[#34A777] bg-transparent border rounded border-[#F0F0F0] text-[#777777] placeholder:text-[#777777] resize-none h-32" defaultValue={"Write your message"} />
                                    {errors.comment && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                                <div className="flex items-center justify-start w-full">
                                    <input type='submit' className="mt-5 text-base font-semibold leading-none text-white py-4 px-10 bg-[#89DBC4] hover:bg-[#34A777]" value={sending ? 'SENDING...' : `SUBMIT`} />
                                </div>
                            </form>




                        </div>
                    </div>
                </div>
                <div className="relative h-[500px] pt-8 overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12552.233064615843!2d176.2507699974189!3d-38.1388381229038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d6c277b70381649%3A0x193c03a4dd2ee1bd!2s1191%20Eruera%20Street%2C%20Rotorua%203010%2C%20New%20Zealand!5e0!3m2!1sen!2s!4v1702976204503!5m2!1sen!2s"
                        className="left-0 top-0 h-full w-full"
                        allowFullScreen></iframe>
                </div>
            </motion.section>
        </>
    )
}

export default Contact_Us