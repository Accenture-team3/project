import {Map} from '@vis.gl/react-google-maps';


export default function SimpleMap()
{
  return (<Map
    style={{width: '50vw', height: '50vh'}}
    defaultCenter={{lat: 22.54992, lng: 0}}
    defaultZoom={3}
    gestureHandling={'greedy'}
    disableDefaultUI={true}
  />)
}