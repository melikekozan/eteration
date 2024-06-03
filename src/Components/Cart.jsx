import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useCartStore from "../store/useCardStore";

const Cart = () => {
  const { cart, totalPrice, incrementQuantity, decrementQuantity } = useCartStore();

  if (cart.length === 0) {
    return (
      <Card className="shadow">
        <Card.Body>
          <p className='cartText'>Your cart is empty</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className=" shadow">
        <Card.Body>
          {cart.map(item => (
            <div className="d-flex justify-content-between align-items-center mb-2" key={item.id}>
              <div>
                <div className='cartText'>{item.name}</div>
                <div className='cartText text-primary'>{item.price} ₺</div>
              </div>
              <div>
                <Button variant="outline-primary" size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
                <span className="p-2">{item.quantity}</span>
                <Button variant="outline-primary" size="sm" onClick={() => incrementQuantity(item.id)}>+</Button>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="mt-3 shadow">
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    Total Price:
                </div>
                <div>
                    {totalPrice.toFixed(2)} ₺
                </div>
            </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cart;