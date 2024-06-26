import { useState } from "react";

interface Props {
  setDestination: (value: string) => void;
}

export default function SearchBox(props: Props) {
  const { setDestination } = props;
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const handleChange = (event: any) => {
    setSearchBoxValue(event.target.value);
  };
  const handleSearch = () => {
    setDestination(searchBoxValue);
  };
  return (
    <div className="absolute top-0 left-0 w-full bg-purple-700 p-3">
      <div className="relative mb-4">
        <h1 className="text-white text-2xl">Search Destination</h1>
        <div className="absolute top-0 right-0 bg-purple-700 text-white p-2 rounded-full">
          <i className="bi bi-bell-fill text-xl"></i>
        </div>
      </div>
      <div className="flex items-center w-full p-2  ">
        <input
          onChange={handleChange}
          className="w-full p-4 outline-none rounded-full"
          placeholder="Enter destination"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-transparent border-none"
        >
          <i className="bi bi-search text-white text-2xl"></i>
        </button>
      </div>
    </div>
  );
}