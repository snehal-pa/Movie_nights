import { Container, InputGroup, Input, Media, Col, Row } from "reactstrap";
import {useState} from 'react';



export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');

    return (
      <Container className="container-search mt-4">        
          <Row >
          <Col lg="12" md="12" sm="12" >
            <InputGroup>
              <Input className="movie-search" placeholder="Search" onChange={e => {setSearchTerm(e.target.value)}} />
            </InputGroup>
          </Col>
        </Row>
        <Row className="media-item">
          <Col lg="6" md="12" sm="12">
            <Media>
              <Media left middle href="#">
              <img  className="movie-poster" src="https://images-na.ssl-images-amazon.com/images/I/51JaPkQ-R-L._AC_.jpg" alt="Generic placeholder image" />
            </Media>
            </Media>
          </Col>
            <Col lg="6" md="12" sm="12" className="media-item">
          <Media body>
            <Media heading className="media-heading">
                Title
            </Media>
          
          </Media>
          </Col>
          <Row>
            <Col lg="12">
            <Media className="p-1 pl-2 pb-2">
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
            </Col>      
            
          </Row>        
        </Row>
        
      </Container>
    );
  }