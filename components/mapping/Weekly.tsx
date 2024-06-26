import React from "react";
import WeeklyCard from "@/components/mapping/WeeklyCard"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Place {
  title: string;
  description: string;
  imageUrl: string;
  location: string
}

const places: Place[] = [
  {
    title: "Sky Tower",
    description:
      "The Sky Tower is a telecommunications and observation tower in Auckland, New Zealand. Located at the corner of Victoria and Federal Streets within the city's CBD, it is 328 metres (1,076 ft) tall, as measured from ground level to the top of the mast, making it the second tallest freestanding structure in the Southern Hemisphere, surpassed only by the Autograph Tower in Jakarta, Indonesia, and the 28th tallest tower in the world.",
    imageUrl: "/skytower.jpg",
    location: "Victoria Street West, Auckland CBD"
  },
  {
    title: "Parnell Garden",
    description:
      "This is another telecommunications and observation tower located in a different part of the city.",
    imageUrl: "/garden.jpg",
    location: "Parnell, Auckland CBD"
  },
];

const Weekly: React.FC = () => {
  return (
    <div className="border-red-500 border-solid border-2 flex flex-col mt-20">
      {places.map((place, index) => (
        <WeeklyCard
          key={index}
          title={place.title}
          description={place.description}
          imageUrl={place.imageUrl}
          location={place.location}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default Weekly;
