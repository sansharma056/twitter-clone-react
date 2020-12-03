import React from "react";
import { SearchIcon } from "./Icons";

const SearchInput = ({ onChange }) => {
  return (
    <div className="search-input">
      <SearchIcon />
      <input
        type="text"
        placeholder="Seach Twitter Clone"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
