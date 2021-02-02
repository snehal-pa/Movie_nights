import React from "react";
import { Container, Row, Col } from "reactstrap";
import Search from './search/Search';
import MyCalendar from "./calendar/MyCalendar";

export default function Home() {
    
  
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="8" md="12" sm="12">
            <MyCalendar/>
            
          </Col>
          <Col lg="4" md="12" sm="12">
            <Search/>
          </Col>
        </Row>              
      </Container>
    );
  }
  