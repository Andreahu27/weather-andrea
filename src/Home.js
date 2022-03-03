import { useContextGlobal } from "./Context";
import { FaSearch, FaThermometerHalf, FaMapMarkerAlt } from "react-icons/fa"
import {NightmodeSwitch} from "./Switch"

const Home = () => {




    const {search, setSearch, citiesList, handleSubmit, isDisplaying, setIsDisplaying, 
          weatherData, setisCitySelected,handleSubmitLocal,isLoading, setIsLoading,
          nightChecked, setNightChecked, handleClickLocal} = useContextGlobal()


 

  

    

    if (isLoading) {return (

        <div className={nightChecked ? "home-form black-background" : "home-form"} >



        <div className="title">
          <h1 className={nightChecked ? "light-blue-color" : "null"}>Weather app </h1>
          <div className="night-switch">
            <p className={nightChecked ? "gray-color" : "null"} >Night<br/>mode</p>
            <NightmodeSwitch/>
          </div>
        </div>

        <h1>Loading</h1>

        </div>

    )}



    else {return (
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

      <button className={nightChecked ? "search-btn dark-search-btn" : "search-btn"} onClick={(e) => {
        e.preventDefault()
        handleSubmit()
        }
      }>
      <FaSearch className={nightChecked ? "search-icon dark-search-icon" : "search-icon"}/>
      </button>

      <button className={nightChecked ? "search-btn geo-btn dark-search-btn" : "search-btn geo-btn"}
        onClick={(e) => {

          e.preventDefault()
          handleClickLocal()

  

        //   const options = {
        //     enableHighAccuracy: false,
        //     timeout: 4000,
        //     maximumAge: 0
        //   };

        //   const error = (err) => {
        //     console.log(err)
        //   }
        
        
        // navigator.geolocation.getCurrentPosition(handleSubmitLocal, error, options)

  
        }
      }>
      <FaMapMarkerAlt className={nightChecked ? "search-icon dark-search-icon" : "search-icon"}/>
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
}

export default Home