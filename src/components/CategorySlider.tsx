import { useState, useEffect } from 'react';
import { getPostByCategory } from '../services/contentful';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore  from 'swiper/core';
import { Autoplay, Navigation } from 'swiper/modules';
import {Entry} from "contentful";
import { NewsArticlesSkeleton } from '../types/contentful';

SwiperCore.use([Autoplay, Navigation]); // Register the required modules
type posts = Entry<NewsArticlesSkeleton>;
interface props{
    category: string;
}
const CategorySlider = (props:props) => {
    const { category } = props;
    const [posts, setPosts] = useState<posts[]>([]);

    useEffect(() => {
        const fetchposts = async () => {
            const fetchedposts = await getPostByCategory(category);
            setPosts(fetchedposts);
        };
        if(category){
            fetchposts();
        }

    }, [category]);


    return (
        <div className="slider-wrapper w-full lg:max-w-[1600px] max-auto h-[230px] md:h-[420px] mb-[15px]">
            <Swiper
                className="h-full"
                slidesPerView={1}
                breakpoints={{
                    768:{
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    1024:{
                        slidesPerView:3,
                        spaceBetween: 2,
                    },
                }}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
            >
            
                {posts.map((post) => {
                    const fields = post.fields as NewsArticlesSkeleton["fields"];
                    const slugOrId = fields.slug && fields.slug.trim() !== " " ? fields.slug : post.sys.id;
                    return (
                    <SwiperSlide>
                        <div className="slider relative w-full h-full border-b-5 border-red-500" style={{
                                backgroundImage:`url(${fields.postImage?.[0]?.fields?.file?.url})`,
                                backgroundSize:"cover",
                                backgroundPosition: "center",
                            }}>
                            <div className="slider-content w-full absolute bottom-0 bg-black/75 text-white p-5 md:p-3">
                                <h3><a  href={`${import.meta.env.BASE_URL}news/${slugOrId}`}>{fields.title}</a></h3>
                                <a className="b-link" href={`${import.meta.env.BASE_URL}news/${slugOrId}`} title="Read More">Read More</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    );
                })};
            </Swiper>
        </div>


    )



}

export default CategorySlider;