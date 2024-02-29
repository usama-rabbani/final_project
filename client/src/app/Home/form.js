import React from 'react'
import { useSearch } from '../../context/search'
import axios from "axios";
import { useRouter } from 'next/navigation'

function FORM() {
    const router = useRouter()
    const [values, setValues] = useSearch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.get(`http://localhost:8080/api/vi/product/search/${values.keyword}`,
           
          );
          setValues({ ...values, results: data });
         router.push('/display')
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <main>
    
    <form className='flex mt-3' onSubmit={handleSubmit} >
  <input  onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    type="text"
    value={values.keyword}
    id="success"
    className="bg-green-50 border lg:w-[15rem] border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
    placeholder="Search Product "
  />
  <button type='submit'  className='px-2  bg-blue-600 ml-2 text-white rounded-lg'>Submit</button>
  </form>
    </main>
  )
}

export default FORM
