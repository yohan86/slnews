import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import { getPostBySlugOrId } from "../services/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const NewsDetails = () => {
    const {slugOrId} = useParams();
    const [post, setPost] = useState(null);
console.log('para', slugOrId)
    useEffect(() => {

    const fetchPost = async () => {
      try{
        let postData = await getPostBySlugOrId(slugOrId);
        console.log(slugOrId)
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

const option = {
  renderNode : {
    [BLOCKS.EMBEDDED_ENTRY] : (node) => {
      const videoID = node.data.target.fields?.videoUrl;
      if(!videoID) return null;

      return(
        <div className="youtube-embed w-[100%] md:w-[560px] h-[200px] md-h-[315px]" style={{ margin: '2rem 0' }}>
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
    }
  }
}



  return (
    <div className="news-details-wrapper block md:flex  md:justify-between w-[95%] lg:w-[986px] xl:w-[1200px] m-auto mt-[25px] lg:mt-[50px] md:gap-5">
      <div className="news-details w-[95%] md:w-[560px] lg:w-[780px] xl:w-[950px] m-auto">
        {post && post.fields?.title && (
          <h1 className="item-title mb-[20px]">{post.fields?.title}</h1>
        
        )}
        {post && post.fields && (
          <div className="item-image-wrapper">
            <img 
            src={post.fields?.postImage?.[0]?.fields?.file?.url} 
            alt="" 
            className="item-image w-[100%] h-[auto] md:w-[700px]"
            />
            <div className="item-description mt-10 mb-10"> 
              {documentToReactComponents(post.fields?.description, option)}
            </div>

          </div>
        )}
      </div>
      <div className="sidebar w-[150px] lg:w-[220px] min-w-[150px] xl:min-w-[220px] bg-green-200 hidden md:block"></div>

    </div>
  )
};

export default NewsDetails;