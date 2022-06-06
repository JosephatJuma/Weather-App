import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Search = ({
  searchTerm,
  onSearch,
  getSearch,
  isSerach,
  getCurrentLocation,
}) => {
  return (
    <div className="input-part">
      {isSerach ? (
        <>
          <div className="search-box">
            <input
              type="search"
              placeholder="Enter City"
              onChange={getSearch}
              value={searchTerm}
              onKeyPress={onSearch}
            />
          </div>
          <p className="separator"></p>
          <button onClick={getCurrentLocation} onChange={getSearch}>
            use device location
          </button>
        </>
      ) : (
        " "
      )}
    </div>
  );
};

export default Search;
