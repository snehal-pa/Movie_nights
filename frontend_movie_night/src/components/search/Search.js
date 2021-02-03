import { Container, InputGroup, Input, Media, Col, Row, Card, CardImg} from "reactstrap";
import {useState, useEffect, useContext} from 'react';
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App";



export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');
  const[ allMovies, setAllMovies] = useState([]);
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState()

  async function fetchAllMovies(){
    let movies = await(
      await fetch("http://localhost:8080/rest/movies")
    ).json();    
    if (movies.error) {
      movies = [];
    }
    setAllMovies(movies);
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);  
  
  function filter(){
    let movieResults = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    setAllMovies(movieResults);
  }
 

  const selectMovie = (movie) => (e) =>{ 
    e.preventDefault();     
    setSelectedMovie(movie);       
    sendMovie(selectedMovie);   
  }

  const  handleSearchInput =  (e) => {
      setSearchTerm(e.target.value)
      if(e.target.value !== ""){
      filter()
      console.log("the search term" + searchTerm)
      }else fetchAllMovies()
  };
  

  function sendMovie(){           
      updateContext({ showCreateInvitation: true }); 
  }

  const resetInputField = () =>{
    setSearchTerm("");
  }



    return (
      <Container className="container-search mt-4">     
      {context.showCreateInvitation ? (
        <CreateInvitation sendMovie={selectedMovie} />
      ) : ( 
        /* Search Box*/
        <div>
          <Row>
            <Col lg="12" md="12" sm="12" >
              <InputGroup>
                <Input className="movie-search" placeholder="Search" value={searchTerm} onChange={handleSearchInput} />
              </InputGroup>
            </Col>
          </Row>   
          {/* Movie List Box */  } 
          <div className="movielist-box">
          {allMovies.map((movie) => 
            (               
              <div key={movie.id} onClick={selectMovie(movie)}> {/* One Movie Box */}          
              <Row className="media-item"> 
              <Col>
                <Card lg="3" md="3" sm="12">
                  <Media left middle href="#">
                  <CardImg  className="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.postPath}`}    alt="Generic placeholder image" />
                </Media>
                </Card>
              </Col>
              {/* <Col lg="9" md="9" sm="12">
                <Row>
                  <Media body>
                  <Media heading className="media-heading">{movie.title}</Media>          
                  </Media>
                </Row>
                <Row>
                </Row>          
              </Col>                               */}
            </Row> 
            <Row>
              <Col lg="12">
                <hr></hr>
              </Col>
            </Row> 
            </div>  /* One Movie Box End*/       
            ))}
          </div> /* Movie List Box End */
       </div> /* Search Box End */
       )}           
      </Container>
    );
  }