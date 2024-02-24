'use client'
import React, { useState , useEffect} from 'react';
import Link from 'next/link';
import Createcategory from './createcategory'; 
import Createproduct from './createproduct'; 
import Products from './products';
function Dashboard() {
  const [activeStep, setActiveStep] = useState('dashboard');
 
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    



  return (
<main>
<h1 className='text-3xl font-bold text-center pt-4'>Admin Dashboard</h1>

    <div className='mt-5 mb-16 flex space-x-36'>
      

      <div className="w-48 text-gray-900 bg-white border border-gray-200  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <h1 className='text-3xl font-bold text-center pt-4 pb-2'>Admin Panel</h1>
        <button
          onClick={() => handleStepChange('dashboard')}
          type="button"
          className={`relative inline-flex  items-center w-full px-4 py-4 text-sm font-medium border-b hover:bg-blue-700 hover:text-white hover:text-blue-700  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'dashboard' ? 'bg-blue-700 text-white' : ''}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => handleStepChange('createcategory')}
          className={`relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'createcategory' ? 'bg-blue-700 text-white' : ''}`}
        >
          Create Categories
        </button>

        <button
          onClick={() => handleStepChange('createproduct')}
          type="button"
          className={`relative inline-flex items-center w-full px-4 py-4 text-sm font-medium rounded-b-lg hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'createproduct' ? 'bg-blue-700 text-white' : ''}`}
        >
          Create Products
        </button>

        <button
          onClick={() => handleStepChange('products')}
          type="button"
          className={`relative inline-flex items-center w-full px-4 py-4 text-sm font-medium rounded-b-lg hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'products' ? 'bg-blue-700 text-white' : ''}`}
        >
          Products
        </button>
      </div>

      {activeStep === 'dashboard' && (
        // Your dashboard content goes here
        <div>
          <h2>Dashboard Content</h2>
        </div>
      )}

      {activeStep === 'createcategory' && (
        <Createcategory/>
      )}

      {activeStep === 'createproduct' && (
        <Createproduct/>
      )}

      {activeStep === 'products' && (
        <Products/>
      )}
    </div>
    </main>
  );
}

export default Dashboard;
