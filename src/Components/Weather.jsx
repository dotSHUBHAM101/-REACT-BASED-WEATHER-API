import React, { useRef, useState } from 'react'
import './Weather.css'
import useFetch from '../Custom_hooks/useFetch';


// Icons
import CloudIcon from '../assets/cloud_icon.png'
import RainIcon from '../assets/wind_icon.png' 
import SnowIcon from '../assets/snow_icon.png'
import HumidityIcon from '../assets/humidity_icon.png'
import WindIcon from '../assets/wind_icon.png'
import ClearIcon from '../assets/clear_icon.png'
import SearchBtn from '../assets/searchBtn.png'

const app_id = `64cc3e30b536e56788ce9a3d7d600f02`;

const Weather = () => {



    const [city, setCity] = useState('');
    const [activeCity, setActiveCity] = useState('');


    const inputRef = useRef(null)


    // The hook only triggers when activeCity changes (on button click)
    const { data } = useFetch(
        activeCity 
        ? `https://api.openweathermap.org/data/2.5/weather?q=${activeCity}&units=metric&appid=${app_id}` 
        : null
    );

    // Logic to switch icons based on weather condition
const icons = {
    Clouds: CloudIcon,
    Rain: RainIcon,
    Drizzle: RainIcon,
    Snow: SnowIcon,
    Clear: ClearIcon,
};

const getWeatherIcon = (main) => icons[main] || ClearIcon;


    const handleSearch = () => {
        if (city.trim() !== "") {
            setActiveCity(city);
            inputRef.current.style.color = 'blue'
        }

        console.log(data);
        inputRef.current?.focus();
        

        if(data.name){
            inputRef.current.style.color = 'blue'
        }
        else{
            alert('Enter a valid city name ')
            inputRef.current.style.color = 'red'
            return
        }
    };

    return (
        <div className='weather'>
            <div className='search_bar'>
                <input 
                    ref={inputRef}
                    className='input_box'
                    type='text' 
                    placeholder='Enter city name...' 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch} className='searchBtn'><img src = {SearchBtn} /></button>
            </div>

            
            {data && data.main ? (
                <>
                    <img 
                        style={{width : '200px', marginTop : '20px'}} 
                        src={getWeatherIcon(data.weather[0].main)} 
                        alt='weather_icon'
                    />
                    
                    <p className='temperature' style={{fontWeight : 'bolder' , color : 'white'}}>
                        {Math.floor(data.main.temp)}°C
                    </p>

                    <h2 className='location' style={{color : 'white'}}>
                        {data.name}
                    </h2>

                    <div className='weather_data'>
                        <div className='col1'>
                            <img style={{width : '50px'}} src={HumidityIcon} alt='humidity'/>
                            <div>
                                <p style={{color : 'white'}}>{data.main.humidity}%</p>
                                <p style={{color : 'white'}}>Humidity</p>
                            </div>
                        </div>

                        <div className='col2'>
                            <img style={{width : '50px'}} src={WindIcon} alt='wind'/>
                            <div>
                                <p style={{color : 'white'}}>{data.wind.speed} km/h</p>
                                <p style={{color : 'white'}}>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                activeCity && <p style={{color: 'white', marginTop: '20px'}}> City Not Found...</p>
            )}

            {!activeCity && (
                <p style={{color: 'white', marginTop: '20px'}}>Search for a city to see the weather!</p>
            )}
        </div>
    )
}

export default Weather;
