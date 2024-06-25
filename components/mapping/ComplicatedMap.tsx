import { Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Location } from '@/types/Location';
import DestinationField from './DestinationField';
import { useState, useEffect } from 'react';
interface Props {
  location: Location | undefined;
}
export default function ComplicatedMap(props: Props)
{
  const { location } = props;
  const [destination, setDestination] = useState("");
  const destinationIsSet = (destination != "");
  if (location) 
    return (
    <>
    <p>Dest value: {destination}</p>
    <DestinationField setDestination={setDestination} />
    <Map
      style={{width: '50vw', height: '50vh'}}
      defaultCenter={{lat: location.latitude, lng: location.longitude}}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      >
      
      {destinationIsSet && <Directions lat={location.latitude} lng={location.longitude} dest={destination}/>}
      </Map>
    </>)
  else {
    return (<p>Waiting for user location...</p>)
  }
}

interface DirectionProps {
  lat: number;
  lng: number;
  dest: string;
}
function Directions(props: DirectionProps) {
  const {lat, lng, dest} = props;
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: {lat: lat, lng: lng},
        destination: dest,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}