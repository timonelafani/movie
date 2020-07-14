import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";

const Nav = props => {
  const getMovies = genre => {
    props.movies(genre, 1);
  };
  return (
    <>
      <div className="genres">
        <ul className="genres-list">
          <Link to="/movies/popular">
            <li onClick={() => getMovies("popular")} className="genre">
              Popular
            </li>
          </Link>
          <Link to="/movies/now_playing">
            <li onClick={() => getMovies("now_playing")} className="genre">
              Now Playing
            </li>
          </Link>
          <Link to="/movies/upcoming">
            <li onClick={() => getMovies("upcoming")} className="genre">
              Upcoming
            </li>
          </Link>
          <Link to="/movies/top_rated">
            <li onClick={() => getMovies("top_rated")} className="genre">
              Top rated
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Nav;
