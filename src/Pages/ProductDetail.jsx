import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cart from '../Components/Cart';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useCartStore from '../store/useCardStore';

const ProductDetail = () => {
  const { productDetail } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products/${productDetail}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productDetail]);

  return (
    <div className='container mt-3'>
      <div className="row">
        <div className="col-lg-9 col-12">
          <Card className='p-3 shadow'>
          <div className="row ">

<div className="col-lg-6 col-12">
  {product && <img src={product.image} alt={product.name} className="img-fluid rounded" />}
</div>
<div className="col-lg-6 col-12">
  {product && (
    <>
      <h2>{product.name}</h2>
      <p className='fs-4 text-primary'>{product.price} ₺</p>
      <Button className='productButton' style={{width:"100%"}} onClick={() => addToCart(product)}>
                Add to Card
              </Button>
      <p className='productDetail'>{product.description}</p>
    </>
  )}
</div>
</div>
          </Card>
          
        </div>
        <div className="col-lg-3 col-12">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;