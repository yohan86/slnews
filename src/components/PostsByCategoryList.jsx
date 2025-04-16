import React, {useEffect, useState, useRef} from "react";
import {getAllPosts} from "../services/contentful";
import PostCard from "./PostCard";
import backToTopIcon from "../assets/back-to-top.png";
import CategoryNav from "./CategoryNav";
import GridPostsList from "./GridPostsList";

const PostsByCategoryList = () => {
   const [posts, setPosts] = useState([]);
   const categoryRefs = useRef({});
   const scrollp = useRef(true);
   const categoryWrapperRefs = useRef();
   const [pageScroll, setPageScroll] = useState('true');
   const categoryInitialTop = useRef(null);
   const [catWrapperClass, setCatWrapperClass] = useState(null);
   const [activeCat, setActiveCat] = useState(null);

   const categoryConfig =[
    {slug:"latestnews", name:"Latest News", component:"PostList", layout:"PostCard"},
    {slug:"sports", name:"Sports", component:"PostList", layout:"grid"},
    {slug:"events", name:"Events", component:"PostList", layout:"grid"},
    {slug:"world", name:"World News", component:"PostList", layout:"grid"},
  ];
 


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const getPosts = await getAllPosts();
                console.log(getPosts)
                const groupPosts = getPosts.reduce((acc, post) => {
                    const postCategories = post.fields.category;
                   

                    if(postCategories?.length){
                  
                        postCategories.forEach((postCategory) => {
                            if(postCategory.fields.slug !=="home_slider"){
                                const catSlug = postCategory.fields.slug;
                                const catName = postCategory.fields.categoryName;
                                
                                if(!acc[catSlug]){
                                    acc[catSlug] = {name:catName, posts:[]};
                                }
                                acc[catSlug].posts.push(post);
                            }
                        });
                       
                        
                    }
                      return acc; 
                }, {});

                setPosts(groupPosts);
                console.log("Category refs", categoryRefs.current);
                
                
            }catch(error){
                console.log("error from posts by categories", error);
            }
            
        }

        fetchPosts();

    }, []);





    useEffect(() => {

        const catTop = categoryWrapperRefs.current?.offsetTop || 0;
        categoryInitialTop.current = catTop;
        const handleScrollEvent = () => {
            const scrollPosition = window.scrollY + 50;
     
           if(scrollp.current) {

            if(scrollPosition >= categoryInitialTop.current){
                setCatWrapperClass("fixed");
                console.log(1)
            }else{
                setCatWrapperClass("relative");
                console.log(2)
            }

            for(const slug of Object.keys(categoryRefs.current)){
                const ref = categoryRefs.current[slug];
                if(ref){
                    
                        const sectionTop = ref.offsetTop;
                        const sectionBottom = sectionTop + ref.offsetHeight;
                        if(scrollPosition >= sectionTop && scrollPosition < sectionBottom){
                            
                                setActiveCat(slug);
                           
                            
                        }
                   
                    
                }
            }
        } 
        }
        const hanldeResize = () => {
            categoryInitialTop.current = categoryWrapperRefs.current?.offsetTop || 0;
        };
  
                window.addEventListener("scroll", handleScrollEvent);
                window.addEventListener("resize", hanldeResize);
                return () => {
                    window.removeEventListener("scroll", handleScrollEvent);
                    window.removeEventListener("resize", hanldeResize );
                };
            

       
      
       
    
    }, []);





    const handleCategoryClick = (categoryslug) => {
        setActiveCat(categoryslug);
       scrollp.current = false;
        

 
        const categorySection = categoryRefs.current[categoryslug];
        if(categorySection) {
           
            const yoffset = -50;
            const ytop = categorySection.getBoundingClientRect().top + window.scrollY + yoffset;
            requestAnimationFrame(()=>{
                window.scrollTo({ top:ytop, behavior: "smooth" });
            });
            
            console.log('click', scrollp.current);
            setTimeout(() => {
                scrollp.current = true;
            }, 600);
           

        }else {
            console.warn("No ref found for:", categoryslug);
          }
    }



    const availableCategories = categoryConfig.filter( (cat) => posts[cat.slug]?.posts?.length > 0 );

    return (
        <>
           <CategoryNav
                categories={availableCategories}
                activeCat={activeCat}
                handleCategoryClick={handleCategoryClick}
                categoryWrapperRefs={categoryWrapperRefs}
                catWrapperClass={catWrapperClass}
           />
            <div className="post-wrapper flex justify-center md:justify-between gap-4">
                <div className="grid grid-cols-1">
                    <GridPostsList  
                        categoryRefs={categoryRefs} 
                        categoryName="Latest News" 
                        category="latestnews" 
                        posts={posts["latestnews"]?.posts}
                    />
                    <div className="banner  w-full h-[100px] bg-green-200 mb-[50px]"></div>

                    <GridPostsList  
                        categoryRefs={categoryRefs} 
                        categoryName="Sports" 
                        category="sports" 
                        posts={posts["sports"]?.posts} 
                    />
                    <div className="banner  w-full h-[100px] bg-green-200 mb-[50px]"></div>
                    <GridPostsList  
                        categoryRefs={categoryRefs} 
                        categoryName="Sports" 
                        category="sports" 
                        posts={posts["sports"]?.posts} 
                    />
                    <div className="banner  w-full h-[100px] bg-green-200 mb-[50px]"></div>

                </div>
                <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden mt-5 md:block">
                </div>
                  
            </div>
            <button 
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}
                style={{
                    backgroundImage:`url(${backToTopIcon})`,
                    backgroundSize:"62px 64px",
                    backgroundRepeat:"no-repeat",
                }}
                className="w-[70px] h-[110px] cursor-pointer"
            >
            
            </button>
        </>
    )

}
export default PostsByCategoryList;