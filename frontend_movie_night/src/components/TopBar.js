import React, { useState, useEffect, useContext } from "react";
import { NavItem, NavLink, Nav, Badge, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import { Context } from "../App";

export default function Topbar() {
  const [context, updateContext] = useContext(Context);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(async () => {
    getLoggedInUser();
  }, [loggedInUser]);

  async function logout() {
    const result = await fetch("http://localhost:8080/api/logout");
    if (result.status == 200) {
      //updateContext({ loggedInUser: false });
      setLoggedInUser(false);
    }
  }

  async function getLoggedInUser() {
    let result = await fetch("http://localhost:8080/api/whoami");
    let user = await result.json();
    if (result.status == 404) {
      //updateContext({ loggedInUser: false });
      setLoggedInUser(false);
      return;
    }
    //console.log(user);
    //updateContext({ loggedInUser: user });
    setLoggedInUser(user);
  }

  return (
    <div>
      <Navbar className="navbar-custom" light expand="md">
        <NavbarBrand href="/">MovieNights</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={"/"}>
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/home"}>
              Home
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/"}>
              <Badge className="mr-2 top-bar-badge">0</Badge>
              Invitations
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/"}>
              <img
                className="user-img"
                src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
              ></img>
              {loggedInUser ? loggedInUser.name : "Username"}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/"} onClick={logout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
