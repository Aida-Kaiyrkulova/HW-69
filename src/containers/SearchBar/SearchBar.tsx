import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { clearResults, searchDisplay } from './searchSlice.ts';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.search.results)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);

  if (query) {
    dispatch(searchDisplay(query));
  } else {
    dispatch(clearResults());
  }
  };

  return (
      <div className="search-bar-container">
        <h2>Search for Tv Show:</h2>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Type your search"
        />
        {query && results.length > 0 && (
          <div className="autocomplete">
            {results.map((show) => (
              <Link to={`/shows/${show.id}`} key={show.id}>
                <div className="autocomplete-item">{show.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      );
      };

      export default SearchBar;