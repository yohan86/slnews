import React, {useEffect, useState } from 'react';
import client from '../services/contentful';
import PostCard from './PostCard';

const PostList = ()=> {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        client
            .getEntries({
                content_type:'newsArticles'
            })
            .then((response) => {
                setPost(response.items);
            })
            .catch((error) => {
                console.error('Error from contentful', error);
            });

    },[]);
    console.log(posts);

    return (
        <>
            <h2>Posts</h2>
            <div className="post-wrapper flex justify-center md:justify-between">
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
                    {posts.map((post) => (
                        <PostCard key={post.sys.id} post={post} />
                    ))}
            
                </div>
                <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden md:block">

                </div>
            </div>
        </>
    )

 
};

export default PostList;