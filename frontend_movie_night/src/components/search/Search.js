import { Container, InputGroup, Input, Media, Col, Row} from "reactstrap";
import {useState, useEffect} from 'react';



export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');

  const[ allMovies, setAllMovies] = useState([])

  async function fetchAllMovies(){
    let movies = await(
      await fetch("http://localhost:8080/rest/movies")
    ).json();
    console.log(movies)
    if (movies.error) {
      movies = [];
    }
    setAllMovies(movies);
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);

    return (
      <Container className="container-search mt-4">        
        <Row>
          <Col lg="12" md="12" sm="12" >
            <InputGroup>
              <Input className="movie-search" placeholder="Search" onChange={e => {setSearchTerm(e.target.value)}} />
            </InputGroup>
          </Col>
        </Row>       
        
        {allMovies.map((movie) => 
          (
          <div className="movielist-box">
            <Row className="media-item" key={movie.id}>
            <Col lg="3" md="3" sm="12">
              <Media>
                <Media left middle href="#">
                <img  className="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.postPath}`} alt="Generic placeholder image" />
              </Media>
              </Media>
            </Col>
            <Col lg="9" md="9" sm="12">
              <Row>
                <Media body>
                  <Media heading className="media-heading">{movie.title}</Media>          
                </Media>
              </Row>
              <Row>
                <Media>
                {movie.description}
                </Media>
              </Row>          
            </Col>                              
          </Row>  
          <Row>
            <Col lg="12">
              <hr></hr>
            </Col>
          </Row>           
        </div>           
          )
          )}
         
            
      </Container>
    );
  }