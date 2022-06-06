import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";
const Header = ({ title, isSearch, goBack }) => {
  return (
    <>
      {isSearch ? (
        <header>
          <h2>{title}</h2>
        </header>
      ) : (
        <header>
          <h2>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} /> {title}
          </h2>
        </header>
      )}
    </>
  );
};

export default Header;
