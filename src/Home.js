import { useContextGlobal } from "./Context";
import { FaSearch, FaThermometerHalf, FaMapMarkerAlt } from "react-icons/fa"
import {NightmodeSwitch} from "./Switch"

const Home = () => {




    const {search, setSearch, citiesList, handleSubmit, isDisplaying, setIsDisplaying, 
          weatherData, setisCitySelected,handleSubmitLocal,
          nightChecked, setNightChecked} = useContextGlobal()


 

  

    



    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const error = (err) => {
      console.log(err)
    }

    return (
    <>

    <div className={nightChecked ? "home-form black-background" : "home-form"} >



    <div className="title">
      <h1 className={nightChecked ? "light-blue-color" : "null"}>Weather app </h1>
      <div className="night-switch">
        <p className={nightChecked ? "gray-color" : "null"} >Night<br/>mode</p>
        <NightmodeSwitch/>
    </div>

    </div>

    




    

        


 

    <form >

      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder="Search location..."
        className={nightChecked ? "dark-blue" : "null"}
      />

      <button className="search-btn" onClick={(e) => {
        e.preventDefault()
        handleSubmit()
        }
      }>
      <FaSearch className="search-icon"/>
      </button>

      <button className="search-btn geo-btn" onClick={(e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(handleSubmitLocal, error, options)
  
        }
      }>
      <FaMapMarkerAlt className="search-icon"/>
      </button>

    </form>

          <div className="city-suggestions">

      {search.length >0  && (
        citiesList
        .filter(city => city.toLowerCase().includes(search))
        .slice(0,6).map((city, idx) => {
        return (
          <div key={idx}
          className={nightChecked ? "city-selection dark-city-sugg" : "city-selection"}
          onClick= {() => {
          setSearch(city)
          setisCitySelected(prevVal => !prevVal)


          }}
          >{city}</div>
        )
      }))}
      </div>

    </div>

    </>)

}

export default Home