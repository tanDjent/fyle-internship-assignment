import React from "react";
import { Navbar, NavbarBrand, Jumbotron } from "reactstrap";
export default function Header() {
  return (
    <>
      <Navbar color='dark' dark>
        <Jumbotron className='title'>
          <NavbarBrand>
            <h1>Fyle Internship Bank API</h1>
          </NavbarBrand>
        </Jumbotron>
      </Navbar>
    </>
  );
}
