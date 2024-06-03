import React, { useState } from 'react';
import useFilterStore from "../store/useFilterStore";
import Card from 'react-bootstrap/Card';

const BrandFilter = () => {
  const [search, setSearch] = useState('');
  const brands = useFilterStore((state) => state.brands);
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const setSelectedBrands = useFilterStore((state) => state.setSelectedBrands);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedBrands(selectedBrands.includes(value)
      ? selectedBrands.filter(brand => brand !== value)
      : [...selectedBrands, value]);
  };

  const filteredBrands = brands.filter(brand => brand.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card className="shadow mb-3">
      <Card.Header>
        Brands
      </Card.Header>
      <Card.Body className="model-filter-scroll" style={{ maxHeight: '145px', overflowY: 'auto' }}>
        <input
          type="text"
          placeholder="Search brands"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-3"
        />
        {filteredBrands.map((brand) => (
          <div key={brand}>
            <input
              className="me-1"
              type="checkbox"
              id={brand}
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={handleCheckboxChange}
              data-testid={`${brand}-checkbox`}
            />
            <label htmlFor={brand} data-testid={`${brand}-label`}>{brand}</label>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default BrandFilter;