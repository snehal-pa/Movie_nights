import React, { useContext } from "react";
import { NavItem, NavLink, Nav, Badge, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import { Context } from "../App";

export default function Topbar() {
  const [context, updateContext] = useContext(Context);
  console.log("from topbar");

  console.log(context.loggedInUser);

  /*async function logout() {
    const result = await fetch("http://localhost:8080/api/logout");
    console.log(result.status);
    if (result.status == 200) {
      updateContext({
        loggedInUser: false,
      });
    }
  }*/

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
              {context.loggedInUser ? context.loggedInUser.name : ""}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={"/"}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
