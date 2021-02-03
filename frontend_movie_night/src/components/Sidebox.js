import { useEffect, useState } from "react";
import Search from "./search/Search";
import Movie from "./search/Movie";

export default function Sidebox() {

  const[ allMovies, setAllMovies] = useState([])

  useEffect(() => {
    fetchAllMovies();
  }, []);

  async function fetchAllMovies() {
    let movies = await (
      await fetch("http://localhost:8080/rest/movies")
    ).json();
    if (movies.error) {
      movies = [];
    }
    setAllMovies(movies)
  }


  return (
    <div>
      <Search />
      <div className="movielist-box">
      {allMovies.map((movie) =>
        <Movie movie={movie}/>
        )}
        </div>
    </div>
  );
}
