import React, { useEffect, useState } from "react";
import { API_KEY, PLACEHOLDER_IMG, IMAGE_URL } from "../../js/Utils";
import { Link } from "react-router-dom";

const Recomandation = (props) => {
  const [movies, setMovies] = useState([]);

  const getMovieRecomandations = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse) {
          setMovies(jsonResponse.results);
        }
      });
  };

  useEffect(() => {
    getMovieRecomandations(props.id);
  }, [props.id]);

  return (
    <>
      <div
        className="cast-title"
        // style={{ color: `${props.colors[0]}` }}
      >
        YOU MAY ALSO LIKE
      </div>
      <div className="recomandations">
        {movies.map((movie) => {
          return (
            <div className="recomandation">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    !movie.poster_path
                      ? PLACEHOLDER_IMG
                      : `${IMAGE_URL}${movie.poster_path}`
                  }
                  alt={movie.name}
                />
              </Link>
              <div
                className="rec-movie-detail"
                style={{ color: `${props.colors[0]}` }}
              >
                <h4 className="title">{movie.title}</h4>
                <h5 className="character">
                  {new Date(movie.release_date).getFullYear()}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Recomandation;
