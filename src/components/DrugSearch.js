// components/DrugSearch.js
import React, { useState } from 'react';
import { default as RxNormAPI } from '../api/RxNormAPI';
import '../App.css'

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const rxNormApi = new RxNormAPI();

   const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await rxNormApi.getDrugs(searchTerm);
      if (!response.drugGroup || !response.drugGroup.conceptGroup) {
        const suggestions = await rxNormApi.getSpellingSuggestions(searchTerm);
        const suggestedSpelling = suggestions.suggestionGroup.suggestionList.suggestion;
        const formattedSuggestions = [{ name: suggestedSpelling[0] }];
        setSearchResults(formattedSuggestions);
      } else {
        const allConceptProperties = response.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []);
        setSearchResults(allConceptProperties);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="search-container">
  <form onSubmit={handleSearch} className="search-form">
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search for a drug"
      className="search-input"
    />
    <button type="submit" className="search-button">
      Search
    </button>
  </form>

  {searchResults.length > 0 ? (
    <ul className="search-results">
      {searchResults.map((drug) => (
        <li key={drug.name ? drug.name : drug.suggestion}>
          <a href={`/drugs/${drug.name}`} className="drug-link">
            {drug.name}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-results">No results found</p>
  )}

  {error && (
    <p className="error-message">
      Error: {error}
    </p>
  )}
</div>
    </div>
  );
};

export default DrugSearch;