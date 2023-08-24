import React from "react";
import Header from "./Header";
import Blog from "../Blog";
import Categories from "../Categories";
const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Blog />
    </div>
  );
};

export default Home;
