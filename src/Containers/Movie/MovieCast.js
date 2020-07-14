import React, { useEffect, useState } from "react";
import { API_KEY, IMAGE_URL, PLACEHOLDER_IMG } from "../../js/Utils";

const MovieCast = props => {
  const [casts, setCast] = useState([]);

  const getMovieCrew = movieId => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse) {
          setCast(jsonResponse.cast);
        }
      });
  };

  useEffect(() => {
    getMovieCrew(props.id);
  }, [props.id]);

  return (
    <>
      <div className="cast">
        {casts.map(cast => {
          return (
            <div
              className="cast-person"
              style={{ backgroundColor: `${props.colors[0]}` }}
            >
              <img
                src={
                  !cast.profile_path
                    ? PLACEHOLDER_IMG
                    : `${IMAGE_URL}${cast.profile_path}`
                }
                alt={cast.name}
              />
              <h4 className="name">{cast.name}</h4>
              <h5 className="character">{cast.character}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieCast;
