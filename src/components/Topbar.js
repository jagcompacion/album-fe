import React from "react";
import { Navbar } from "react-bootstrap";
import UploadPhoto from "./UploadPhoto";

const Topbar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Albums</Navbar.Brand>
    <div className="mr-auto" />
    <UploadPhoto />
  </Navbar>
);

export default Topbar;
