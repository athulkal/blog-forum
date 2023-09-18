import React from "react";
import Header from "./Header";
import Blog from "../Blog";
import Categories from "../Categories";
const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <div className="flex w-full">
        <Blog className="w-6/10" />
        <div className="w-4/10">
          <div className="p-32">gibberish</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
