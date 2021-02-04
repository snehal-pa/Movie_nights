import {Input, Media, Col, Row, Button, Label, FormGroup } from "reactstrap";
import { Context } from "../App";
import React, {useContext, useState} from 'react';
import moment from "moment";
import Select from "react-select";



export default function CreateInvitation(props) {

  let [context, updateContext] = useContext(Context);
  const [formData, setFormData] = useState({});
  const [availableFriends, setAvailableFriends] = useState([]);
  const [invitesList, setinvitesList] = useState([]);

 
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
    const getStart = new Date(startDate + " " + startTime);
    const start = moment(getStart).format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(start).add(2, 'hours').format("YYYY-MM-DDTHH:mm:ss");
    getAvailableFriends(start, endDate);   
    
  };

  

    return (      
          <div className="invitation">
              <Row className="media-item">
                <Col lg="3" md="4" sm="6">
                  <Media>
                    <Media left middle href="#">
                    <img  className="movie-poster" src={`https://image.tmdb.org/t/p/original/${props.sendMovie.postPath}`}  alt="Generic placeholder image" />
                  </Media>
                  </Media>
                </Col>
                <Col lg="9" md="8" sm="6">
                  <Row>
                    <Media body>
                      <Media heading className="media-heading">{props.sendMovie.title}</Media>          
                    </Media>
                  </Row>
                  <Row>
                    <Media>
                      {props.sendMovie.description}
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
                      name="startDate"
                      id="startDate"
                      format="yyyy/MM/dd"
                      value={startDate}
                      onChange={handleInputChange}
                      placeholder="date placeholder"
                    />
                  </FormGroup>      
                </Col>
                <Col lg="6" sm="12">
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
              </Row>  
              <Row>
                <Col lg="12">
                <Button className="w-100 magenta" onClick={searchFriends}>Search for available friends</Button>
                </Col>
              </Row>            
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <Label for="selectFriends">Invite your Friends</Label>                  
                    <Select  options={friends} onChange={handleInvites} isMulti/>             
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6" sm="12">
                <Button color="secondary" className="w-100" onClick={discard}>Discard</Button>
                </Col>
                <Col lg="6" sm="12">
                <Button className="w-100 magenta" onClick={postEvent}>Send</Button>
                </Col >
              </Row>          
          </div>         
    );
  } 