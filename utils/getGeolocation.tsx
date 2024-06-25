import axios from 'axios';

const GEOLOCATION_URL = "https://www.googleapis.com/geolocation/v1/geolocate"


const getGeolocation = async () => {
    try {
        const response = await axios.post(GEOLOCATION_URL, null, {
            params: {
                key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            },
        });

        const {location} = response.data;
        return location;
    } catch (e) {
        console.log(e);
        throw new Error("Couldn't fetch geolocation", );
    }
};

export default getGeolocation;