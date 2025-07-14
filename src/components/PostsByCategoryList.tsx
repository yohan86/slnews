import {useEffect, useState, useRef} from "react";
import {getAllPosts} from "../services/contentful";
import CategoryNav from "./CategoryNav";
import GridPostsList from "./GridPostsList";
import TwocolsPostsImages from "./TwocolsPostsImges";
import PostsByColumn from "./PostsByColumn";
import { Entry } from "contentful";
import { NewsArticlesSkeleton } from "../types/contentful";
import Weather from "./Weather";
import WorldNews from "./WorldNews";

type Post = Entry<NewsArticlesSkeleton>;

const PostsByCategoryList = () => {
   const [posts, setPosts] = useState<Record<string, { name: string; posts: Post[] }>>({});
   const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
   const scrollp = useRef(true);
   const categoryWrapperRefs = useRef<HTMLElement | null>(null);
   const categoryInitialTop = useRef<number>(0);
   const [catWrapperClass, setCatWrapperClass] = useState<string | null>(null);
   const [activeCat, setActiveCat] = useState<string | null>(null);

   const categoryConfig =[
    {slug:"latestnews", name:"Latest News", allowMenu:true, component:"PostList", layout:"PostCard"},
    {slug:"sports", name:"Sports", allowMenu:true, component:"PostList", layout:"grid"},
    {slug:"events", name:"Events", allowMenu:true, component:"PostList", layout:"grid"},
    {slug:"world", name:"World News", allowMenu:true, component:"PostList", layout:"grid"},
    {slug:"twocolimages", name:"two columns with images ", allowMenu:false, component:"PostList", layout:"grid"},
    {slug:"featured", name:"Featured News", allowMenu:true, component:"PostList", layout:"grid"},
  ];
 


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const getPosts = await getAllPosts();
                const groupPosts = getPosts.reduce((acc: Record<string, {name: string; posts:Post[] }>, post:Post) => {
                    const postCategories = post.fields.category;

                    if(Array.isArray(postCategories)){
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
                }else{
                    setCatWrapperClass("relative");
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
       /* const hanldeResize = () => {
            setTimeout(()=> {
                categoryInitialTop.current = categoryWrapperRefs.current?.offsetTop || 0;
            }, 1000);
            
        };*/
        window.addEventListener("scroll", handleScrollEvent);
        window.addEventListener("resize", handleScrollEvent);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent);
            window.removeEventListener("resize", handleScrollEvent );
        };
    
    }, []);

    const handleCategoryClick = (categoryslug:string) => {
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
    
    const availableCategories = categoryConfig.filter( (cat) => cat.allowMenu && posts[cat.slug]?.posts?.length > 0 );
    return (
        <>
        <div className="main-wrapper w-[95%] md:w-[98%] lg:max-w-[1600px] m-auto p-2">
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
                    <div className="w-[95%] m-auto"><a href="https://www.youtube.com/@LineTvLK" target="_blank"><img src="./images/channels4_banner.jpg" /></a></div>
                    <TwocolsPostsImages
                    // categoryRefs={categoryRefs} 
                    // categoryName="Two Columns" 
                        category="twocolimages" 
                        posts={posts["twocolimages"]?.posts}
                    />

                </div>
                <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px]  hidden mt-10 md:block">
                    <Weather />
                    <div className="bg-green-200">
                    </div>
                </div>
                
            </div>
        </div>
            <div className="w-full  bg-[#706161] my-12">
            <div className="flex flex-row w-full flex-wrap justify-between m-auto lg:max-w-[1600px]">
                <div className="w-full bg-[#2c793f] p-5 md:w-1/2 lg:w-1/3">
                    <PostsByColumn  
                        categoryRefs={categoryRefs} 
                        categoryName="Sports" 
                        category="sports" 
                        posts={posts["sports"]?.posts} 
                        textColor="text-[#ffffff]"
                        linkColor="text-[#fcc901]"
                    />

                </div>
                <div className="w-full p-5 md:w-1/2 lg:w-1/3 bg-[#5d2c2c]">
                    <PostsByColumn  
                        categoryRefs={categoryRefs} 
                        categoryName="featured" 
                        category="featured" 
                        posts={posts["featured"]?.posts} 
                        textColor="text-[#ffffff]"
                        linkColor="text-[#fcc901]"
                    />
                </div>
                <div className="w-full p-5 md:w-full lg:w-1/3 bg-[#5a7c8a]">
                    <WorldNews />
                </div>
            </div>
            </div>
            <div className="main-wrapper w-[95%] md:w-[98%] lg:max-w-[1600px] m-auto p-2">
               
                <div className="flex banner  w-full h-[100px] bg-green-200 mb-[50px] items-stretch justify-center"><div className="self-center">Advertiesment</div></div>
                <GridPostsList  
                    categoryRefs={categoryRefs} 
                    categoryName="Events" 
                    category="events" 
                    posts={posts["events"]?.posts} 
                />
                <div className="flex banner  w-full h-[100px] bg-green-200 mb-[50px] items-stretch justify-center"><div className="self-center">Advertiesment</div></div>
            </div>

        </>
    )

}
export default PostsByCategoryList;