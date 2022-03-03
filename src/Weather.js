import { useContextGlobal } from "./Context";
import { FaHandHoldingWater } from "react-icons/fa"
import { WiHumidity, WiThermometer, WiCloudy, WiSunrise, WiSunset, WiDirectionDownRight, WiWindy, WiRaindrops } from "react-icons/wi"
import ControlledSwitches from "./Switch";

const Weather = () => {

    const {search, setSearch, citiesList, handleSubmit, isDisplaying,
         setIsDisplaying, weatherData, localTime, setLocalTime, handleSubmitLocal, nightChecked} = useContextGlobal()

    const sunriseHours = new Date (weatherData.current.sunrise *1000).getHours()
    const sunriseHoursString = String(sunriseHours).padStart(2, "0")

    const sunriseMinutes = new Date (weatherData.current.sunrise *1000).getMinutes()
    const sunriseMinutesString = String(sunriseMinutes).padStart(2, "0")

    const sunriseTime = sunriseHoursString + ":" + sunriseMinutesString

    const sunsetHours = new Date (weatherData.current.sunset *1000).getHours()
    const sunsetHoursString = String(sunsetHours).padStart(2, "0")

    const sunsetMinutes = new Date (weatherData.current.sunset *1000).getMinutes()
    const sunsetMinutesString = String(sunsetMinutes).padStart(2, "0")

    const sunsetTime = sunsetHoursString + ":" + sunsetMinutesString

    const getTimeFromNum = (num) => {
        const minutesNum = new Date (num *1000).getMinutes()
        const minutesOut = String(minutesNum).padStart(2, "0")
        const HoursNum = new Date (num *1000).getHours()
        const HoursOut = String(HoursNum).padStart(2, "0")
        return (HoursOut +":" +minutesOut )
    }

    const getDateFromNum = (num) => {
        const day = new Date (num *1000).getDay()
        const dayObj = {1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun"}
        const dayOut = dayObj[day]
        const DateNum = new Date (num *1000).getDate()
        const dateOut = String(DateNum).padStart(2, "0")
        const monthNum = new Date (num *1000).getMonth()
        const monthOut = String(monthNum + 1).padStart(2, "0")
        return (dayOut + " " + dateOut +"/" +monthOut )
    }






    return (
    <>

    <div className={nightChecked ? "current-weather dark-blue" : "current-weather"}>
        <div className="cw-header">
            <h1 className={nightChecked ? "header light-blue-color" : "header"}>Current weather</h1>
        </div>

        <div className="cw-main">

            <div className="cw-summary">
                <h2 className={nightChecked ? "light-blue-color" : "null"}>{weatherData.data.name}, {weatherData.data.sys.country}</h2>
                <p>{localTime ? getTimeFromNum(weatherData.current.dt + weatherData.timezone_offset - 3600)
                : getTimeFromNum(weatherData.current.dt)
                }</p>



                <p>Local time: </p>
                <ControlledSwitches/>

                
                {/* <p>{localTime ? (weatherData.timezone) : "Europe"}</p> */}
            </div>

            <div className="icon-and-temp">
                {/* <img className="cw-icon" src={("http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png")} alt="xx" /> */}
                <img className="cw-icon" src={require(`./assets/IMGs/${weatherData.current.weather[0].icon}.png`)} alt="xx" />
                {/* <img className="cw-icon" src={require(`./assets/IMGs/04d.png`)} alt="xx" /> */}
                    <div className="dec-and-curr-temp">
                        <div className={nightChecked ? "description gray-color" : "description"}   >{weatherData.current.weather[0].description}</div>
                        <div className={nightChecked ? "cw-curr-temp light-blue-color" : "cw-curr-temp"}>{Math.round(weatherData.current.temp *10)/10} °C</div>
                    </div>    
            </div>

            <div className={nightChecked ? "cw-details gray-color" : "cw-details"}>
                <div className="cw-det-sec"><WiThermometer className="icon-small"/><p>Feels like: {Math.round(weatherData.current.feels_like *10)/10} °C</p></div>
                <div className="cw-det-sec"><WiHumidity className="icon-small"/><p>Humidity: {weatherData.current.humidity}%</p></div>
                <div className="cw-det-sec"><WiCloudy className="icon-small"/><p>Clouds: {weatherData.current.clouds}%</p></div>
                <div className="cw-det-sec"><WiSunrise className="icon-small"/><p>Sunrise: {sunriseTime}</p></div>
                <div className="cw-det-sec"><WiSunset className="icon-small"/><p>Sunset: {sunsetTime}</p></div>
                { weatherData.current.rain === undefined ? null :(
                    <div
                    className="cw-det-sec"><WiRaindrops className="icon-small"/>
                    <p>
                    Rain last hour: {weatherData.current.rain["1h"]}mm
                    {/* aaa {"Rain last hour: " + {weatherData.current.rain["1h"]} + "mm"} */}
                    </p>
                    </div>
                    )}
                <div className="cw-det-sec"><WiDirectionDownRight className="icon-small"/><p>UVI index: {weatherData.current.uvi}</p></div>
                <div className="cw-det-sec"><WiWindy className="icon-small"/><p>Wind speed: {Math.round(weatherData.current.wind_speed * 3.6 *10)/10} km/h</p></div>
            </div>
        </div>

    </div>


    <div className={nightChecked ? "hourly-weather dark-blue" : "hourly-weather"}>
        <div className="hr-header">
            <h1 className={nightChecked ? "header light-blue-color" : "header"} >Next 24 hours</h1>
        </div>

        <div className="hourly-container">
                    {weatherData.hourly.slice(0,24).map((hour, idx) => {
                        return (
                    <div className="hour-card" key={idx}>
                            <p>{localTime ? getTimeFromNum(hour.dt+ weatherData.timezone_offset - 3600) : getTimeFromNum(hour.dt)}</p>
                        {/* <img className="hour-icon" src={"http://openweathermap.org/img/wn/" + hour.weather[0].icon + "@2x.png"} alt="xx" /> */}
                        <img className="hour-icon" src={require(`./assets/IMGs/${hour.weather[0].icon}.png`)} alt="xx" />
                        <p>{Math.round(hour.temp *10)/10}°C</p>
                        <p>{hour.weather[0].description}</p>

                    </div>
                        )
                    })
                    }
        </div>
    </div>

    


    <div className={nightChecked ? "hourly-weather daily-weather dark-blue" : "hourly-weather daily-weather" }>
        <div className="hr-header">
            <h1 className={nightChecked ? "header light-blue-color" : "header"}>Next 7 days</h1>
        </div>

        <div className="hourly-container">
                    {weatherData.daily.map((day, idx) => {
                        return (
                    <div className="hour-card" key={idx}>
                            <p>{getDateFromNum(day.dt)}</p>
                        {/* <img className="hour-icon" src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png"} alt="xx" /> */}
                        <img className="hour-icon" src={require(`./assets/IMGs/${day.weather[0].icon}.png`)} alt="xx" />
                        <p>{Math.round(day.temp.min *10)/10} | {Math.round(day.temp.max *10)/10} °C</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                        )
                    })
                    }
        </div>

    </div>

    {console.log(weatherData)}










    </>
    )
}

export default Weather