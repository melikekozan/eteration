import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import useCartStore from '../store/useCardStore';
import useFilterStore from '../store/useFilterStore';

const Header = () => {
  const [query, setQuery] = useState('');
  const { totalPrice } = useCartStore();
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setProducts = useFilterStore((state) => state.setProducts);
  const setBrands = useFilterStore((state) => state.setBrands);
  const setModels = useFilterStore((state) => state.setModels);
  const navigate = useNavigate();

  const fetchProducts = async (searchQuery) => {
    try {
      const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
      const allProducts = response.data;

      const uniqueBrands = [...new Set(allProducts.map(product => product.brand))];
      const uniqueModels = [...new Set(allProducts.map(product => product.model))];

      setBrands(uniqueBrands);
      setModels(uniqueModels);
  
      const filteredProducts = searchQuery 
        ? allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : allProducts;
  
      setSearchQuery(searchQuery);
      setProducts(filteredProducts);
      navigate('/');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const debouncedFetchProducts = debounce(fetchProducts, 300);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetchProducts(value);
  };

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <header className="py-2 navbar navbar-expand-lg bg-primary">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-3">
            <div className="navbar-brand fs-4">
              <a href="/" className="nav-link" aria-current="page">
                <strong>Eteration</strong>
              </a>
            </div>
          </div>
          <div className="col-6">
            <form className="d-flex w-75">
              <input
                type="search"
                className="form-control"
                aria-label="Search"
                placeholder="Search"
                value={query}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col-6">
                <FontAwesomeIcon icon={faBasketShopping} className="text-white me-2" />
                <span className="text-white">{totalPrice.toFixed(2)} ₺</span>
              </div>
              <div className="col-6">
                <FontAwesomeIcon icon={faUser} className="text-white me-2" />
                <span className="text-white">Melike</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;