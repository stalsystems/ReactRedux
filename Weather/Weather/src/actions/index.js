import axios from 'axios';

const API_KEY = '7685e8e19296c7103288f0cb7405137d';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);
    
    //console.log('Request:', request);

    return {
        type: FETCH_WEATHER,
        payload: request//optional property that goes along with actions that can contain 
        //some additional data that describes this particular the action
    };
}