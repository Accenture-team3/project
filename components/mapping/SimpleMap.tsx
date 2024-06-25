import {Map} from '@vis.gl/react-google-maps';


export default function SimpleMap()
{
  return (<Map
    style={{width: '50vw', height: '50vh'}}
    defaultCenter={{lat: -36.875461, lng: 174.763336}}
    defaultZoom={12}
    gestureHandling={'greedy'}
    disableDefaultUI={true}
  />)
}