import React from "react";
import { Container, Row, Col } from "reactstrap";
import MyCalendar from "./calendar/MyCalendar";
import Sidebox from "./Sidebox";

export default function Home() {
    
  
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="8" md="12" sm="12">
            <MyCalendar/>
            
          </Col>
          <Col lg="4" md="12" sm="12">
            <Sidebox />
          </Col>
        </Row>              
      </Container>
    );
  }
  