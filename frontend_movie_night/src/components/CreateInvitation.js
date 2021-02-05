import {Container, Input, Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, Col, Row, Button, Label, FormGroup } from "reactstrap";
import { Context } from "../App";
import React, {useContext, useState} from 'react';
import moment from "moment";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



export default function CreateInvitation(props) {

  let [context, updateContext] = useContext(Context);
  const [formData, setFormData] = useState({});
  const [availableFriends, setAvailableFriends] = useState([]);
  const [invitesList, setinvitesList] = useState([]);
  const [show, setShow] = useState(false);

 
  function discard(e){
    e.preventDefault(); 
    updateContext({ showCreateInvitation: false});
  }

  const handleInputChange = (e) =>
  setFormData({
    ...formData,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  let {   
    startDate,   
    startTime, 
  } = formData;

  const friends = availableFriends.map((friend) => ({
    value: friend.email,
    label: friend.name,
  }));

  const handleInvites = (e) => {
    setinvitesList(e);
  };

  async function postEvent(){
    console.log("invitelist: " , invitesList)
   /* let result = await (
      await fetch("http://localhost:8080/api/create_event", {
        method: "POST",               
      })
    ).json();   */ 
  }

  async function getAvailableFriends(start, endDate){
    console.log("start: " , start)
    console.log("enddate: " , endDate)
    let result = await (
      await fetch("http://localhost:8080/api/availablefriends?startdate=" + start + "&enddate=" + endDate)).json();    
    console.log(result)   
    setAvailableFriends(result)    
  }

  const searchFriends = (e) => {
    e.preventDefault();
    if(startDate !== undefined && startTime !== undefined){
      const getStart = new Date(startDate + " " + startTime);
    const start = moment(getStart).format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(start).add(props.sendMovie.length, 'minutes').format("YYYY-MM-DDTHH:mm:ss");
    getAvailableFriends(start, endDate);   
    setShow(true);
    }       
  };

  

    return (      
          <div className="invitation">
              <Row className="media-item">
                <Card>
                  <CardImg src={`https://image.tmdb.org/t/p/original/${props.sendMovie.backdropPath}`}></CardImg>
                  <CardBody className="text-center"> 
                  <Row><img className="avatar" src={`https://image.tmdb.org/t/p/original/${props.sendMovie.postPath}`}></img>  </Row>     
                  <Row className="off-row">
                    <Col lg="2"></Col>
                    <Col lg="6"><CardTitle className="movie-title text-left">{props.sendMovie.title}</CardTitle></Col>
                    <Col lg="4">
                      <Row className="justify-content-end pb-1"><CardSubtitle className="movie-genre text-muted">{props.sendMovie.genre[0]}</CardSubtitle></Row>
                      <Row className="justify-content-end"><CardSubtitle className="movie-releasedate text-muted">{props.sendMovie.releaseDate}</CardSubtitle></Row>
                    </Col>       
                    </Row>                
                    <Row>
                    <CardText className="p-1">{props.sendMovie.description}</CardText> 
                    </Row>               
                                    
                    </CardBody>
                  </Card>
                </Row>
              <Row className="mt-2">
                <Col lg="5" sm="12">
                  <FormGroup>
                    <Label for="startDate">Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      id="startDate"
                      format="yyyy/MM/dd"
                      value={startDate}
                      onChange={handleInputChange}
                      placeholder="date placeholder"
                    />
                  </FormGroup>      
                </Col>
                <Col lg="5" sm="12">
                  <FormGroup>
                    <Label for="startTime">Time</Label>
                    <Input
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={startTime}
                      onChange={handleInputChange}
                      placeholder="time placeholder"
                    />
                  </FormGroup>
                </Col> 
                <Col lg="2" sm="12">  
                <br></br>              
                <Button className="w-100 magenta mt-2" onClick={searchFriends}><FontAwesomeIcon icon={faSearch} /></Button>
                </Col>
              </Row>                           
              <Row>
                { show ? ( <Col lg="12">
                  <FormGroup>
                    <Label for="selectFriends">Invite your Friends</Label>                  
                    <Select  options={friends} onChange={handleInvites} isMulti/>             
                  </FormGroup>
                </Col> ) : null}
               
              </Row>
                 
              <Row>       
                <Container className="vbottom"> 
                  <Row >
                    <Col lg="12">
                      <hr></hr>
                  </Col>
              </Row> 
                <Row>
                <Col lg="6" sm="12">
                <Button color="secondary" className="w-100" onClick={discard}>Discard</Button>
                </Col>
                <Col lg="6" sm="12">
                <Button className="w-100 magenta" onClick={postEvent}>Send</Button>
                </Col>
                </Row>   
                </Container>
              </Row>     
          </div>         
    );
  } 