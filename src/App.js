import { useContextGlobal } from "./Context";
import Home from "./Home"
import Weather from "./Weather";

const apiKey = process.env.REACT_APP_API_KEY

    


function App() {

  const {search, setSearch, citiesList, handleSubmit, isDisplaying, setIsDisplaying, weatherData} = useContextGlobal()





  return (

    <>

    <Home />

    {isDisplaying && (<Weather />)
    
    }

  </>


  )


}

export default App;

export {apiKey}
