import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import cityData from "./assets/cities"
import countryToCode from "./assets/countryCodes"
import { apiKey } from './App';




const AppContext = React.createContext()

const AppProvider = ({ children }) => {



    const [citiesList, setCities] = useState([])
    const [search, setSearch] = useState([])
    const [isCitySelected, setisCitySelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLocalRequested, setIsLocalRequested] = useState(0)

    const [localTime, setLocalTime] = useState(false)
    const [nightChecked, setNightChecked] = useState(false);

    const [isDisplaying, setIsDisplaying] = useState(false)
    const [weatherData, setWeatherData] = useState({})

    const getStartingCities = async () => {
        // const res = await axios.get("https://countriesnow.space/api/v0.1/countries")
        // const data = await res.data.data
        // const citiesWorking = cityData.map(obj => obj.cities.map(city => city + ", " + obj.country))
        // const cities = [].concat.apply([], citiesWorking)

        const cities = []

        for (let key in cityData) {
            cityData[key] = cityData[key].map(city => city + ", " + key)
            cities.push(...cityData[key])
        }



        setCities(cities)
    }

    const handleSubmit = async () => {

        if (search.length > 0) {
        setIsLoading(true)

        let query=""
        
        if (search.includes(",")) {
            const country = search.split(",")[1].toLowerCase().replaceAll(" ","")
            const countryCode = countryToCode[country]
            query = (search.split(",")[0]+","+countryCode).replaceAll(' ','%20')
        }

        else {
            query = search.replaceAll(' ','%20')
        }
        
        // const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=335914cdce61ce61b0a1d89e99c3a822&units=metric`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
        const res = await axios.get(url)
        const data = await res.data

        const {lon, lat} = data.coord
        // const urlDetails = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=335914cdce61ce61b0a1d89e99c3a822&units=metric`
        const urlDetails = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const resDetails = await axios.get(urlDetails)
        const dataDetails = await resDetails.data

        setWeatherData({...dataDetails, data})
        setIsDisplaying(true)
        setSearch("")
        setIsLoading(false)
        }
    }


    const handleSubmitLocal = async(pos) => {

        const {coords} = pos;

        const coordObj = {}
        coordObj["lon"] = coords.longitude
        coordObj["lat"] = coords.latitude

        const {lon, lat} = coordObj

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        const res = await axios.get(url)
        const data = await res.data
        
        const urlDetails = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=335914cdce61ce61b0a1d89e99c3a822&units=metric`
        const resDetails = await axios.get(urlDetails)
        const dataDetails = await resDetails.data

        console.log({...dataDetails, data})

        setWeatherData({...dataDetails, data})
        setIsDisplaying(true)
        setSearch("")
        setIsLoading(false)
    }

    const handleClickLocal = async () => {

          const options = {
            enableHighAccuracy: false,
            timeout: 7000,
            maximumAge: 0
          };

          const error = (err) => {
            console.log(err)
          }
                
        navigator.geolocation.getCurrentPosition(handleSubmitLocal, error, options)


        

    }














    useEffect(() => getStartingCities(), [])
    useEffect(() => handleSubmit(), [isCitySelected])
    useEffect(() => {if (isLocalRequested) handleClickLocal()}, [isLocalRequested])


    useEffect(() => {
        nightChecked ? (document.querySelector("html").classList.add("black-html")) : (document.querySelector("html").classList.remove("black-html"))
    }, [nightChecked]
    )

    const name = "Andrea"

        return (
        <AppContext.Provider value={{
            search, setSearch, citiesList, handleSubmit, isDisplaying, setIsDisplaying, 
            weatherData,setisCitySelected, localTime, setLocalTime, handleSubmitLocal,
            nightChecked, setNightChecked, isLoading, setIsLoading, handleClickLocal, setIsLocalRequested
        }}
        >{children}
        </AppContext.Provider>
        )

}




const useContextGlobal = () => {
    return useContext(AppContext)
}

export { AppProvider, useContextGlobal }