import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Entry } from "contentful";
import { NewsArticlesSkeleton } from "../types/contentful";

interface props{
    categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
    categoryName: string;
    category: string;
    posts: Entry<NewsArticlesSkeleton>[];
}

const GridPostsList = ((props:props) => {
    const {categoryRefs, categoryName, category, posts} = props;

    const safePosts = posts || [];
    console.log("grid", safePosts);


return (
    <>
        { safePosts.length > 0 && (
        
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
        
            <h2 
                ref={(el: HTMLElement | null) => {categoryRefs.current[category] = el }}
                className={`section-title col-span-1 md:col-span-3 xl:col-span-4 ${category}`}>
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
                    
                    <div className="news-card flex md:block w-full md:w-[180px] lg:w-[225px] xl:w-[280px] mb-[10px] md:mb-[20px]">
                        {fields.postImage?.[0]?.fields?.file?.url && (
                        <a href={`/news/${slugOrId}`}  title="Read More">
                            <div className="w-[135px] min-w-[135px] md:w-full h-[85px] lg:h-[125px]" style={{
                            backgroundImage:`url(${fields.postImage?.[0]?.fields?.file?.url})`,
                            backgroundSize: "cover",
                            backgroundPosition:"center"
                            }}>
                            </div>
                        </a>
                        )}
                        <div className="item-intro-wrapper p-2 pt-0 md:pt-2">
                            <a href={`/news/${slugOrId}`} title="Read More">
                                <h3 className="!text-[13px] lg:!text-[14px] text-gray-900">{fields.title}</h3>
                                <span className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;</span></a>
                            <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
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
export default GridPostsList;