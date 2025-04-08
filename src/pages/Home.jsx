import React, {useState} from "react";
import PostList from "../components/PostList";
import CategorySlider from "../components/CategorySlider";
import PostsByCategories from "../components/PostsByCategories";

const Home = () => {
  return (
    <>
          
    <CategorySlider category="4z0e0xwcLp8C3QGc7vrtAI" />
    <div className="main-wrapper w-[95%] m-auto p-2">
      <PostList category="744XDIIyrQku4BxnFRPuBA" />
      <PostsByCategories />
    </div>
    </>

  )
}

export default Home;