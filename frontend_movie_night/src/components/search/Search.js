import { Container, InputGroup, Input, Media, Col, Row } from "reactstrap";
import {useState} from 'react';



export default function Search() {

  const[searchTerm, setSearchTerm] = useState('');

    return (
      <Container className="container-search mt-4">
        <Row >
          <Col lg="6 offset-lg-8" md="12" sm="12" >
            <InputGroup>
              <Input className="movie-search" placeholder="Search" onChange={e => {setSearchTerm(e.target.value)}} />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="6 offset-lg-8" md="12" sm="12" className="media-item">
            <Media className="media-item mt-2">
              <Media left middle href="#">
              <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
            </Media>
          <Media body>
            <Media heading className="media-heading">
                Title
            </Media>
            <Media sm="12">
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

            </Media>

            
          </Media>
          </Media>
          </Col>
        </Row>
      </Container>
    );
  }