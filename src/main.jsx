import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Layout from './layouts/Layout.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Products />
      },
      {
        path: "product/:productDetail",
        element: <ProductDetail />
      },
    ],
  },
]);

const Root = () => {
  const [products, setProducts] = useState([]);

  return (
    <RouterProvider router={router}>
      <Layout setProducts={setProducts} />
    </RouterProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);