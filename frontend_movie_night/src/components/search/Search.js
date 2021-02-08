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
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App";
import ReactPaginate from "react-paginate";




export default function Search() {

  const [searchTerm, setSearchTerm] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState();

  //for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(0);

 useEffect(() => {
    postMovies();   
    fetchAllMovies(); 
  }, [offset]);
   

  async function fetchAllMovies() {
    let movies = await (
      await fetch("/rest/movies")
    ).json();
    if (movies.error) {
      movies = [];
    }

    //const allMovies = res.data;
    const slice = movies.slice(offset, offset + perPage);
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
          src={`${movie.postPath}` } 
          alt={movie.title}
          onError={(e) => (e.target.onError = null, e.target.src = 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_264/https://psykologisk-metod.se/wp-content/themes/unbound/images/No-Image-Found-400x264.png')} 
        />
        </Card>
        </Col>
        </Row>
    ));
    setAllMovies(movies);
    console.log('all movies length: ', allMovies.length, 'per page: ', perPage);
    setPageCount(Math.ceil(allMovies.length / perPage));
    console.log('page count ', pageCount);
  };
  }

 const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  async function postMovies(){
    let result = await (
      await fetch("/rest/movies/1/100", {
        method: "POST",               
      })
    ).json();    
  }

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
                <h4 className="sidebox-title">Find a movie and invite friends for a movie night!</h4>
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
            <Row className="mx-auto">
             {movieData}
            </Row>
          </Container>{" "}
        </Container> 
      )}
    </Container>
  );

}

