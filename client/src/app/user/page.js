'use client'

import React,{ useState} from 'react'
import Orders from './orders';
import Profile from './profile';
import { useauth } from '../../context/auth'


function user() {
  const [activeStep, setActiveStep] = useState('dashboard');
  const { auth }  = useauth( );
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (

   
    <>

    <div className=' items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
    <h1 className='text-3xl font-bold text-center pt-4'>User Dashboard</h1>
<main className='grid grid-cols-2'>
<div>
<div className="w-48 text-gray-900 bg-white border border-gray-200  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <h1 className='text-3xl font-bold text-center pt-4 pb-2'>User Panel</h1>
       

        <button
          onClick={() => handleStepChange('profile')}
          className={`relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'profile' ? 'bg-blue-700 text-white' : ''}`}
        >
         Profile
        </button>

        <button
          onClick={() => handleStepChange('orders')}
          type="button"
          className={`relative inline-flex items-center w-full px-4 py-4 text-sm font-medium rounded-b-lg hover:bg-blue-700 hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${activeStep === 'orders' ? 'bg-blue-700 text-white' : ''}`}
        >
          Orders
        </button>
</div></div>
        <div>

        {activeStep === 'profile' && (
          <Profile/>
        )}
  
        {activeStep === 'orders' && (
          <Orders/>
        )}
       
      </div>
    




</main>


     
    

    </div>
    </>
  )
}

export default user;

