import { useState } from "react";
interface Props {
  setDestination: (value: string) => void;
}

export default function DestinationField(props: Props)
{
  const {setDestination} = props;
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const handleChange = (event: any) => {
    setSearchBoxValue(event.target.value)
  }
  const handleSearch = () => {
    setDestination(searchBoxValue);
  }
  return (
    <>
      <p>{searchBoxValue}</p>
      <input onChange={handleChange}></input><button onClick={handleSearch}></button>
      
    </>
  )
}