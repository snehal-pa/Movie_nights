import { useState, useEffect, useContext } from "react";
import { Row, Col, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Context } from "../App";
import Select from "react-select";

export default function AddFriends() {

    const [users, setUsers] = useState([]);
    const [friendList, setFriendList] = useState([]);    
    const [friendsA, setFriendsA] = useState([]);
    const [friendsB, setFriendsB] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState([]);
    const [modal, showModal] = useState(false);
    const [context] = useContext(Context);
    const toggle = () => showModal(!modal);

   
        const filterFriends= users.filter(function(filter_users) {
          return friendList.filter(function(filter_friendList){
            return filter_friendList.id === filter_users.id
          }).length === 0
        });
       
        const filteredUser = filterFriends.filter((u) => u.id !== context.loggedInUser.id);
    

      const allUsers = filteredUser.map((user) => ({
        value: user,
        label: user.email,
      }));

      const addFriendsSelect = (e) => {
        setSelectedFriend(e);
      };
      async function sendFriends(e){
          e.preventDefault();
          console.log("selectedFriend: " , selectedFriend)

      
        for(var i = 0; i < selectedFriend.length; i++) {
            friendList.push(selectedFriend[i].value)
        }
        
          await fetch("/rest/addfriends", {
            method: "POST",           
            body: JSON.stringify(friendList),
            headers: { 'Content-Type': 'application/json'}     
          })
          .then(result => result.text())
          .then(data => console.log(data))
        
         
          toggle(!modal);
       
      }
    

      async function getAllUsers(){       
        let result = await (
        await fetch("/rest/users")).json();    
        console.log(result)   
        setUsers(result)    
      }

      async function getAllFriends(){       
        let result = await (
        await fetch("/rest/friends")).json();  
        setFriendList(result);                  
        const calcHalf = Math.ceil(result.length / 2)        
        const colA = [...result].splice(0, calcHalf);        
        setFriendsA(colA);
        const colB = [...result].splice(calcHalf);
        setFriendsB(colB);
      }

      useEffect(() => {
        getAllUsers(); 
        getAllFriends();        
      }, []);
    
    return (
        <div>
          <div onClick={toggle}>Friends</div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Friends</ModalHeader>
            <ModalBody>
              <Row>
                <Col lg="12">
                  <h6>FriendList:</h6>
                </Col>                
              </Row>
              <Row className="mt-2">
                <Col lg="6">
                  {friendsA.map((friend) => (
                    <Row key={friend.id}>
                      <Col lg="1">
                        <img className="user-img" src={friend.profileUrl}></img>
                      </Col>
                      <Col>
                        <p>{friend.name}</p>
                      </Col>
                    </Row>
                  ))}
                </Col>
                
                
                  {friendsB !== null ? 
                   (
                    <Col lg="6">
                     {friendsB.map((friend) => (
                      <Row key={friend.id}>
                        <Col lg="1">
                          <img className="user-img" src={friend.profileUrl}></img>
                        </Col>
                        <Col>
                          <p>{friend.name}</p>
                        </Col>
                      </Row>
                    ))}</Col>
                    ) : null }                
              </Row>
              <Row >
                <Col lg="12">
                  <hr></hr>
                </Col>
              </Row>
              <FormGroup>
                      <Label for="selectFriends">Add Friends</Label>                  
                      <Select  options={allUsers} onChange={addFriendsSelect} isMulti/>             
              </FormGroup>  
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={sendFriends}>Add</Button>
              <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}