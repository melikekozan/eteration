import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import Cart from '../Components/Cart';
import useFilterStore from '../store/useFilterStore';
import SortByFilter from '../Components/SortByFilter';
import BrandFilter from '../Components/BrandFilter';
import ModelFilter from '../Components/ModelFilter';

const Products = () => {
  const products = useFilterStore((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const sortBy = useFilterStore((state) => state.sortBy);
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedModels = useFilterStore((state) => state.selectedModels);
  const searchQuery = useFilterStore((state) => state.searchQuery);

  const filterProducts = () => {
    let filteredProducts = [...products];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }

    if (selectedModels.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedModels.includes(product.model));
    }

    switch (sortBy) {
      case 'oldToNew':
        filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newToOld':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'priceHighToLow':
        filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'priceLowToHigh':
        filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  if (!products || products.length === 0) {
    return null; 
  }

  const currentProducts = filterProducts().slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-2 col-12">
        <SortByFilter />
          <BrandFilter />
          <ModelFilter />
        </div>
        <div className="col-lg-7 col-12">
          <ProductCard products={currentProducts} />
        </div>
        <div className="col-lg-3 col-12">
          <Cart />
        </div>
      </div>
      <nav className="mt-3">
      <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filterProducts().length / productsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Products;