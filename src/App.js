import React, { useState, useEffect } from "react";
import "./App.css";
import { API_KEY } from "./js/Utils";
import Header from "./Containers/MainNav/Header";
import Movies from "./Containers/Movie/Movies";
import MovieDetails from "./Containers/Movie/MovieDetails";
import { Route, Switch, useHistory } from "react-router-dom";

const SEARCH_MOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [genre, setGenre] = useState("upcoming");
  const [totalPages, setTotalPages] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getMovies("popular", 1);
    // history.push("movies/popular");
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    console.log(searchValue);
    fetch(`${SEARCH_MOVIES}&query=${searchValue}&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.results) {
          setMovies(jsonResponse.results);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.errors);
          setLoading(false);
        }
      });
  };

  const getMovies = (genre, pagenumber) => {
    setLoading(true);
    setErrorMessage(null);
    setGenre(genre);
    fetch(
      `https://api.themoviedb.org/3/movie/${genre}?api_key=${API_KEY}&language=en-US&page=${pagenumber}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.results) {
          setMovies(jsonResponse.results);
          setLoading(false);
          setTotalPages(jsonResponse.total_results);
        } else {
          setErrorMessage(jsonResponse.errors);
          setLoading(false);
        }
      });
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    getMovies(genre, pageNumber);
  };
  return (
    <div className="App">
      <Header movies={getMovies} />
      <Switch>
        <Route exact path="/">
          <Movies
            search={search}
            loading={loading}
            errorMessage={errorMessage}
            movies={movies}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Route>
        <Route path="/movies/:type">
          <Movies
            search={search}
            loading={loading}
            errorMessage={errorMessage}
            movies={movies}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Route>
        <Route path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
