import React from 'react'

const PostCard = ({post}) => {
  return (
    <div className='news-card'>
        <h3 kwy={post.fields.category}>{post.fields.title}</h3>
        <img src={post.fields.postImage?.[0]?.fields?.file?.url} 
            alt={post.fields.title}
        />
            
    </div>
  )

}

export default PostCard;