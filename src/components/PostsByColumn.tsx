import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Entry } from "contentful";
import { NewsArticlesSkeleton } from "../types/contentful";

interface props{
    categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
    categoryName: string;
    category: string;
    posts: Entry<NewsArticlesSkeleton>[];
    textColor:string;
    linkColor:string;
}

const PostsByColumn = ((props:props) => {
    const {categoryRefs, categoryName, category, posts, textColor, linkColor} = props;
    const safePosts = posts || [];

return (
    <>
        { safePosts.length > 0 && (
        
        <div className="gap-1 gap-y-3 md:gap-2">
        
            <h2 
                ref={(el: HTMLElement | null) => {categoryRefs.current[category] = el }}
                className={`section-title col-span-1 md:col-span-2  ${category}`}>
                <span>{categoryName}</span>
            </h2>
            {safePosts.map((post) => {
                const fields = post.fields as NewsArticlesSkeleton["fields"];
                const postDate = fields.date ? new Date(fields.date): new Date();
                const formattedDate = format(postDate, "MMMM dd, yyyy");
                const timeAgo = formatDistanceToNow(postDate, { addSuffix:true});
                const slugOrId = fields.slug && fields.slug.trim() !== " " ? fields.slug : post.sys.id;
            

                return (
                    <>
                    
                    <div className="flex flex-col xl:flex-row news-cols-card w-full  mb-[10px] md:mb-[20px] ">
                        {fields.postImage?.[0]?.fields?.file?.url && (
             
                        <a href={`/news/${slugOrId}`} className="w-full xl:w-1/2" title="Read More">
                            <div className="w-[135px] min-w-[135px] h-[85px]  md:w-full md:h-[150px] lg:h-[145px]" style={{
                            backgroundImage:`url(${fields.postImage?.[0]?.fields?.file?.url})`,
                            backgroundSize: "cover",
                            backgroundPosition:"center"
                            }}>
                            </div>
                        </a>
                        )}
                        <div className="item-intro-wrapper p-2 pt-0 w-full xl:w-1/2 md:pt-2">
                            <a href={`${import.meta.env.BASE_URL}news/${slugOrId}`} title="Read More">
                                <h3 className={`!text-[13px] lg:!text-[14px] ${textColor}`}>{fields.title}</h3>
                                <span className={`mb-[10px] ${linkColor}`}>Read more &gt;&gt;</span></a>
                            <div className={`text-xs font-semibold ${textColor}`}>{formattedDate} | &nbsp;{timeAgo}</div>
                        </div>
                            
                    </div>
                    </>

                )
               
            })}

            
        </div>
        )}
    </>

)

});
export default PostsByColumn;