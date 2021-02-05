import React, { useContext } from "react";
import { NavItem, NavLink, Nav, Badge, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import { Context } from "../App";

export default function Topbar() {
  const [context, updateContext] = useContext(Context);

  const logout = async () => {
    const res = await (await fetch("/logout")).json;
    if (!res.error) {
      updateContext({ loggedInUser: false });
    }

    console.log("logingout");
  };

  return (

    <div>
       {!context.loggedInUser == false  ?( 
      <Navbar className="navbar-custom" light expand="md">
        <NavbarBrand href="/home">MovieNights</NavbarBrand>
        <Nav className="ml-auto" navbar>
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
                src={
                  context.loggedInUser
                    ? context.loggedInUser.profileUrl
                    : "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
                }
              ></img>
              {context.loggedInUser ? context.loggedInUser.name : "Username"}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={logout} tag={Link} to={"/"}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
       ) : ("") }
    </div>
  );
}
