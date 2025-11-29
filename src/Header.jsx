import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app_header">
      <h1>Product Gallery</h1>
      <Link to="/">Pagination</Link> |{" "}
      <Link to="/infinite-scroll">Infinite Scroll</Link>
    </header>
  );
};

export default Header;
