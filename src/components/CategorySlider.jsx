import React, { useState, useEffect } from 'react';
import { getPostByCategory } from '../services/contentful';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore  from 'swiper/core';
import { Autoplay, Navigation } from 'swiper/modules';

SwiperCore.use([Autoplay, Navigation]); // Register the required modules

const CategorySlider = ({category}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchposts = async () => {
            const fetchedposts = await getPostByCategory(category);
            setPosts(fetchedposts);
        };
        if(category){
            fetchposts();
        }
        console.log(posts.length);

    }, [category]);


    return (

        <div className="slider-wrapper w-full lg:max-w-[1600px] max-auto h-[230px] md:h-[420px]">
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
            
                {posts.map((post)=>(
                    <SwiperSlide>
                        <div className="slider relative w-full h-full border-b-5 border-red-500" style={{
                                backgroundImage:`url(${post.fields.postImage?.[0]?.fields?.file?.url})`,
                                backgroundSize:"cover",
                                backgroundPosition: "center",
                            }}>
                            <div className="slider-content w-full absolute bottom-0 bg-black/75 text-white p-5 md:p-3">
                                <h3>{post.fields.title}</h3>
                                <a className="b-link" href="/">Read More</a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>


    )



}

export default CategorySlider;