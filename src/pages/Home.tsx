import CategorySlider from "../components/CategorySlider";
import PostsByCategoryList from "../components/PostsByCategoryList";

const Home = () => {


  return (
    <>
    <CategorySlider category="4z0e0xwcLp8C3QGc7vrtAI" />
    <div className="main-wrapper w-[95%] md:w-[98%] m-auto p-2">
 
      <PostsByCategoryList />
    </div>
    </>

  )
}

export default Home;