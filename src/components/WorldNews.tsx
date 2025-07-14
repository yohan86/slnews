import { useState, useEffect } from "react";
import {format} from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";

type Article = {
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
};
type WorldNews= {
    articles: Article[];
}
const WorldNews = ()=> {
    const [worldNews, setWorldNews] = useState<WorldNews | null>(null);
    const dateFormat =(date:string)=> {
        const newsDate = new Date(date);
        const formatDate = format(newsDate, "MMMM dd, yyyy");
        return formatDate;
    };

    useEffect(() => {
        fetch('https://slnews-production.up.railway.app/api/worldNews')
          .then((res) =>{
            if(!res.ok){
                throw new Error(`https error:${res.status}`);
            }
            return res.json();
          } )
          .then((data) => setWorldNews(data))
          .catch((err) => console.error('Failed to load news:', err));
      }, []);

    /*useEffect(()=> {
        const worldNews = async ()=> {
            const response = await fetch(apiUrl);
            try{
                if(!response.ok){
                    console.log("No Data");
                }
                const result = await response.json();
                setWorldNews(result);
            }catch(err:any){
                console.log(err.message);
            }
        };
        worldNews();

    },[]);*/

    const articles = worldNews?.articles?.slice(0,6) || [];

    return (
        <div>
            <h2
                className="section-title magento col-span-1 md:col-span-2">
                <span>World News</span>
            </h2>
            <div className="worldnews-wrapper flex flex-col gap-15">

            <Swiper
                className="w-full" 
                slidesPerView={1} 
                navigation={true} 
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true
                }}
            >
            {articles.map((news, index)=>(
                <SwiperSlide className="pb-10">
                <div key={index} className="text-white">
                    {news.urlToImage && (
                        <div className="w-[285px] h-[135px] overflow-hidden md:w-[90%] md:h-[215px]">
                            <img src={news.urlToImage} className="object-center"/>
                        </div>
                    )}
                    
                    <h3 className="text-bold py-2 text-[#e4ffbc]">{news?.title}</h3>
                    <div className="">{news.description}</div>
                    <a href={news.url} className="block text-[#1fe802] mt-5 hover:text-[#fff]">Read more &gt;&gt;</a>
                    <div>Published at { dateFormat(news.publishedAt) }</div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
            </div>
         
        </div>
    )
}

export default WorldNews