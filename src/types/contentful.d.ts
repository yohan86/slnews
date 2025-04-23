import { Entry, EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface CategorySkeleton extends EntrySkeletonType {
    contentTypeId : "category"; //Content type id
    fields : {
        slug: string;
        categoryName: string;
    };
}

export interface NewsArticlesSkeleton extends EntrySkeletonType {
    contentTypeId: "newsArticles";
    fields:{
        title?: string;
        description: Document;
        content: string;
        date?: Date | undefined;
        postImage?: Entry<{
            fields:{
                file:{
                    url: string;
                };      
            };
        }>[];
        category?: Entry<CategorySkeleton>[];
        slug?: string;
    };
};

export interface EmbeddedVideo extends EntrySkeletonType {
    contentTypeId: "embeddedVideo";
    fields: {
        videoTitle: string;
        videoUrl: string;
    };
};