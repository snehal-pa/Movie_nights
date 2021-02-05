import { useState, useEffect, useContext } from "react";
import { Row, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";

export default function AddFriends() {

    const [users, setUsers] = useState([]);
    const [addFriends, setAddFriends] = useState([]);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const allUsers = users.map((user) => ({
        value: user.email,
        label: user.name,
      }));


      const addFriendsSelect = (e) => {
        setAddFriends(e);
      };

      async function sendFriends(e){
          e.preventDefault();
        
       let result = await (
          await fetch("rest/addfriends", {
            method: "PUT",               
          })
        ).json();   
        console.log(result);
      }
    

      async function getAllUsers(){       
        let result = await (
        await fetch("/rest/users")).json();    
        console.log(result)   
        setUsers(result)    
      }

      useEffect(() => {
        getAllUsers(); 
      }, []);
    
    return (
        <div>
          <a onClick={toggle}>Add Friends</a>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add friends</ModalHeader>
            <ModalBody>
                <FormGroup>
                        <Label for="selectFriends">Invite your Friends</Label>                  
                        <Select  options={allUsers} onChange={addFriendsSelect} isMulti/>             
                    </FormGroup>
               
            
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={sendFriends}>Add</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}