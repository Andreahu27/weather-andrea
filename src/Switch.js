import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useContextGlobal } from "./Context";

export default function ControlledSwitches() {
    const {search, setSearch, citiesList, handleSubmit, isDisplaying,
         setIsDisplaying, weatherData, localTime, setLocalTime} = useContextGlobal()



  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={() => {
        setChecked(prevV => !prevV)
        setLocalTime(prevV => !prevV)
      }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

const NightmodeSwitch = () => {

    const {nightChecked, setNightChecked} = useContextGlobal()


  const handleChange = (event) => {
    setNightChecked(event.target.nightChecked);
  };

  return (
    <Switch
      checked={nightChecked}
      onChange={() => {
        setNightChecked(prevV => !prevV)
        console.log(nightChecked)
      }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

export {NightmodeSwitch}
