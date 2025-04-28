import { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import { getPostBySlugOrId } from "../services/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { NewsArticlesSkeleton } from "../types/contentful";
import { Entry } from "contentful";

type Post = Entry<NewsArticlesSkeleton>;
const NewsDetails = () => {
    const { slugOrId } = useParams<{ slugOrId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const fields = post?.fields as NewsArticlesSkeleton["fields"];
console.log('para', slugOrId)
    useEffect(() => {
    if(!slugOrId) return;

    const fetchPost = async () => {
      try{
        let postData = await getPostBySlugOrId(slugOrId!);
        console.log("post data", postData);
        if(postData){
          setPost(postData);
          console.log("dd", slugOrId);
        }else{
          console.log("no data");
        }
      }catch(error){
        console.log('error', error)
      }
    };
    fetchPost();
    

  }, [slugOrId]);
  console.log(post);
console.log("Block", BLOCKS);
const option = {
  renderNode : {
    [BLOCKS.EMBEDDED_ENTRY] : (node: any) => {
      const videoID = node.data.target.fields?.videoUrl;
      if(!videoID) return null;

      return(
        <div className="youtube-embed w-[100%] md:w-[560px] h-[200px] md:h-[340px] mt-5 mb-5 md:mt-10 md:mb-10">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoID}?rel=0`}
          title="Embedded YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields || {};
      if(!file.url) return null;

      return (
        <div className="w-[300px] md:w-[600px] h-auto mt-10 mb-10">
          <img 
            src={file.url}
            alt={title || "Embedded Image"}
          />
        </div>
      )
    }
  }
}
console.log("op", option);


  return (
    <div className="news-details-wrapper block md:flex  md:justify-between w-[95%] lg:w-[986px] xl:w-[1200px] m-auto mt-[25px] lg:mt-[50px] md:gap-5">
      <div className="news-details w-[95%] md:w-[560px] lg:w-[780px] xl:w-[950px] m-auto">
        {fields?.title && (
          <h1 className="item-title mb-[20px]">{fields?.title}</h1>
          
        )}
        {fields?.postImage?.[0]?.fields?.file?.url && (
          <div className="item-image-wrapper">
            <img 
            src={fields?.postImage?.[0]?.fields?.file?.url || "no image"} 
            alt={fields?.postImage?.[0]?.fields?.file?.title || "News Image"}
            className="item-image w-[100%] h-[auto] md:w-[700px]"
            />
            <div className="item-description mt-10 mb-10"> 
              {documentToReactComponents(fields?.description, option)}
            </div>

          </div>
        )}
      </div>
      <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden md:block"></div>

    </div>
  )
};

export default NewsDetails;