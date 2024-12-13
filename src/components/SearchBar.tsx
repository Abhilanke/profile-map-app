import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <div className="input-group">
        <span className="input-group-text bg-transparent border-0">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search profiles..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

