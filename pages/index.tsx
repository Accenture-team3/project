import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import getGeolocation from "@/utils/getGeolocation";
import type { Schema } from "@/amplify/data/resource";
import type { Location } from "@/types/Location";
import SimpleMap from "@/components/mapping/SimpleMap";
import Weekly from "@/components/mapping/Weekly"
import RaffleTicket from "@/components/RaffleTicket";
import Alert from "@/components/Alert";
import RefinedMap from "@/components/mapping/RefinedMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=026ea7877a22ff3a2dd720539706c117&units=metric`
  );
  const data = await response.json();
  return data;
};

const setWeatherIcon = async (id: string) => {
  const response = await fetch(
    `https://openweathermap.org/img/wn/${id}@2x.png`
  );
  const data = await response.blob();
  return URL.createObjectURL(data);
};

export default function App() {
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherIcon, setWeatherIconUrl] = useState<string | undefined>(
    undefined
  );


  const MAP_API_KEY = process.env.NEXT_PUBLIC_GMAPS_UNRESTRICTED;
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getGeolocation();
        setLocation(loc);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const getWeatherData = async () => {
        const data = await fetchWeather(location.latitude, location.longitude);
        setWeatherData(data);
        const iconUrl = await setWeatherIcon(data.weather[0].icon);
        setWeatherIconUrl(iconUrl);
      };
      getWeatherData();
    }
  }, [location]);

  return (
    <Authenticator>
      {({ signOut, user }) => (

        <main>
          <div
            style={{ display: "flex", gap: "0.25rem", flexDirection: "row" }}
          >
            {MAP_API_KEY ? (
              <APIProvider apiKey={MAP_API_KEY}>
                <RefinedMap location={location} />
              </APIProvider>
            ) : (
              <p>Unable to find API key to load Google Maps</p>
            )}
            <RaffleTicket />
            <Alert />
          </div>
          {location ? (
            <>
              <div>
                <p>Lat: {location.latitude}</p>
                <p>Lon: {location.longitude}</p>
              </div>
              {weatherData && (
                <div className="flex justify-center lg:items-center mt-5 flex lg:ml-4 lg:mt-0">
                  <div className="sm:pr-4 flex justify-center">
                    <span className="temperature">
                      {weatherData.main.temp}°C
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="weather-desc capitalize">
                      {weatherData.weather[0].description}
                    </span>
                    {weatherIcon && (
                      <img
                        id="weather-icon"
                        src={weatherIcon}
                        alt="Weather Icon"
                        className="w-16 h-16 mt-2"
                      />
                    )}
                      />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <span className="wind">
                      Wind: {weatherData.wind.speed} kph
                    </span>

                  </div>
                  <span className="wind text-lg">
                    Wind: {weatherData?.wind.speed} kph
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-lg">Fetching your location...</p>
          )}
          <div className="mt-6 text-lg">
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a
              href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/"
              className="text-blue-500 underline"
            >
              Review next steps of this tutorial.
            </a>
          </div>
          <button
            onClick={signOut}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Sign out
          </button>
          <Weekly />
        </main>
      )}
    </Authenticator>
  );
}
