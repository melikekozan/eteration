import React from 'react';
import { render } from '@testing-library/react';
import BrandFilter from "../BrandFilter";

describe('BrandFilter component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<BrandFilter />);
    const searchInput = getByPlaceholderText('Search brands');
    expect(searchInput).toBeInTheDocument();
  });


});