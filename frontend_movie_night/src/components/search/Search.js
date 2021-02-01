import { Container, InputGroup, Input, Media, Col, Row } from "reactstrap";
import {useState} from 'react';



export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');

    return (
      <Container className="container-search mt-4">        
        <Row>
          <Col lg="12" md="12" sm="12" >
            <InputGroup>
              <Input className="movie-search" placeholder="Search" onChange={e => {setSearchTerm(e.target.value)}} />
            </InputGroup>
          </Col>
        </Row>
        <div className="movielist-box">
          <Row className="media-item">
            <Col lg="3" md="3" sm="12">
              <Media>
                <Media left middle href="#">
                <img  className="movie-poster" src="https://images-na.ssl-images-amazon.com/images/I/51JaPkQ-R-L._AC_.jpg" alt="Generic placeholder image" />
              </Media>
              </Media>
            </Col>
            <Col lg="9" md="9" sm="12">
              <Row>
                <Media body>
                  <Media heading className="media-heading">Title</Media>          
                </Media>
              </Row>
              <Row>
                <Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                </Media>
              </Row>          
            </Col>                   
          </Row>  
          <Row>
            <Col lg="12">
              <hr></hr>
            </Col>
          </Row> 

          <Row className="media-item">
            <Col lg="3" md="3" sm="12">
              <Media>
                <Media left middle href="#">
                <img  className="movie-poster" src="https://i.pinimg.com/564x/46/da/e5/46dae512e375bee2664a025507da8795.jpg" alt="Generic placeholder image" />
              </Media>
              </Media>
            </Col>
            <Col lg="9" md="9" sm="12">
              <Row>
                <Media body>
                  <Media heading className="media-heading">Title</Media>          
                </Media>
              </Row>
              <Row>
                <Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
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
      </Container>
    );
  }