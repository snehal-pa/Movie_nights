import {
  Container,
  InputGroup,
  Input,
  Media,
  Col,
  Row,
  Card,
  CardImg,
} from "reactstrap";
import { useState, useEffect, useContext } from "react";
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState();

  //for pagination
  const [offset, setOffset] = useState(0);
  //const [data, setData] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(0);

  const getMovies = async () => {
    const res = await axios.get(`http://localhost:8080/rest/movies`);
    const allMovies = res.data;
    const slice = allMovies.slice(offset, offset + perPage);
    const movieData = slice.map((movie) => (
      <Row sm="2" md="3" lg="3">
        <Col>
      <Card
        className="media-item"
        key={movie.id}
        onClick={selectMovie(movie)
        }>
        <CardImg
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/original/${movie.postPath}`}
          alt="Generic placeholder image"
        />
        </Card>
        </Col>
        </Row>
    ));
    setAllMovies(movieData);
    setPageCount(Math.ceil(allMovies.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  // async function fetchAllMovies() {
  //   let movies = await (
  //     await fetch("http://localhost:8080/rest/movies")
  //   ).json();
  //   if (movies.error) {
  //     movies = [];
  //   }
  //   setAllMovies(movies);
  // }

  useEffect(() => {
    getMovies();
  }, [offset]);

  function filter() {
    let movieResults = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    setAllMovies(movieResults);
  }

  const selectMovie = (movie) => (e) => {
    e.preventDefault();
    setSelectedMovie(movie);
    sendMovie(selectedMovie);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      filter();
      console.log("the search term" + searchTerm);
    } else getMovies();
  };

  function sendMovie() {
    updateContext({ showCreateInvitation: true });
  }

  const resetInputField = () => {
    setSearchTerm("");
  };

  return (
    <Container className="container-search mt-4">
      {context.showCreateInvitation ? (
        <CreateInvitation sendMovie={selectedMovie} />
      ) : (
        /* Search Box*/
        <Container className="searchBox">
          <Row>
            <Col lg="12" md="12" sm="12">
              <h4 className="sidebox-title">
                Find a movie and invite friends for a movie night!
              </h4>
              <InputGroup>
                <Input
                  className="movie-search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchInput}
                />
              </InputGroup>
            </Col>
          </Row>
          {/* Movie List Box */}
          <Container className="movielist-box">
            <Row className="mx-auto">
              
                  {allMovies}
                  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
            
            </Row>
          </Container>{" "}
        </Container> 
      )}
    </Container>
  );
}
