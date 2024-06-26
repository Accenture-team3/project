import { useState } from "react";
interface Props {
  setDestination: (value: string) => void;
}

export default function SearchBox(props: Props)
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
    <div className="search-container">

      <input onChange={handleChange} className="search-box"></input>
      <button onClick={handleSearch} className="search-button"></button>
      
    </div>
  )
}