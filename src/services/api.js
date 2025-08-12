import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});


export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${category}:`, error);
    throw error; 
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o produto com ID ${id}:`, error);
    throw error;
  }
};