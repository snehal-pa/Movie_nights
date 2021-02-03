// import { Container, InputGroup, Input, Media, Col, Row} from "reactstrap";
// import {useState, useEffect, useContext} from 'react';
import CreateInvitation from "../CreateInvitation";
import { Context } from "../../App.js"
import { Col, Row, Media } from "reactstrap";
import { useState, useContext } from "react";

const Movie = ({ movie }) => {
  const [selectedMovie, setSelectedMovie] = useState();
  let [context, updateContext] = useContext(Context);

  const selectMovie = (movie) => (e) => {
    e.preventDefault();
    setSelectedMovie(movie);
    console.log("clicked movie now selected ", selectedMovie)
    if (selectedMovie !== undefined) {
      sendMovie(selectedMovie)
    }
  };

  function sendMovie() {
    updateContext({ showCreateInvitation: true });
  }

  return (
    <div className="movie">
      {/* <h2>{movie.title}</h2> */}
      { context.showCreateInvitation ? (
        <CreateInvitation sendMovie={selectedMovie} />
      ) : (
        <Row className="media-item">
          <Col lg="3" md="3" sm="12">
            <Media>
              <Media left middle href="#">
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/original/${movie.postPath}`}
                  alt="Generic placeholder image"
                  onClick={selectMovie(movie)}
                />
              </Media>
            </Media>
          </Col>
          </Row>
      )
      }
      <hr className="movie-distance" />
    </div>
  );
};

export default Movie;

// export default function Movie () {

//     const[ allMovies, setAllMovies] = useState([])
//     let [context, updateContext] = useContext(Context);
//     const [selectedMovie, setSelectedMovie] = useState();

//     useEffect(() => {
//         fetchAllMovies();
//       }, []);

//  async function fetchAllMovies(){
//     let movies = await(
//       await fetch("http://localhost:8080/rest/movies")
//     ).json();
//     if (movies.error) {
//       movies = [];
//     }
//     setAllMovies(movies);
//   }

//     return(
//         <div>
//             {/* Movie List Box */  }
//           <div className="movielist-box">
//           {allMovies.map((movie) =>
//             (
//               <div key={movie.id} onClick={selectMovie(movie)}> {/* One Movie Box */}
//               <Row className="media-item">
//               <Col lg="3" md="3" sm="12">
//                 <Media>
//                   <Media left middle href="#">
//                   <img  className="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.postPath}`} alt="Generic placeholder image" />
//                 </Media>
//                 </Media>
//               </Col>
//               <Col lg="9" md="9" sm="12">
//                 <Row>
//                   <Media body>
//                     <Media heading className="media-heading">{movie.title}</Media>
//                   </Media>
//                 </Row>
//                 <Row>
//                   <Media>
//                   {movie.description}
//                   </Media>
//                 </Row>
//               </Col>
//             </Row>
//             <Row>
//               <Col lg="12">
//                 <hr></hr>
//               </Col>
//             </Row>
//             </div>  /* One Movie Box End*/
//             ))}
//           </div> /* Movie List Box End */

//         </div>

//     )
// }
