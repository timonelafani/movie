import React, { useEffect } from "react";
import Movie from "./Movie";
import Search from "../Search/Search";
import Loader from "../../Components/Loader";
import Paginator from "react-js-paginator";

const pageBoxStyle = {
  border: 0,
  // color: "#93B7BE",
  color: "#ffffff",
  padding: 3,
  fontSize: 16,
  padding: 0,
};
const activePageBoxStyle = {
  fontWeight: "bolder",
  color: "#F73636",
  // padding: "4px 7px",
  // backgroundColor: "#e7cfcd",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
};
const Movies = (props) => {
  useEffect(() => {}, [props.movies]);
  return (
    <div className="wrapper">
      <Search search={props.search} />
      <div className="movies">
        {props.c && !props.errorMessage ? (
          <Loader />
        ) : props.errorMessage ? (
          <div className="errorMessage">{props.errorMessage}</div>
        ) : (
          props.movies &&
          props.movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
      <Paginator
        pageSize={20}
        totalElements={props.totalPages}
        onPageChangeCallback={(e) => {
          props.handlePageChange(e);
        }}
        pageBoxStyle={pageBoxStyle}
        activePageBoxStyle={activePageBoxStyle}
      />
    </div>
  );
};

export default Movies;
