import React from 'react';

export default function Filter({ filter, onFilterChange }) {
  return (
    <label>
      Filter
      <input
        type="search"
        name="filter"
        value={filter}
        onChange={event => onFilterChange(event.target.value)}
      />
    </label>
  );
}
