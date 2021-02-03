import { Container, InputGroup, Input, Media, Col, Row} from "reactstrap";
import {useState, useEffect, useContext} from 'react';
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App";
import Movie from "./Movie";


export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');
  const[ allMovies, setAllMovies] = useState([])
  let [context, updateContext] = useContext(Context);
  const [selectedMovie, setSelectedMovie] = useState();
  const [result, setResult] = useState([]);
  

  
  async function postMoviesToDB(){
    let moviesToBePostedToDB = await (
      await fetch("http://localhost:8080/rest/movies/1/30"), {
        method: 'PUT',
      }
    ).json();
  }
  

  useEffect(() => {
    //fetchAllMovies();
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
    callSearchFunction()
    resetInputField()
  }

  const resetInputField = () =>{
    setSearchTerm("");
  }

  const callSearchFunction = (e) =>{
    e.preventDefault();
    setSearchTerm(searchTerm)
  }

  function filterFromSearch(movie){
    let result = movie.filter(movie =>{
      
    })

  }

  const onSearch = async (searchTerm) => {
    let result = await fetch("http://localhost:8080/rest/movies/search?title="+searchTerm)
    if(result.error){
      result = []
    }
    setResult(result)
    console.log(result)
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
          <Movie/> 
          
       </div> /* Search Box End */
       )}           
      </Container>
    );
  }