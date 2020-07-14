import React, { useEffect } from "react";
import Movie from "./Movie";
import Search from "../Search/Search";
import Loader from "../../Components/Loader";
import Paginator from "react-js-paginator";

const pageBoxStyle = {
  border: 0,
  color: "#93B7BE",
  padding: 3,
  fontSize: 16
};
const activePageBoxStyle = {
  fontWeight: "bolder",
  color: "#c5979d",
  backgroundColor: "#e7cfcd"
};
const Movies = props => {
  useEffect(() => {}, [props.movies]);
  return (
    <>
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
        onPageChangeCallback={e => {
          props.handlePageChange(e);
        }}
        pageBoxStyle={pageBoxStyle}
        activePageBoxStyle={activePageBoxStyle}
      />
    </>
  );
};

export default Movies;
