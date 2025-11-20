import { useState, useEffect } from "react";

// searching of tasks with debouncing
const TableSearch = ({
  placeholder = "Search...",
  initialValue = "",
  onSearch,
  delay = 800, // debounce delay 
}) => {
  const [query, setQuery] = useState(initialValue);

  // keep input sync when parent updates value
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
  if (query === initialValue) return; 

  const timer = setTimeout(() => {
    onSearch(query);
  }, delay);// set delay for debouncing

  return () => clearTimeout(timer);
}, [query, initialValue, delay, onSearch]);


  return (
    <div className="w-full md:w-68 flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      {/* searching ui */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
     
     {/* searching input  */}
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2.5 bg-transparent outline-none"
        aria-label={placeholder}
      />
    </div>
  );
};

export default TableSearch;
