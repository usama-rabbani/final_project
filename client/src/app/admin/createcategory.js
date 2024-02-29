import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import { motion } from 'framer-motion';

function CreatCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/vi/category/allcategories');
      if (data.success) {
        setCategories(data.getallcategory);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`http://localhost:8080/api/vi/category/updatecategories/${selectedCategory._id}`, { name: updatedName });
      if (data.success) {
        toast.success(`${updatedName} has been updated`);
        setSelectedCategory(null);
        setVisible(false);
        setUpdatedName('');
        getAllCategories();
      } else {
        toast.error(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/vi/category/deletecategories/${_id}`);
      if (data.success) {
        toast.success('Category has been deleted');
        getAllCategories();
      } else {
        toast.error(data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/vi/category/categories', { name });
      if (data.success) {
        toast.success(`${name} has been created`);
        getAllCategories();
      } else {
        toast.error(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <section>
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{
          stiffness: 100,
          damping: 15,
          duration: 1,
          ease: "easeIn",
        }}
        className="mb-6 flex justify-center items-center"
      >
        <form className='flex' onSubmit={handleSubmit} action="#">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            className="bg-green-50 border w-32 md:w-[50rem] border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Create Category"
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
        }}
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <div className="flex justify-between md:px-16 px-4 py-4 bg-red-200 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <p1>Category</p1>
          <p1 className='pr-8'>Actions</p1>
        </div>
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <tbody>
            {categories.map((item) => (
              <tr key={item._id} className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-4 md:px-16 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </td>
                <td className="flex px-4 md:px-16 py-4 space-x-2">
                  <button
                    onClick={() => { setVisible(true); setUpdatedName(item.name); setSelectedCategory(item); }}
                    className="font-medium rounded-lg py-1 dark:text-blue-500 px-2 bg-blue-700 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { handleDelete(item._id); }}
                    className="font-medium text-white bg-red-700 px-2 py-1 rounded-lg dark:text-red-500 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal onCancel={() => setVisible(false)} open={visible}>
          <form className='flex' onSubmit={handleUpdate} action="#">
            <input
              onChange={(e) => setUpdatedName(e.target.value)}
              type="text"
              value={updatedName}
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block lg:w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              placeholder={`${updatedName}`}
            />
            <button className='px-2 py-1 ml-2 bg-blue-600 text-white rounded-lg'>Submit</button>
          </form>
        </Modal>
      </motion.div>
    </section>
  );
}

export default CreatCategory;
