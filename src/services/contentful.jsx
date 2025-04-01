

import { createClient } from 'contentful'

const client = createClient({
    space: 'xwa7hnkxpqxs',
    accessToken: 'EKlOGMteSRm_XfmOLRbKnkGLxhzo0Cz3_cKTONkSV30',

});

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
const logCategories = async () => {
    try {
      const entries = await client.getEntries({
        content_type: 'newsArticles',  // Fetch all news articles
      });
  
      // Log each post's categories to inspect the array structure
      entries.items.forEach(item => {
        console.log(item.fields.category); // Logs the category field, which should be an array
      });
    } catch (error) {
      console.error("Error logging categories:", error);
    }
  };


export default client;