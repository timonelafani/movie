import React from "react";
import "../../Components/Style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav";

const Header = (props) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [style, setStyle] = React.useState({
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "80px",
  });
  const handleScroll = () => {
    const position = window.pageYOffset;

    setScrollPosition(position);
    if (position > 100) {
      setStyle({
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        height: "70px",
      });
    }
    if (position < 100) {
      setStyle({
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        height: "80px",
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="App-header" style={style}>
      <Link to="/movies/popular">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <Nav movies={props.movies} />
    </header>
  );
};

export default Header;
