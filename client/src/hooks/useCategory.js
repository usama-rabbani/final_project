import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categoriess, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/vi/category/allcategories");
      setCategories(data?.getallcategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categoriess;
}