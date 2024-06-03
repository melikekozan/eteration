import React from 'react';
import useFilterStore from "../store/useFilterStore";
import Card from 'react-bootstrap/Card';

const SortByFilter = () => {
  const setSortBy = useFilterStore((state) => state.setSortBy);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Card className="shadow mb-3">
      <Card.Header>
        Sort By
      </Card.Header>
      <Card.Body>
        <div>
          <input className="me-1" type="radio" id="oldToNew" name="sortBy" value="oldToNew" onChange={handleSortChange} />
          <label htmlFor="oldToNew">Old to New</label>
        </div>
        <div>
          <input className="me-1" type="radio" id="newToOld" name="sortBy" value="newToOld" onChange={handleSortChange} />
          <label htmlFor="newToOld">New to Old</label>
        </div>
        <div>
          <input className="me-1" type="radio" id="priceHighToLow" name="sortBy" value="priceHighToLow" onChange={handleSortChange} />
          <label htmlFor="priceHighToLow">Price High to Low</label>
        </div>
        <div>
          <input className="me-1" type="radio" id="priceLowToHigh" name="sortBy" value="priceLowToHigh" onChange={handleSortChange} />
          <label htmlFor="priceLowToHigh">Price Low to High</label>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SortByFilter;