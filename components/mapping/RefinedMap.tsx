import { Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Location } from '@/types/Location';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';
interface Props {
  location: Location | undefined;
}
export default function RefinedMap(props: Props)
{
  const { location } = props;
  const [destination, setDestination] = useState("");
  const destinationIsSet = (destination != "");
  if (location) 
    return (
    <>
    <Map
      style={{width: '50vw', height: '50vh'}}
      defaultCenter={{lat: location.latitude, lng: location.longitude}}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      >
      {destinationIsSet && <Directions lat={location.latitude} lng={location.longitude} dest={destination}/>}
      </Map>
      <SearchBox setDestination={setDestination} />
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
  const [carResponse, setCarResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [busResponse, setBusResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [walkResponse, setWalkResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [transportMode, setTransportMode] = useState<google.maps.DirectionsResult | null>(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = transportMode?.routes[routeIndex];
  const leg = selected?.legs[0];


  // Switch transport modes
  const handleCar = () => {
    setTransportMode(carResponse);
  }
  const handleBus = () => {
    setTransportMode(busResponse);
  }
  const handleWalk = () => {
    setTransportMode(walkResponse);
  }


  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map, dest]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: {lat: lat, lng: lng},
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        setCarResponse(response);
      });    
      
    directionsService
      .route({
        origin: {lat: lat, lng: lng},
        destination: dest,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true
      })
      .then(response => {
        setBusResponse(response);
      });

    directionsService
      .route({
        origin: {lat: lat, lng: lng},
        destination: dest,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      })
      .then(response => {
        setWalkResponse(response);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, dest, lat, lng]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setDirections(transportMode);
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, transportMode]);

  //if (!leg) 
    return (    
    <div className="results-container">
      <div className="result">
        <button style={{backgroundColor: "red"}} onClick={handleCar}></button>
        <span>Drive</span>
        <span>Distance: {carResponse?.routes[0].legs[0].distance?.text}</span>
        <span>Duration: {carResponse?.routes[0].legs[0].duration?.text}</span>
      </div>
      <div className="result">
        <button style={{backgroundColor: "green"}} onClick={handleBus}></button>
        <span>Bus</span>
        <span>Distance: {busResponse?.routes[0].legs[0].distance?.text}</span>
        <span>Duration: {busResponse?.routes[0].legs[0].duration?.text}</span>
      </div>
      <div className="result">
        <button style={{backgroundColor: "blue"}} onClick={handleWalk}></button>
        <span>Walk</span>
        <span>Distance: {walkResponse?.routes[0].legs[0].distance?.text}</span>
        <span>Duration: {walkResponse?.routes[0].legs[0].duration?.text}</span>
      </div>
    </div>);

}

