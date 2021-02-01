import { Container, InputGroup, Input, Media, Col, Row, Button, Form, Label, FormGroup } from "reactstrap";
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
       {/*  <div className="movielist-box">
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
    </div>*/}
          <div className="invitation">
            <Form>
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
              <Row>
                <Col lg="6" sm="12">
                  <FormGroup>
                    <Label for="startDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="startDate"
                      placeholder="date placeholder"
                    />
                  </FormGroup>      
                </Col>
                <Col lg="6" sm="12">
                  <FormGroup>
                    <Label for="startTime">Time</Label>
                    <Input
                      type="time"
                      name="time"
                      id="startTime"
                      placeholder="time placeholder"
                    />
                  </FormGroup>
                </Col>
              </Row>              
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <Label for="selectFriends">Invite your Friends</Label>                  
                      <Input type="select" name="selectFriend" id="selectFriends" multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>                  
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6" sm="12">
                <Button color="secondary" className="w-100">Discard</Button>
                </Col>
                <Col lg="6" sm="12">
                <Button className="w-100 magenta">Send</Button>
                </Col >
              </Row>
          </Form>
          </div>
          

      </Container>
    );
  }