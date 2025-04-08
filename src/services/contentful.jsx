

import { createClient } from 'contentful'

const client = createClient({
    space: 'xwa7hnkxpqxs',
    accessToken: 'EKlOGMteSRm_XfmOLRbKnkGLxhzo0Cz3_cKTONkSV30',

});
export const getAllPosts = async () => {
  try{
      const entries = await client.getEntries({
          content_type :'newsArticles',
      });
      return entries.items;

  }catch(error){
      console.error("Error fetching posts by categories", error);
      return [];
  }

};
export const getPostByCategory = async (category) => {
    try{
        const entries = await client.getEntries({
            content_type :'newsArticles',
            'fields.category.sys.id[in]': category,
        });
        return entries.items;

    }catch(error){
        console.error("Error fetching posts by categories", error);
        return [];
    }

};

export const getPostBySlugOrId = async (slugOrId) => {
  console.log('para2', slugOrId)
  try{
      const slugResponse = await client.getEntries({
        content_type :'newsArticles',
        'fields.slug': slugOrIds,
      });
      console.log("Post data fetched by slug:", slugResponse);

      if(slugResponse.items.length > 0){
        return slugResponse.items[0];
      }else{
        const idResponse = await client.getEntry(slugOrId);
        return idResponse;
      }

  }catch(error){
      console.error("Error fetching posts by slug", error);
      return [];
  }

};


export default client;