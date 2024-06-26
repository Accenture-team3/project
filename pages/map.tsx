import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import getGeolocation from "@/utils/getGeolocation";
import type { Schema } from "@/amplify/data/resource";
import type { Location } from "@/types/Location";
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
          </div>
        </main>
      )}
    </Authenticator>
  );
}
