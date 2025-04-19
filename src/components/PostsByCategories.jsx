import React, {useEffect, useState, useRef} from "react";
import {getAllPosts} from "../services/contentful";
import PostCard from "./PostCard";
import backToTopIcon from "../assets/back-to-top.png";

const PostsByCategories = () => {
   const [posts, setPosts] = useState([]);
   const categoryRefs = useRef({});
   const scrollp = useRef(true);
   const categoryWrapperRefs = useRef();
   const [pageScroll, setPageScroll] = useState('true');
   const categoryInitialTop = useRef(null);
   const [catWrapperClass, setCatWrapperClass] = useState(null);
   const [activeCat, setActiveCat] = useState(null);

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


    return (
        <>
            <ul ref={categoryWrapperRefs} className={`category-wrapper ${
                catWrapperClass === "fixed"
                ? "fixed shadow-md transition-all duration-300 ease-in-out" 
                : "relative transition-all duration-300 ease-in-out"
                } w-full md:flex md:justify-center md:gap-6 p-2 bg-gray-500 text-white`}>
                {Object.keys(posts).map((categoryslug) => {

                    return (
                        <li 
                            key={categoryslug}
                            onClick={()=> handleCategoryClick(categoryslug)}
                            className={`pl-3 pr-3 pb-1 ${(activeCat === categoryslug)? 'active bg-white text-black font-medium rounded-full shadow-[1px_1px_3px_2px_#292754]':'cursor-pointer'}`}
                        >{posts[categoryslug].name}</li>
                    )
                })}
            </ul>
            {catWrapperClass === "fixed" && (
                <div className="h-[50px]"></div>
            )}
            <div className="post-wrapper flex justify-center md:justify-between gap-4">
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
              

                {Object.keys(posts).map((category) => {
                    console.log('cat', category);
                    return (
                        <>
                            <h2 
                            ref={(el) => (categoryRefs.current[category] = el)}
                            className={`section-title col-span-1 md:col-span-3 xl:col-span-4 ${category}`}>
                                <span>{posts[category].name}</span>
                            </h2>
                            {posts[category].posts.map((post) => {
                                return (
                                    
                                
                                        <PostCard key={post.sys.id} post={post} />
                                
                                )
                            })}
                            <div className="banner col-span-1 md:col-span-3 xl:col-span-4  w-full h-[100px] bg-green-200 mb-[50px]"></div>
                        
                        </>
                    )
                    
                })}

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
export default PostsByCategories;