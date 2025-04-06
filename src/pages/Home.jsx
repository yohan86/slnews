import React, {useState} from "react";
import PostList from "../components/PostList";
import CategorySlider from "../components/CategorySlider";

const Home = () => {
  return (
    <>
          
    <CategorySlider category='4z0e0xwcLp8C3QGc7vrtAI' />
    <div className="main-wrapper w-full lg:w-[95%] m-auto p-2">
      <PostList />
    </div>
    </>

  )
}

export default Home;