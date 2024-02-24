import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const { Option } = Select

function Createproduct() {
  const router = useRouter()
  const [categories, setcategories] = useState()
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [price, setprice] = useState()
  const [quantity, setquantity] = useState()
  const [shipping, setshipping] = useState()
  const [category, setcategory] = useState()



// Get All Categories
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


  // Create Products
  const handleproduct = async(e)=>{
    e.preventDefault();
    console.log(handleproduct);
    try {
      const ProductD = new FormData()
      ProductD.append("name",name)
      ProductD.append("description",description)
      ProductD.append("price",price)
      ProductD.append("shipping",shipping)
      ProductD.append("quantity",quantity)
      ProductD.append("image",image)
       ProductD.append("category",category)
      const { data } = await axios.post('http://localhost:8080/api/vi/product/createproduct', ProductD)
      if (data?.success) {
        toast.success('Product is Created Successfully');
        router.push('admind ')
      }
      else{
        toast.error(data?.message); 
      }
    } catch (error) {
      console.error(error);
      toast.error('Something wrong') 
    }
  
  }
  
  return (
    <main>
    
        <Select
          mode="multiple"
          bordered={false}
          placeholder="Select Categories "
         
          showSearch
          className='lg:w-[50rem] w-full bg-white rounded-lg border-2 border-blue-600 text-black' onChange={(value) => { setcategory(value) }}>
          {categories?.map((item) => {
            return (
              <Option key={item._id} value={item.name}>
                {item.name}
              </Option>
            )
          })}
        </Select>

        <div className="mt-6 ">
          <label className=' cursor-pointer hover:bg-red-200 rounded-lg py-2 px-36 bg-red-100'>
            {image ? image.name : "Upload File"}
            <input type="file" name="image" id="" className="lg:w-[50rem]" onChange={(e) => { setimage(e.target.files[0]) }} hidden accept="image/*" ></input>
          </label>
        </div>

        <div className="mt-6 ">
          {image && (
            <div className=''>
              <img src={URL.createObjectURL(image)} alt="Product-Image" className=' h-28 m-auto' />
            </div>
          )}
        </div>

        <div className='mt-4'>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block lg:w-[50rem] w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Name of Product"
            required
          />
          <div className='mt-4'>
          <textarea
  name="description"
  value={description}
  onChange={(e) => setdescription(e.target.value)}
  className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Description"
  required
/>

            </div>
           <div className='mt-4'>

            <input
            type="number" 
            name="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="price"
            required
            min="0" 
            step="0" 
          />
          </div>
<div className='mt-4'>
<input
type="number" 
name="quantity"
value={quantity}
onChange={(e) => setquantity(e.target.value)}
className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
placeholder="Select Quantity"
required
min="0" 
step="0" 
/>
        </div>
<div className='mt-4'>
<select
  name="shipping"
  value={shipping}
  onChange={(e) => setshipping(e.target.value)}
  className="bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required
>
  
  <option value="1">Yes</option>
  <option value="0">No</option>
  
</select>
      </div>

      <div className='mt-2'>
      <button className='bg-blue-700 rounded-lg text-white px-2 w-full py-1 hover:bg-blue-900' onClick={handleproduct}>Create Product</button>
      </div>
     

    
          </div>


    
       
    </main>
  )
}

export default Createproduct












// import React, { useState } from 'react';
// import { Select } from 'antd';

// const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

// const App: React.FC = () => {
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);

//   const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

//   return (
//     <Select
//       mode="multiple"
//       placeholder="Inserted are removed"
//       value={selectedItems}
//       onChange={setSelectedItems}
//       style={{ width: '100%' }}
//       options={filteredOptions.map((item) => ({
//         value: item,
//         label: item,
//       }))}
//     />
//   );
// };

// export default App;