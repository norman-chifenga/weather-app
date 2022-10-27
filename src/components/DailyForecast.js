const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

//get weather forecasts for other days
export const DailyForecast = (props) => {
    const { main, weather } = props.weatherData;
    let date = new Date(props.weatherData.dt * 1000);
    return (
        <li
            key={Math.random()}
            style={{ background: "rgba(255, 255, 255, 0.3)" }}
            className="h-fit  text-white mt-10 mx-9 rounded-lg w-fit p-10"
        >
            <p>
                <span>{date.getUTCDate()}-</span>
                <span>{weekday[date.getUTCDay()]}</span>
            </p>
            <p>
                <img
                    className="min-h-[3em] inline"
                    src={
                        process.env.REACT_APP_ICON_URL + props.icon[props.index]
                    }
                    alt=""
                />
            </p>
            <p className="text-lg font-bold">{Math.trunc(main.temp)}&deg;C</p>
            <p> {weather[0].main}</p>
        </li>
    );
};
