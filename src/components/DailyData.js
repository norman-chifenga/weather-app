const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

//get and display todays weather data
export const DailyData = (props) => {
    let date = new Date(props.weatherData[0].dt * 1000);
    const { clouds, main, weather } = props.weatherData[0];

    return (
        <div
            style={{ background: "rgba(255, 255, 255, 0.3)" }}
            className="flex-cols p-5 sm:flex text-white mx-auto rounded-sm py-[1.5em] items-center justify-around w-[80%] h-fit mt-[2em]"
        >
            <div className="">
                <p>
                    {" "}
                    <span>{props.city[0]}</span> <br />{" "}
                </p>
                <p>
                    {" "}
                    <span className="font-bold text-lg">
                        {props.city[1]}
                    </span>{" "}
                </p>
                <p>
                    <span>{date.getUTCDate()}-</span>
                    <span>{weekday[date.getUTCDay()]}-</span>
                    <span>{date.getUTCFullYear()}</span>
                </p>
            </div>

            <div className="py-10 sm-py-0">
                <p>
                    <img
                        className="min-h-[3em] inline"
                        src={process.env.REACT_APP_ICON_URL + props.dailyIcon}
                        alt="icon"
                    />
                </p>
                <p className="text-lg font-bold">
                    {Math.trunc(main.temp)}&deg;C
                </p>
                <p>{weather[0].main}</p>
            </div>

            <div>
                <p>Humidity: {main.humidity}%</p>
                <p>Cloud Cover: {clouds.all}%</p>
                <p>Min Temp: {Math.trunc(main.temp_min)}&deg;C</p>
                <p>Max Temp: {Math.trunc(main.temp_max)}&deg;C</p>
            </div>
        </div>
    );
};
