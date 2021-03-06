import {
  Container,
  Form,
  Input,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Row,
  Button,
  Label,
  FormGroup,
} from "reactstrap";
import { Context } from "../App";
import React, { useContext, useState } from "react";
import moment from "moment";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function CreateInvitation(props) {
  let [context, updateContext] = useContext(Context);
  const [formData, setFormData] = useState({});
  const [availableFriends, setAvailableFriends] = useState([]);
  const [invitesList, setinvitesList] = useState([]);
  const [show, setShow] = useState(false);
  const [combStartDate, setstartDate] = useState();
  const [combEndDateTime, setendDateTime] = useState();

  function discard(e) {
    e.preventDefault();
    updateContext({ showCreateInvitation: false });
  }

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  let { startDate, startTime } = formData;

  const friends = availableFriends.map((friend) => ({
    value: friend,
    label: friend.name,
  }));

  const handleInvites = (e) => {
    setinvitesList(e);
  };

  async function save(e) {
    e.preventDefault();
    console.log("invitelist: ", invitesList);
    const friendsValue = [];
    for (var i = 0; i < invitesList.length; i++) {
      friendsValue.push(invitesList[i].value);
    }
    console.log("friends: ", friendsValue);
    let movieEvent = {
      movie: props.sendMovie,
      start: combStartDate,
      end: combEndDateTime,
      attendees: friendsValue,
    };
    console.log(movieEvent);
    await await fetch("/api/create_event", {
      method: "POST",
      body: JSON.stringify(movieEvent),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((result) => result.text())
      .then((data) => console.log(data));
    updateContext({ showCreateInvitation: false });
  }

  async function getAvailableFriends(start, endDate) {
    console.log("start: ", start);
    console.log("enddate: ", endDate);
    let result = await (
      await fetch(
        "/api/availablefriends?startdate=" + start + "&enddate=" + endDate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
    ).json();
    console.log(result);
    setAvailableFriends(result);
  }

  const searchFriends = (e) => {
    e.preventDefault();
    if (startDate !== undefined && startTime !== undefined) {
      const getStart = new Date(startDate + " " + startTime);
      const start = moment(getStart).format("YYYY-MM-DDTHH:mm:ss");
      setstartDate(start);
      const endDate = moment(start)
        .add(props.sendMovie.length, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss");
      setendDateTime(endDate);
      getAvailableFriends(start, endDate);
      setShow(true);
    }
  };

  return (
    <div className="invitation">
      <Form onSubmit={save}>
        <Row className="media-item">
          <Card>
            <CardImg
              src={`${props.sendMovie.backdropPath}`}
              onError={(e) => (
                (e.target.onError = null),
                (e.target.src =
                  "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_264/https://psykologisk-metod.se/wp-content/themes/unbound/images/No-Image-Found-400x264.png")
              )}
            ></CardImg>
            <CardBody className="text-center">
              <Row>
                <img
                  className="avatar"
                  src={`${props.sendMovie.postPath}`}
                  onError={(e) => (
                    (e.target.onError = null),
                    (e.target.src =
                      "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_264/https://psykologisk-metod.se/wp-content/themes/unbound/images/No-Image-Found-400x264.png")
                  )}
                ></img>{" "}
              </Row>
              <Row className="off-row">
                <Col lg="3"></Col>
                <Col lg="5">
                  <CardTitle className="movie-title text-left">
                    {props.sendMovie.title}
                  </CardTitle>
                </Col>
                <Col lg="4">
                  <Row className="justify-content-end pb-1">
                    <CardSubtitle className="movie-genre text-muted">
                      {props.sendMovie.genre[0]}
                    </CardSubtitle>
                  </Row>
                  <Row className="justify-content-end">
                    <CardSubtitle className="movie-releasedate text-muted">
                      {props.sendMovie.releaseDate}
                    </CardSubtitle>
                  </Row>
                </Col>
              </Row>
              <Row>
                <CardText className="p-1">
                  {props.sendMovie.description}
                </CardText>
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
            <Button className="w-100 magenta mt-2" onClick={searchFriends}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Col>
        </Row>

        {show ? (
          <div>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Label for="selectFriends">Invite your Friends</Label>
                  <Select options={friends} onChange={handleInvites} isMulti />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <hr></hr>
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <div class="cardWrap mr-auto">
                  <div class="card-ticket cardLeft">
                    <h1>{context.loggedInUser.name + "'s Movie Night"}</h1>
                    <div class="title">
                      <h2>{props.sendMovie.title}</h2>
                      <span>movie</span>
                    </div>
                    <Row>
                      <Col lg="6">
                        <div class="time">
                          <h2>
                            {moment(combStartDate).format("YYYY-MM-DD HH:mm")}
                          </h2>
                          <span>start time</span>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div class="time">
                          <h2>
                            {moment(combEndDateTime).format("YYYY-MM-DD HH:mm")}
                          </h2>
                          <span>end time</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div class="card-ticket cardRight">
                    <div className="d-flex justify-content-center">
                      <FontAwesomeIcon icon={faUserFriends} />
                    </div>
                    <div class="number">
                      <h3>{invitesList.length + 1}</h3>
                      <span>attendant</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ) : null}

        <Row className="mt-5">
          <Container className="vbottom">
            <Row>
              <Col lg="12">
                <hr></hr>
              </Col>
            </Row>
            <Row>
              <Col lg="6" sm="12">
                <Button color="secondary" className="w-100" onClick={discard}>
                  Discard
                </Button>
              </Col>
              <Col lg="6" sm="12">
                <Button className="w-100 magenta" type="submit" value="save">
                  Send
                </Button>
              </Col>
            </Row>
          </Container>
        </Row>
      </Form>
    </div>
  );
}
