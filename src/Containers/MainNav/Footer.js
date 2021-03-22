import React from "react";
import { Link } from "react-router-dom";
import "../../Components/Style.css";
import logo from "../../images/footer.png";

const Footer = (props) => {
  return (
    <>
      <footer className="App-footer">
        <div>
          <img src={logo} className="footer-logo" alt="logo" />
        </div>
        <div>
          <h3 className="footer-descritption-title" style={{ paddingRight: 0 }}>
            Tech stack
            {/* This project uses TheMovieDB APIs */}
          </h3>
          <h5 className="footer-descritption">
            Reactjs
            <br /> JavaScript
            <br /> Firebase
            <br /> CSS
            <br /> JSX
          </h5>
        </div>
        <div>
          <h3 className="footer-descritption-title">About Us</h3>
          <h5 className="footer-descritption">
            It includes rich features & contents. It's designed & developed
            based on One Page/ Multi-page Layout. <br />
            <br />
            This project uses TheMovieDB APIs
          </h5>
        </div>
      </footer>
      <div className="copyright">timonelafani © 2020</div>
    </>
  );
};

export default Footer;
