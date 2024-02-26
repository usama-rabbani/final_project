import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import { motion } from 'framer-motion'
function Creatcategory() {
  const [categories, setcategories] = useState([])
  const [name, setname] = useState("")
  const [visible, setvisible] = useState(false)
  const [select, setselect] = useState(null)
  const [updatedName, setupdatedName] = useState('')

  // get all categories

  const GetAllCat = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/vi/category/allcategories')
      if (data.success) {
        setcategories(data.getallcategory)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetAllCat();
  }, [])

  // Update
  const handleupdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`http://localhost:8080/api/vi/category/updatecategories/${select._id}`, { name: updatedName });
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setselect(null);
        setvisible(false);
        setupdatedName('');
        GetAllCat();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong');
    }

  };

  // Delete Category

  const handledelete = async (_id) => {


    try {
      const { data } = await axios.delete(`http://localhost:8080/api/vi/category/deletecategories/${_id}`);
      if (data.success) {
        toast.success(`category is Deleted`);


        GetAllCat();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong');
    }

  };

  // Create Category 
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/vi/category/categories', { name })
      if (data.success) {
        toast.success(`${name} is Created`)
        GetAllCat();

      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong')
    }
  }


  return (
    <section className=''>
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{
          stiffness: 100,
          damping: 15,
          duration: 1,
          ease: "easeIn",
        }} className="mb-6 flex justify-center items-center">
        <form className='flex' onSubmit={handlesubmit} action="#">
          <input onChange={(e) => setname(e.target.value)}
            type="text"
            value={name}
            id="success"
            className="bg-green-50 border w-32 md:w-[50rem] border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Create Category "
          />
          <button className='px-2 py-1 bg-blue-600 ml-2 text-white rounded-lg'>Submit</button>
        </form>
      </motion.div>
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{
          stiffness: 100,
          damping: 15,
          duration: 1,
          ease: "easeIn",
        }} className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div
          className=" flex justify-between md:px-16 px-4  py-4 bg-red-200  font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <p1 >Category</p1>
          <p1 className='pr-8'>Actions</p1>
        </div>
        <table className="w-full  text-sm  text-gray-500 dark:text-gray-400">

          <tbody >
            {categories?.map((item) => (

              <tr
                key={item._id}
                className="bg-white  flex justify-between  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  className="px-4 py-4 md:px-16 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </td>
                <td className="flex px-4 md:px-16 py-4 space-x-2">
                  <button
                    onClick={() => { setvisible(true); setupdatedName(item.name); setselect(item) }}
                    className="font-medium rounded-lg py-1 dark:text-blue-500 px-2 bg-blue-700 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { handledelete(item._id) }}
                    className="font-medium text-white bg-red-700 px-2 py-1 rounded-lg dark:text-red-500 hover:bg-red-600 "
                  >
                    Remove
                  </button>
                </td>
              </tr>

            ))}
          </tbody>

        </table>
        <Modal
          onCancel={() => setvisible(false)} open={visible} footer={null}>

          <form className='flex' onSubmit={handleupdate} action="#">
            <input onChange={(e) => setupdatedName(e.target.value)}
              type="text"
              value={updatedName}
              id="success"
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block lg:w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder={`${updatedName}`}
            />
            <button className='px-2 py-1 ml-2 bg-blue-600 text-white rounded-lg'>Submit</button>
          </form>
        </Modal>
      </motion.div>



    </section>


  )
}

export default Creatcategory
