import "./App.css";
import { useState, useRef } from "react";
import { DailyData } from "./components/DailyData";
import { DailyForecast } from "./components/DailyForecast";
import { BsSearch } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
const API_KEY = process.env.REACT_APP_KEY;

function App() {
    const [weatherData, setWeatherData] = useState([]);
    const locationInput = useRef("");
    const [weatherIcons, setWeatherIcons] = useState([]);
    const [message, setMessage] = useState("search to view data");
    const [city, setCity] = useState(["", ""]);

    //api call
    const getDailyWeather = async (location_) => {
        setMessage("loading...");
        setWeatherData([]);
        let how_to_search =
            typeof location_ === "string"
                ? `q=${location_}`
                : `lat=${location_[0]}&lon=${location_[1]}`;
        const api = `${
            process.env.REACT_APP_URL + how_to_search
        }&exclude=current,hourly,minutely,alerts&units=metric&appid=${API_KEY}`;
        try {
            await fetch(api)
                .then((res) => res.json())
                .then((result) => {
                    if (result.cod === "404") {
                        setMessage("City not found");
                        setWeatherData([]);
                    } else {
                        const list = result.list.filter((item) =>
                            item.dt_txt.includes("00:00:00")
                        );
                        setWeatherData(list);
                        setWeatherIcons(
                            list.map((item) => {
                                return item.weather[0]["icon"] + ".png";
                            })
                        );
                        setCity([result.city.country, result.city.name]);
                    }
                });
        } catch (error) {
            setMessage("search to view data");
            setWeatherData([]);
        }
    };
    //get my current location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                const { latitude, longitude } = location.coords;
                getDailyWeather([latitude, longitude]);
                locationInput.current.value = null;
            });
        } else {
            setMessage("search to view data");
            setWeatherData([]);
        }
    }

    //handle search
    const handleSearch = () => {
        let location_ = locationInput.current.value;
        if (location_ !== "") {
            getDailyWeather(location_);
        } else {
            setWeatherData([]);
            setMessage("Input field is empty");
        }
    };

    return (
        <div className="w-screen bg-cover bg-hero-img bg-fixed min-h-screen ">
            <ul
                style={{ background: "rgba(0,0,0,0.3)" }}
                className="list-none w-full h-14 opacity-1 flex items-center justify-between md:px-10 px-7"
            >
                <li className="text-lg font-bold text-white">WeatherApp</li>
                <li className="text-white">
                    <ImLocation size="1.8rem" onClick={() => getLocation()} />
                </li>
            </ul>

            <div className="flex w-[100%] justify-center   mx-auto margin mt-20">
                <input
                    type="text"
                    ref={locationInput}
                    placeholder="Search a city"
                    className="rounded-tl-lg bg-gray-100 rounded-bl-lg focus:bg-white p-1 text-gray-500 min-w-[40%] outline-none h-10"
                />
                <BsSearch
                    size="12"
                    onClick={() => handleSearch()}
                    className="text-gray-400 bg-gray-100 focus:bg-white  rounded-tr-lg rounded-br-lg p-1 hover:text-black w-9 h-10 outline-none hover:outline-none"
                />
            </div>

            {weatherData.length !== 0 ? (
                <DailyData
                    weatherData={weatherData}
                    city={city}
                    dailyIcon={weatherIcons[0]}
                />
            ) : (
                <div className="mt-[3em] text-center text-white w-[100%]">
                    <p>{message}</p>
                </div>
            )}

            <ul className="list-none flex justify-center pb-10 flex-wrap px-10 items-start">
                {weatherData.map(
                    (item, index) =>
                        index !== 0 && (
                            <DailyForecast
                                key={index}
                                weatherData={item}
                                index={index}
                                icon={weatherIcons}
                            />
                        )
                )}
            </ul>
        </div>
    );
}

export default App;
