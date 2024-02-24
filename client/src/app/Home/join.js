// Join.js
import React from 'react';
import Filters from './filters'; // Make sure the file path is correct
import Products from './products'; // Make sure the file path is correct

function Join() {
  return (
    <main className='mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8'>

      <div className='grid grid-cols-2 '>
        <div>
        <h1 className='text-xl font-bold pt-8 pb-8'>All Filters</h1>
          <Filters />
        </div>
        <div>
        <h1 className='text-xl font-bold pt-8 pb-8'>All Products</h1>
          <Products />
        </div>
      </div>
    </main>
  );
}

export default Join;

// 'use client'
// import { useState, useEffect } from 'react';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import axios from 'axios';

// function Accordion() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [checkboxStates, setCheckboxStates] = useState([]);

//   // Get all categories
//   const GetAllCat = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8080/api/vi/category/allcategories');
//       if (data.success) {
//         setCategories(data.getallcategory);
//         // Initialize checkboxStates with a default value of false for each category
     
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     GetAllCat();
//   }, []);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleCheckboxChange = (index) => {
//     const newCheckboxStates = [...checkboxStates];
//     newCheckboxStates[index] = !newCheckboxStates[index];
//     setCheckboxStates(newCheckboxStates);
//   };

//   return (
//     <div>
//       <button
//         className="p-2 flex rounded-lg w-full text-left focus:outline-none"
//         onClick={toggleAccordion}
//       >
//         {isOpen ? <FaMinus /> : <FaPlus />} Accordion Item
//       </button>
//       {isOpen && (
//         <div className="p-4 space-y-2">
//           {categories.map((item, index) => (
//             <label key={item._id} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={checkboxStates[index]}
//                 onChange={() => handleCheckboxChange(index)}
//               />
//               <p>{item.name}</p>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Accordion;



