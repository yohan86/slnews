

import { createClient, Entry } from "contentful";
import { NewsArticlesSkeleton } from "../types/contentful";

const client = createClient({
    space: "xwa7hnkxpqxs",
    accessToken: "EKlOGMteSRm_XfmOLRbKnkGLxhzo0Cz3_cKTONkSV30",

});
export const getAllPosts = async ():Promise<Entry<NewsArticlesSkeleton>[]> => {
  try{
      const entries = await client.getEntries<NewsArticlesSkeleton>({
          content_type :"newsArticles",
      });
      const news: Entry<NewsArticlesSkeleton>[] = entries.items;
      return news;

  }catch(error){
      console.error("Error fetching posts by categories", error);
      return [];
  }

};
export const getPostByCategory = async (categoryId:string):Promise<Entry<NewsArticlesSkeleton>[]> => {
    try{
        const entries = await client.getEntries<NewsArticlesSkeleton>({
            content_type :'newsArticles',
            'fields.category.sys.id[in]': categoryId,
        } as any);
        return entries.items;

    }catch(error){
        console.error("Error fetching posts by categories", error);
        return [];
    }

};

export const getPostBySlugOrId = async (slugOrId:string):Promise<Entry<NewsArticlesSkeleton> | null> => {
  console.log('para2', slugOrId)
  try{
      const slugResponse = await client.getEntries<NewsArticlesSkeleton>({
        content_type :'newsArticles',
        'fields.slug': slugOrId,
      } as any);
      console.log("Post data fetched by slug:", slugResponse);

      if(slugResponse.items.length > 0){
        return slugResponse.items[0];
      }else{
        const idResponse = await client.getEntry<NewsArticlesSkeleton>(slugOrId);
        console.log("id", idResponse);
        return idResponse;
      }

  }catch(error){
      console.error("Error fetching posts by slug", error);
      return null;
  }

};


export default client;