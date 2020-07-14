import React, { useState } from "react";
import "../Style.css"

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
      setSearchValue(e.target.value)
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const search = (e) => {
      e.preventDefault();
      props.search(searchValue);
      resetInputField()
  };
  return (
    <form className="search">
      <input
        type="text"
        onChange={handleSearchInputChanges}
        value={searchValue}
      />
      <input type="submit" onClick={search} value="Search" />
    </form>
  );
};

export default Search;
