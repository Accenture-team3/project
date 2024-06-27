import { Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { useSearchParams } from 'next/navigation';
import { Location } from '@/types/Location';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';
import WeeklyFront from './WeeklyFront';
interface Props {
  location: Location | undefined;
}
export default function RefinedMap(props: Props)
{
  const searchParams = useSearchParams();
  const stringDest = searchParams.get("location");

  const { location } = props;

  const [destination, setDestination] = useState<string | null>();
  useEffect(() => {
    setDestination(stringDest);
  }, [stringDest])

  const destinationIsSet = (destination != null);

  if (location) 
    return (
    <div className="flex flex-col"> 
    <SearchBox setDestination={setDestination} />
    <Map
      style={{width: '100vw', height: '85vh'}}
      defaultCenter={{lat: location.latitude, lng: location.longitude}}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      >
      {destinationIsSet && <Directions lat={location.latitude} lng={location.longitude} dest={destination}/>}
      </Map>
      {!destinationIsSet && <WeeklyFront />}
 
    </div >)
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
        directionsRenderer.setDirections(response)
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
    
    setTransportMode(null)
    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, dest, lat, lng]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setDirections(transportMode);
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, transportMode]);

  if (transportMode == null)
    return (    
    <div className="absolute bottom-[126px] bg-white w-full rounded-t-3xl drop-shadow-[0_-5px_5px_rgba(0,0,0,0.25)]">
      <button className="grid grid-cols-5 gap-4 bg-white text-black w-full rounded-t-3xl items-center" onClick={handleCar}>
      <i className="bi bi-car-front-fill col-span-1 text-purple-700 text-4xl text-center "></i>
      <div className="col-span-3 ">
          <div>{dest}</div>
          <div className='text-gray-600'>Distance: {carResponse?.routes[0].legs[0].distance?.text}</div>
          <div className='text-gray-600'>Duration: {carResponse?.routes[0].legs[0].duration?.text}</div>
        </div>
        <div
          className={`col-span-1 text-purple-700 text-center flex flex-col items-center`}
        >
          <i className="bi bi-ticket-fill text-2xl mb-1"></i>
          <span>x1</span>
        </div>
      </button>
      <button className="grid grid-cols-5 gap-4 bg-white text-black w-full rounded-t-3xl items-center" onClick={handleBus}>
      <i className="bi bi-bus-front-fill col-span-1 text-purple-700 text-4xl text-center "></i>
      <div className="col-span-3 ">
          <div>{dest}</div>
          <div className='text-gray-600'>Distance: {busResponse?.routes[0].legs[0].distance?.text}</div>
          <div className='text-gray-600'>Duration: {busResponse?.routes[0].legs[0].duration?.text}</div>
        </div>
        <div
          className={`col-span-1 text-purple-700 text-center flex flex-col items-center`}
        >
          <i className="bi bi-ticket-fill text-2xl mb-1"></i>
          <span>x2</span>
        </div>
      </button>
      <button className="grid grid-cols-5 gap-4 bg-white text-black w-full rounded-t-3xl items-center" onClick={handleWalk}>
        <i className="bi bi-person-walking col-span-1 text-purple-700 text-4xl text-center "></i>
        <div className="col-span-3 ">
          <div>{dest}</div>
          <div className='text-gray-600'>Distance: {walkResponse?.routes[0].legs[0].distance?.text}</div>
          <div className='text-gray-600'>Duration: {walkResponse?.routes[0].legs[0].duration?.text}</div>
        </div>
        <div
          className={`col-span-1 text-purple-700 text-center flex flex-col  justify-center  items-center`}
        >
          <i className="bi bi-ticket-fill text-2xl mb-1"></i>
          <span>x3</span>
        </div>
      </button>
    </div>);

  return (<></>)
}

