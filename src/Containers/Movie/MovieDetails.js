import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, PLACEHOLDER_IMG } from "../../js/Utils";
import { ColorExtractor } from "react-color-extractor";
import imdb from "../../images/imdb.png";
import MovieCast from "./MovieCast";
import Recomandation from "./Recomandation";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [colors, setColors] = useState([]);
  const [video, setVideo] = useState(null);

  let { id } = useParams();

  const getMovieDetails = movieId => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse) {
          setMovie(jsonResponse);
        }
      });
  };

  useEffect(() => {
    getMovieDetails(id);
  }, [id]);

  const getMovieVideo = movieId => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse) {
          console.log(jsonResponse);

          setVideo(jsonResponse.results[0].key);
        }
      });
  };

  const poster = !movie.poster_path
    ? PLACEHOLDER_IMG
    : `${IMAGE_URL}${movie.poster_path}`;
  let genres = [];
  movie &&
    movie.genres &&
    movie.genres.map(genre => {
      return genres.push(genre.name);
    });

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <div>
      <div
        className="backdrop"
        style={{ backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})` }}
      >
        <div className="overlay" style={{ backgroundColor: `${colors[3]}e6` }}>
          <div className="image">
            <a target={movie.homepage ? "_blank" : ""} href={movie.homepage}>
              <ColorExtractor getColors={setColors}>
                <img src={poster} alt={movie.original_title} />
              </ColorExtractor>
            </a>
          </div>
          <div className="detail">
            <h1>
              {movie.title}({new Date(movie.release_date).getFullYear()})
              <i className="time" style={{ fontSize:"calc(2px + 2vmin)"}}>
                ~ {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </i>
            </h1>
            <h3 className="tagline">{movie.tagline}</h3>
            <ul className="other-resources">
              <li>
                <a
                  target="_blank"
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                >
                  <img width="60" src={imdb} alt="imdb" />
                </a>
              </li>
              <li>
                <span onClick={() => getMovieVideo(id)}>>> Play trailer</span>
                {video && (
                  <div class="videoContainer">
                    <iframe
                      title="ytVideo"
                      frameborder="0"
                      src={`https://www.youtube.com/embed/${video}?autoplay=1`}
                    ></iframe>
                    <span className="close" onClick={() => setVideo(null)}>
                      X
                    </span>
                  </div>
                )}
              </li>
            </ul>
            <h2 className="type">
              <span>{genres.join(", ")} </span>
            </h2>
            <h4 className="overview">{movie.overview}</h4>
            <ul className="other-details">
              {movie.original_language && (
                <li>
                  Original language <br />
                  {movie.original_language.toUpperCase()}
                </li>
              )}
              {movie.revenue > 0 && (
                <li>
                  Revenue <br /> {formatter.format(movie.revenue)}
                </li>
              )}
              {movie.budget > 0 && (
                <li>
                  Budget <br /> {formatter.format(movie.budget)}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <MovieCast id={id} colors={colors} />
      <Recomandation id={id} colors={colors} />
    </div>
  );
};

export default MovieDetails;
