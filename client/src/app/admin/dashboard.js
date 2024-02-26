'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'
import Createcategory from './createcategory';
import Createproduct from './createproduct';
import Products from './products';
function Dashboard() {
  const [activeStep, setActiveStep] = useState('dashboard');

  const handleStepChange = (step) => {
    setActiveStep(step);
  };




  return (
    <section className='py-8 container px-4 mx-auto'>
      <h1 className='md:text-3xl text-xl font-bold text-center md:pt-4 md:pb-0 pb-4'>Admin Dashboard</h1>

      <div className='md:flex space-y-4 md:space-y-0 md:gap-16'>


      <motion.div
          initial={{ x:'-100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 1,
            ease: "easeIn",
          }}  className="md:max-w-48  text-gray-900 bg-white border rounded-tl-3xl rounded-br-3xl dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <h1 className='text-center py-4 font-bold border-b'>Admin Panel</h1>
          <div className=''>
          <button
            onClick={() => handleStepChange('dashboard')}
            type="button"
            className={`relative  w-full md:w-48 items-center  px-4 py-4 text-sm font-medium border-b hover:bg-blue-700  hover:text-white  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'dashboard' ? 'bg-blue-700 text-white' : ''}`}
          >
            Dashboard
          </button><br/>

          <button
            onClick={() => handleStepChange('createcategory')}
            className={`relative w-full md:w-48 items-center  px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'createcategory' ? 'bg-blue-700 text-white' : ''}`}
          >
            Create Categories
          </button><br/>

          <button
            onClick={() => handleStepChange('createproduct')}
            type="button"
            className={`relative w-full md:w-48 items-center  px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'createproduct' ? 'bg-blue-700 text-white' : ''}`}
          >
            Create Products
          </button><br/>

          <button
            onClick={() => handleStepChange('products')}
            type="button"
            className={`relative w-full md:w-48 items-center  px-4 py-4 text-sm font-medium rounded-b-lg hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'products' ? 'bg-blue-700 text-white' : ''}`}
          >
            Products
          </button>
          </div>
        </motion.div>
<div >
        {activeStep === 'dashboard' && (
          
          <div>
            <h2 className='text-center'>Select On Admin Panel</h2>
          </div>
        )}

        {activeStep === 'createcategory' && (
          <Createcategory />
        )}

        {activeStep === 'createproduct' && (
          <Createproduct />
        )}

        {activeStep === 'products' && (
          <Products />
        )}
  </div>
      </div>
    </section>
  );
}

export default Dashboard;
