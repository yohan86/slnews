import {useState, useEffect} from "react";

type WeatherData = {
    location: {
        name:string;
    };
    current: {
        temp_c:number;
        condition: {
            text:string;
            icon:string;
        };
    };
};

const Weather=()=> {
    const [city, setCity] = useState<string>('Colombo');
    const [weather, setWeather] = useState<WeatherData | null>();
    const key ="3c1f204f0c184a418d5171333250507";
    const apiUrl = "http://api.weatherapi.com/v1/current.json?key="+key+"&q="+city;

    useEffect(()=> {
        const fetchData = async ()=> {
            try{
                const response = await fetch(apiUrl);
                if(!response.ok){
                    console.log("No fetch data");
                }
                const result = await response.json();
                setWeather(result);
            }catch(er){
                console.log(er);
            }
        };
        fetchData();
    }, []);

  return (
    <div className="weather-blk">
        <h2 className="text-white py-5">WEATHER</h2>
        
            {weather ? (
                <div className="flex flex-col text-white items-center">
                    {weather?.current?.condition?.icon && (
                        <div><img src={`https:${weather.current.condition.icon}`} /></div>
                    )}
              
                    <div className="temp text-[30px] text-[#f4e50a]">{weather.current.temp_c} <span className="text-[20px]"><sup>0</sup>C</span></div>
                    <h4>{weather.current.condition.text}</h4>
                    <div className="city text-[25px]">{weather.location.name}</div>
                </div>
            ):(
                <div>Loading...</div>
            )}
        
    </div>
  )
}

export default Weather