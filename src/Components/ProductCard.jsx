import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useCartStore from '../store/useCardStore';
import { Link } from 'react-router-dom';

const ProductCard = ({ products }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  if (!products || products.length === 0) {
    return <div></div>;
  }
  return (
    <div className="row">
      {products.map(product => (
        <div className='col-md-3 mb-3 ' key={product.id}>
          <Link to={`/product/${product.id}`} className='text-decoration-none'>
            <Card className="h-100 shadow">
            <Card.Img className='img-fluid' variant="top" src={product.image} />
            <Card.Body>
              <Card.Title className='productPrice'>{product.price} ₺ </Card.Title>
              <Card.Text className='productText'>{product.name}</Card.Text>
              <Button className='productButton' style={{width:"100%"}} onClick={() => addToCart(product)}>
                Add to Card
              </Button>
            </Card.Body>
          </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;