import { Container, InputGroup, Input, Media, Col, Row} from "reactstrap";
import {useState, useEffect, useContext} from 'react';
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App";


export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');
  const[ allMovies, setAllMovies] = useState([])
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState()

  async function postMoviesToDB(){
    let moviesToBePostedToDB = await (
      await fetch("http://localhost:8080/rest/movies/10/20"), {
        method: 'POST',
        mode: 'no-cors'
        //headers: {  "Content-Type": "application/octet-stream; charset=utf-8",
        //"X-Requested-With": "XMLHttpRequest" },
      }
    ).json();
  }

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
    postMoviesToDB();    
  }, []);

  const selectMovie = (movie) => (e) =>{ 
    e.preventDefault();     
    setSelectedMovie(movie);       
    sendMovie(selectedMovie);   
  }

  const handleSearchInput = (e) =>{
    const searchQuery = e.target.value
    setSearchTerm(searchQuery)
  }


  function sendMovie(){           
      updateContext({ showCreateInvitation: true }); 
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
            </div>  /* One Movie Box End*/       
            ))}
          </div> /* Movie List Box End */
       </div> /* Search Box End */
       )}           
      </Container>
    );
  }