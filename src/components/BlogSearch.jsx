import { useState } from "react";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Passing the query to the parent component
  };

  return (
    <div className="search-bar flex justify-center mb-5">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleChange}
        className="p-2 border border-gray-500 rounded"
      />
    </div>
  );
}
