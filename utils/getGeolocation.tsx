import axios from 'axios';

const GEOLOCATION_URL = "https://www.googleapis.com/geolocation/v1/geolocate"


const getGeolocation = async () => {
    try {
        const response = await axios.post(GEOLOCATION_URL, null, {
            params: {
                key: "AIzaSyDchgXWQXFoyAd7bgNKyvGgthMUU1KTCss",
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