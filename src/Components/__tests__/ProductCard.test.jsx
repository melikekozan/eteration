import React from 'react';
import { render } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { MemoryRouter } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'image1.jpg',
    price: "10",
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'image2.jpg',
    price: "20",
  },
];

describe('ProductCard component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductCard products={products} />
      </MemoryRouter>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();

  });

 
});