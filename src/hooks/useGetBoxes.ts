import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const products = await axios.get("http://localhost:5000/api/box/search");
    setProducts(products.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, fetchProducts };
};
