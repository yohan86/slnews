import React, {useEffect, useState} from "react";
import {getAllPosts} from "../services/contentful";
import PostCard from "./PostCard";

const PostsByCategories = () => {
   const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const getPosts = await getAllPosts();
                console.log("all", getPosts);
                const groupPosts = getPosts.reduce((acc, post) => {
                    const postCategories = post.fields.category;
                    console.log("acc", postCategories);

                    if(postCategories.length){
                        console.log(10)
                        postCategories.forEach((postCategory) => {
                            
                            const cat = postCategory.fields.slug;
                            
                            if(!acc[cat]){
                                acc[cat] = [];
                            }
                            acc[cat].push(post);
                           
                        });
                        console.log("cat", acc);
                        return acc; 
                    }else{
                        return [];
                    }
                      
                }, {});

                setPosts(groupPosts);
                console.log('aa', groupPosts);
                
            }catch(error){
                console.log("error from posts by categories", error);
            }
            
        }

        fetchPosts();

    }, []);

    console.log("test", posts);
    return (
        <>
              <div className="post-wrapper flex justify-center md:justify-between">
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
                    

            {Object.keys(posts).map((postCategory) => {
                return (
                    <>     
                        <h2 className="section-title col-span-1 md:col-span-3 xl:col-span-4"><span>{postCategory}</span></h2>
                        {posts[postCategory].map((post) =>{
                            return (
                                <PostCard key="" post={post} /> 
                            )

                        })}

                    </>
                )
                
            })
            }
            </div>
             <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden md:block">
            </div>
            </div>
        </>
    )

}
export default PostsByCategories;