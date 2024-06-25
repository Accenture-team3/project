import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import getGeolocation from "@/utils/getGeolocation";

import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getGeolocation();
        setLocation(loc);
      } catch (e) {
        console.error("Couldn't fetch geolocation", e);
      }
    };

    fetchLocation();
  }, []);


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {location ? (
            <div>
              <p>Lat: {location.lat}</p>
              <p>Lon: {location.lng}</p>
            </div>
          ) : (
            <p>Fetching your location...</p>
          )}
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
              Review next steps of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
