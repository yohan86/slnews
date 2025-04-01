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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4'>
                {posts.map((post) => (
                    <PostCard key={post.sys.id} post={post} />
                ))}
        
            </div>
        </>
    )

 
};

export default PostList;