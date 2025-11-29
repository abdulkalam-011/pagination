import React from "react";
import Pagination from "./Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfiniteScroll from "./Infinite-scroll";
import Header from "./Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Pagination />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
