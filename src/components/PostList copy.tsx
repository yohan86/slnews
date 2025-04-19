import React, {useEffect, useState } from 'react';
import {getPostByCategory} from '../services/contentful';
import PostCard from './PostCard';

const PostList = ({category}) => {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchposts = async () => {
            const fetchedposts = await getPostByCategory(category);
            setPost(fetchedposts);
        };
        if(category){
            fetchposts();
            setLoading(false);
        }

    }, [category]);

    return (
        <>
            {!loading && (
            <div className="post-wrapper flex justify-center md:justify-between">
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
                    <h2 className="section-title col-span-1 md:col-span-3 xl:col-span-4"><span>Latest News</span></h2>
                    {posts.map((post) => (
                        <PostCard key={post.sys.id} post={post} />
                    ))}
            
                </div>
                <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden md:block">

                </div>
            </div>
            )}
        </>
    )

 
};

export default PostList;