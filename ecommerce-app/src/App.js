import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Navbar from './features/Navbar';
import Container from './features/Container';
import Home from './features/Home';
import AddForm from './features/Product/AddForm';
import UpdateForm from './features/Product/UpdateForm';
import { fetchProducts } from './features/Product/actions';
import GlobalStyle from './features/GlobalStyle';

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
        const response = await axios.get(
          'https://68e9fffbf1eeb3f856e5bb1d.mockapi.io/React/products'
        );
        dispatch(fetchProducts(response.data));
      }

    getProducts();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        {products.length > 0 ? (
          <Routes>
            <Route path="/create-product" element={<AddForm />} />
            <Route path="/update-product/:id" element={<UpdateForm />} />
            <Route path="/" element={<Home products={products} />} />
          </Routes>
        ) : (
          <div>Loading products...</div>
        )}
      </Container>
    </>
  );
}

export default App;