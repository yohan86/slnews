import React from "react";
import { format, formatDistanceToNow } from "date-fns";

const PostCard = ({post}) => {

  console.log(post)

  const postDate = post.fields.date ? new Date(post.fields.date): new Date();
  const formattedDate = format(postDate, "MMMM dd, yyyy");
  const timeAgo = formatDistanceToNow(postDate, { addSuffix:true});

  const slugOrId = post.fields.slug && post.fields.slug.trim() !== " " ? post.fields.slug : post.sys.id;

  return (
    <div className="news-card flex md:block w-full md:w-[180px] lg:w-[225px] xl:w-[280px]">
      <div className="w-[135px] min-w-[135px] md:w-full h-[85px] lg:h-[125px]" style={{
        backgroundImage:`url(${post.fields.postImage?.[0]?.fields?.file?.url})`,
        backgroundSize: "cover",
        backgroundPosition:"center"

        }}>
       
      </div>
      <div className="item-intro-wrapper p-2 pt-0 md:pt-2">
        <h3 className="!text-[14px] text-gray-900">{post.fields.title}</h3>
        <a href={`/news/${slugOrId}`} className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;{slugOrId}</a>
        <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
      </div>
            
    </div>
  )

}

export default PostCard;