import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function Creatcategory() {
  const [category, setcategory] = useState([])

  const getallcategories = async ()=>{
    try {
      
    } catch (error) {
      console.error(error);
        toast.error('Login failed');
    }
  }
  return (
   <main>
<div className="mb-6 flex justify-center items-center">
  <input
    type="text"
    id="success"
    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block lg:w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
    placeholder="Create Category "
  />
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        
               <th scope="col" className="px-6 py-3">
          Category
        </th>
        
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
       
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          
        </th>
       
        <td className="flex items-center px-6 py-4 space-x-3">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
          <a
            href="#"
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Remove
          </a>
        </td>
      </tr>

    </tbody>
  </table>
</div>



   </main>
       
        
  )
}

export default Creatcategory
