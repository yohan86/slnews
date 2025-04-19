import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

const TwocolsPostsImages = (({categoryRefs, categoryName, category, posts}) => {
    const safePosts = posts || [];
    console.log("grid", safePosts);
    let postDate, formattedDate, timeAgo, slugOrId = '';
    let description, content, mainpost = '';

return (
    
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
            <h2 
                
                className={`section-title col-span-1 md:col-span-3 xl:col-span-4 ${category}`}>
                
            </h2>
            {safePosts.map((post, index) => (
                console.log("check", post.fields.category),
                postDate = post.fields.date ? new Date(post.fields.date): new Date(),
                console.log(postDate),
                formattedDate = format(postDate, "MMMM dd, yyyy"),
                timeAgo = formatDistanceToNow(postDate, { addSuffix:true}),
                slugOrId = post.fields.slug && post.fields.slug.trim() !== " " ? post.fields.slug : post.sys.id,
                description = post.fields.description,
                content = post.fields.content,
                
                mainpost = post.fields.category?.filter((cat) => cat.fields?.slug === 'mainnews'),
                
                <>
                    {mainpost.length > 0 ? (
                        
                        <div className="news-card md:flex col-span-1 md:col-span-2 xl:col-span-3 items-center mb-10 h-auto">
                        <div className="w-[100%] md:w-[45%] item-intro-wrapper p-2 pt-0 md:pt-2 ">
                            <a className="align-center" href={`/news/${slugOrId}`} title="Read More">
                                <h3 className="!text-[13px] lg:!text-[25px] text-gray-900">{post.fields.title}</h3>
                                <div className="mt-5 mb-5 line-clamp-3">{documentToReactComponents(description)}</div>
                                <span className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;</span></a>
                            <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
                        </div>
                        {post.fields.postImage?.[0]?.fields?.file?.url && (
                        <a href={`/news/${slugOrId}`}  title="Read More">
                            <div className="w-[100%] min-w-[135px] md:w-[480px] h-[180px] lg:h-[350px]" style={{
                            backgroundImage:`url(${post.fields.postImage?.[0]?.fields?.file?.url})`,
                            backgroundSize: "cover",
                            backgroundPosition:"center"
                            }}>
                            </div>
                        </a>
                        )}
                    </div>
                    
                    ) : (
                        <div className="news-card flex md:block w-full md:w-[180px] lg:w-[225px] xl:w-[280px] mb-[10px] md:mb-[20px] h-auto">
                        {post.fields.postImage?.[0]?.fields?.file?.url && (
                        <a href={`/news/${slugOrId}`}  title="Read More">
                            <div className="w-[135px] min-w-[135px] md:w-full h-[85px] lg:h-[125px]" style={{
                            backgroundImage:`url(${post.fields.postImage?.[0]?.fields?.file?.url})`,
                            backgroundSize: "cover",
                            backgroundPosition:"center"
                            }}>
                            </div>
                        </a>
                        )}
                        <div className="item-intro-wrapper p-2 pt-0 md:pt-2">
                            <a href={`/news/${slugOrId}`} title="Read More">
                                <h3 className="!text-[13px] lg:!text-[14px] text-gray-900">{post.fields.title}</h3>
                                <span className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;</span></a>
                            <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
                        </div>
                            
                    </div>
                    )}
                 
                </>
               
               
            ))}
        </div>
  
)

});

export default TwocolsPostsImages;