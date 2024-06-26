import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import getGeolocation from "@/utils/getGeolocation";
import type { Schema } from "@/amplify/data/resource";
import type { Location } from "@/types/Location";
import SimpleMap from "@/components/mapping/SimpleMap";
import { APIProvider } from "@vis.gl/react-google-maps";

const client = generateClient<Schema>();

const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=026ea7877a22ff3a2dd720539706c117&units=metric`);
  const data = await response.json();
  return data;
};

const setWeatherIcon = async (id: string) => {
  const response = await fetch(`https://openweathermap.org/img/wn/${id}@2x.png`);
  const data = await response.blob();
  return URL.createObjectURL(data);
};

export default function App() {
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherIcon, setWeatherIconUrl] = useState<string | undefined>(undefined);

  const MAP_API_KEY = process.env.NEXT_PUBLIC_GMAPS_JS_API_KEY;

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
        <main className="container mx-auto p-4">
          {MAP_API_KEY ? (
            <APIProvider apiKey={MAP_API_KEY}>
              <SimpleMap location={location} />
            </APIProvider>
          ) : (
            <p className="text-red-500">Unable to find API key to load Google Maps</p>
          )}
          {location ? (
            <div className="flex flex-col items-center mt-4">
              <div className="weather-container bg-gray-100 rounded-lg shadow-md p-4">
                <h2 className="weather-title text-2xl font-bold mb-4">Today's Weather</h2>
                <div className="flex justify-center items-center space-x-4">
                  <span className="temperature text-3xl font-bold">{weatherData?.main.temp}°C</span>
                  <div className="flex flex-col items-center">
                    <span className="weather-desc capitalize text-lg">{weatherData?.weather[0].description}</span>
                    {weatherIcon && <img id="weather-icon" src={weatherIcon} alt="Weather Icon" className="w-16 h-16 mt-2" />}
                  </div>
                  <span className="wind text-lg">Wind: {weatherData?.wind.speed} kph</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-lg">Fetching your location...</p>
          )}
          <div className="mt-6 text-lg">
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/" className="text-blue-500 underline">Review next steps of this tutorial.</a>
          </div>
          <button onClick={signOut} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
