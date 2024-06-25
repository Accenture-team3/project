import {Map} from '@vis.gl/react-google-maps';
import { Location } from '@/types/Location';
interface Props {
  location: Location | undefined;
}
export default function SimpleMap(props: Props)
{
  const { location } = props;

  if (location) 
    return (<Map
      style={{width: '50vw', height: '50vh'}}
      defaultCenter={{lat: location.latitude, lng: location.longitude}}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />)
  else {
    return (<p>Waiting for user location...</p>)
  }
}