import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL, PLACEHOLDER_IMG } from "../../js/Utils";

const Movie = props => {
  const { movie } = props;
  const poster = !movie.poster_path
    ? PLACEHOLDER_IMG
    : `${IMAGE_URL}${movie.poster_path}`;
  return (
    <div className="movie">
      <div>
        <Link to={`/movie/${movie.id}`}>
          <img alt={`The movie title: ${movie.title}`} src={poster} />
        </Link>
      </div>
      <span className="vote">{movie.vote_average}</span>
      <div className="description">
        <h2>
          {movie.title}({new Date(movie.release_date).getFullYear()})
        </h2>
        <p className="tooltip">
          {`${movie.overview.slice(0, 70)}...`}
          <span className="tooltiptext">{movie.overview}</span>
        </p>
      </div>
    </div>
  );
};

export default Movie;
