
import { format, formatDistanceToNow } from "date-fns";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import { CategorySkeleton, NewsArticlesSkeleton } from "../types/contentful";

interface props{
    //categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
    //categoryName: string;
    category: string;
    posts: Entry<NewsArticlesSkeleton>[];
}

const TwocolsPostsImages = ((props:props) => {

    const {category, posts} = props;

return (
    
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-3 md:gap-2'>
            <h2 className={`section-title col-span-1 md:col-span-3 xl:col-span-4 ${category}`}>
            </h2>
            {Array.isArray(posts) && posts.map((post:Entry<NewsArticlesSkeleton>, index) => {
                const fields = post.fields as NewsArticlesSkeleton["fields"];
                let postDate = fields.date? new Date(fields.date): new Date();
              
                const formattedDate = format(postDate, "MMMM dd, yyyy");
                const timeAgo = formatDistanceToNow(postDate, { addSuffix:true});
         
                const slugOrId = fields.slug?.trim() || post.sys.id;
                const description = fields.description;
                
                //const mainpost = fields.category?.filter((cat:[slug:string, categoryName:string]) => cat.fields?.slug === 'mainnews');

                const mainpost = fields.category?.filter((cat) => {
                    const catfields = cat.fields as CategorySkeleton["fields"];
                    return catfields.slug === "mainnews";
                });

                return (
                <>
                    {mainpost && mainpost.length > 0 ? (
                        
                        <div key={index} className="news-card md:flex col-span-1 md:col-span-2 lg:col-span-3 items-center md:items-start mb-10 h-auto">
                            <div className="w-[100%] md:w-[45%] item-intro-wrapper p-2 pt-0 md:pt-2">
                                <a className="align-center" href={`/news/${slugOrId}`} title="Read More">
                                    <h3 className="post-title text-gray-900">{fields.title}</h3>
                                    <div className="mt-5 mb-5 line-clamp-3">{documentToReactComponents(description)}</div>
                                    <span className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;</span></a>
                                <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
                            </div>
                            { fields.postImage?.[0]?.fields?.file?.url && (
                                <div className="w-[100%] min-w-[135px] md:w-[50%] h-[180px] lg:h-[350px]" style={{
                                backgroundImage:`url(${fields.postImage?.[0]?.fields?.file?.url})`,
                                backgroundSize: "cover",
                                backgroundPosition:"center"
                                }}>
                                    
                                <a href={`/news/${slugOrId}`}  title="Read More"  className="w-[100%] h-[100%]"></a>
                                </div>
                    
                            )}
                        </div>
                    
                    ) : (
                        <div key={index} className="news-card flex col-span-1 md:block w-full md:w-[180px] lg:w-[225px] xl:w-[280px] mb-[10px] md:mb-[20px] h-auto">
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
                                    <h3 className="post-title text-gray-900">{fields.title}</h3>
                                    <span className="link-text text-red-500 mb-[10px]">Read more &gt;&gt;</span></a>
                                <div className="text-xs font-semibold">{formattedDate} | &nbsp;{timeAgo}</div>
                            </div>
                            
                        </div>
                    )}
                 
                </>
            )
               
            })}
        </div>
  
)

});

export default TwocolsPostsImages;