import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { clearResults, searchDisplay } from "./searchSlice.ts";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.search.results);
  const status = useAppSelector((state) => state.search.status);

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
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for TV Shows..."
        />
      </div>
      {status === "loading" && <div className="loader">Loading...</div>}
      {query && results.length > 0 && (
        <div className="autocomplete">
          {results.map((show) => (
            <Link
              to={`/shows/${show.id}`}
              key={show.id}
              style={{ textDecoration: "none" }}
            >
              <div className="autocomplete-item">{show.name}</div>
            </Link>
          ))}
        </div>
      )}
      {results.length === 0 && query && status !== "loading" && (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchBar;
