'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Prices } from '../Home/pricedata';
const FilteredProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [radio, setradio] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vi/category/allcategories');
        if (response.data?.success) {
          setCategories(response.data.getallcategory);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch filtered products when selected filters change
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/vi/product/filterproducts', {
          checked: selectedCategories.map(category => category._id),
          radio: radio,
        });

        if (response.data?.success) {
          setproducts(response.data.Filterproducts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, setradio]);

  const handleCategoryChange = (categoryId) => {
    // Toggle selected category
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setradio([minPrice, maxPrice]);
  };
  const GetAllProducts = async () => {
    console.log('abc', GetAllProducts );
              try {
                  // setloading(true)
                const { data } = await axios.get('http://localhost:8080/api/vi/product/getallproduct')
              //   setloading(false)
                if (data?.success) {
                  setproducts(data.allproducts )
                }
              } catch (error) {
                  // setloading(false)
                console.error(error);
              }
            }
            useEffect(() => {
                GetAllProducts()
                
            }, []);
  return (
    <div>
      {/* Render UI elements for category and price selection */}
      {/* For simplicity, you can use checkboxes for categories and a range slider for price */}

      <div>
        <h2>Categories</h2>
        {categories.map(category => (
          <div key={category._id}>
            <input
              type="checkbox"
              id={category._id}
              checked={selectedCategories.includes(category._id)}
              onChange={() => handleCategoryChange(category._id)}
            />
            <label htmlFor={category._id}>{category.name}</label>
          </div>
        ))}
      </div>

      <div>
        <h2>Price Range</h2>
        <label htmlFor="FilterInStock" className="space-y-1 pb-6">
        {Prices.map((item) => (
            <div key={item._id} className="flex space-x-16 items-center pl-6 pb-3">
                <input
                    type="radio"
                    className="h-6 w-6 rounded border-gray-300"
                    value={item.array}
                    name="priceGroup"
                    onChange={(e) => setradio(e.target.value)}
                />
                <li className="text-sm text-xl font-bold text-gray-700 list-none">{item.name}</li>
            </div>
        ))}
    </label>
      </div>

      {/* Render the filtered products */}
      <div>
      <div className='grid grid-cols-2 gap-4'>
      {products?.map((item)=>{
        
        return(
          
            <div key={item._id} className='lg:w-full w-full'>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={`http://localhost:8080/api/vi/product/getimage/${item._id}`}
          alt={item.image}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {item.name}
          </h5>
        </a>
       
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${item.price}
          </span>
          </div>
      <div className='flex justify-between items-center mt-2'>
            <button onClick={() => router.push(`/readmore/${item.slug}`)}
             
            className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read More
          </button>
          <button onClick={()=>{ setCart([...cart, item]);
              localStorage.setItem("cart", JSON.stringify([...cart , item]));
          toast.success('Item Added to Cart')
          } }
          
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
          </div>
        </div>
      </div>
      </div>
      
      
      
        )
       
      })}
       
      </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
