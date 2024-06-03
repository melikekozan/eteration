import React, { useState } from 'react';
import useFilterStore from "../store/useFilterStore";
import Card from 'react-bootstrap/Card';

const ModelFilter = () => {
  const [search, setSearch] = useState('');
  const models = useFilterStore((state) => state.models);
  const selectedModels = useFilterStore((state) => state.selectedModels);
  const setSelectedModels = useFilterStore((state) => state.setSelectedModels);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedModels(selectedModels.includes(value)
      ? selectedModels.filter(model => model !== value)
      : [...selectedModels, value]);
  };

  const filteredModels = models.filter(model => model.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card className="shadow mb-3">
      <Card.Header>
        Models
      </Card.Header>
      <Card.Body className="model-filter-scroll" style={{ maxHeight: '145px', overflowY: 'auto' }}>
        <input
          type="text"
          placeholder="Search models"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-3"
        />
        {filteredModels.map((model) => (
          <div key={model}>
            <input
              className="me-1"
              type="checkbox"
              id={model}
              value={model}
              checked={selectedModels.includes(model)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={model}>{model}</label>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default ModelFilter;