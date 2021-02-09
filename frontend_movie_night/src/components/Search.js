import {
  Container,
  InputGroup,
  Input,
  Col,
  Row,
  Card,
  CardImg,
} from "reactstrap";
import { useState, useEffect, useContext } from "react";
import CreateInvitation from "./CreateInvitation";
import { Context } from "../App";
import ReactPaginate from "react-paginate";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState();
  const [searchResults, setSearchResults] = useState([]);

  //for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  //const [currentPageMovies, setCurrentPageMovies] = useState([]);

  useEffect(() => {
    fetchAllMovies();
    postMovies();
  }, [offset]);

  async function postMovies() {
    await (
      await fetch("/rest/movies/1/100", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
    ).json();
  }

  async function fetchAllMovies() {
    const header = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    let movies = await (await fetch("/rest/movies", header)).json();
    if (movies.error) {
      console.log("error", movies.error);
      movies = [];
    }

    setPageCount(Math.ceil(movies.length / perPage));
    setAllMovies(movies);

    console.log("set all movies ", allMovies);
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  function filter() {
    let movieResults = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(movieResults);
    setPageCount(Math.ceil(movieResults.length / perPage));
    //setAllMovies(movieResults);
    console.log("all found movies from search ", searchResults);
  }

  const selectMovie = (movie) => (e) => {
    e.preventDefault();
    setSelectedMovie(movie);
    sendMovie(selectedMovie);
  };

  const handleSearchInput = (e) => {
    setSearchResults([]);
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      filter();
      console.log("search term ", searchTerm);
    } else fetchAllMovies();
  };

  function sendMovie() {
    updateContext({ showCreateInvitation: true });
  }

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
                  id="movie-search"
                  className="movie-search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchInput}
                />
              </InputGroup>
            </Col>
          </Row>
          <Container className="movielist-box">
            <Row className="ml-3">
              {searchResults.length > 0
                ? searchResults.slice(offset, offset + perPage).map((movie) => (
                    <Row sm="2" md="3">
                      <Col>
                        <Card
                          className="media-item"
                          key={movie.id}
                          onClick={selectMovie(movie)}
                        >
                          <CardImg
                            className="movie-poster"
                            src={`${movie.postPath}`}
                            alt={movie.title}
                            onError={(e) => (
                              (e.target.onError = null),
                              (e.target.src =
                                "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_264/https://psykologisk-metod.se/wp-content/themes/unbound/images/No-Image-Found-400x264.png")
                            )}
                          />
                        </Card>
                      </Col>
                    </Row>
                  ))
                : allMovies.slice(offset, offset + perPage).map((movie) => (
                    <Row sm="2" md="3" lg="3">
                      <Col>
                        <Card
                          className="media-item"
                          key={movie.id}
                          onClick={selectMovie(movie)}
                        >
                          <CardImg
                            className="movie-poster"
                            src={`${movie.postPath}`}
                            alt={movie.title}
                            onError={(e) => (
                              (e.target.onError = null),
                              (e.target.src =
                                "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_264/https://psykologisk-metod.se/wp-content/themes/unbound/images/No-Image-Found-400x264.png")
                            )}
                          />
                        </Card>
                      </Col>
                    </Row>
                  ))}

              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
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
