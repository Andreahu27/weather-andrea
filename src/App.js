import { useContextGlobal } from "./Context";
import Home from "./Home"
import Weather from "./Weather";
import Error from "./Error";

const apiKey = process.env.REACT_APP_API_KEY

    


function App() {

  const {search, setSearch, citiesList, handleSubmit, isDisplaying, setIsDisplaying, weatherData, isError} = useContextGlobal()





  return (

    <>

    <Home />

    {isDisplaying && (!isError) && (<Weather />)
    
    }

    {isError && (<Error />)}

  </>


  )


}

export default App;

export {apiKey}
