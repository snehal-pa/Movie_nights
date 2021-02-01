import React from "react";
import { Container, Row, Col } from "reactstrap";
import Search from './search/Search';
import Calendar from './calendar/Calendar'

export default function Home() {
    
  
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="8" md="12" sm="12">
            <Calendar/>
            
          </Col>
          <Col lg="4" md="12" sm="12">
            <Search/>
          </Col>
        </Row>              
      </Container>
    );
  }
  