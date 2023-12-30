import axios from 'axios';

const fetchWeather=()=>async(dispatch)=>{


let theme="";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        
const apiKey = 'e5ae6b671d291adcd16bbe098d43174f';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        axios.get(apiUrl)
          .then((response) => {
            const currentTemp = response.data.main.temp;
            
            const sunriseTimestamp = response.data.sys.sunrise;
            const sunsetTimestamp = response.data.sys.sunset;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const weatherConditions = response.data.weather;

            // Check for bad weather conditions
            const badWeatherTypes = ['Rain', 'Snow', 'Thunderstorm', 'Fog', 'Haze', 'Dust'];
            for (const weatherCondition of weatherConditions) {
              if (badWeatherTypes.includes(weatherCondition.main)) {
 theme="dark";
                break;
              }
            }

            // Determine whether it's day or night
            if (currentTimestamp >= sunriseTimestamp && currentTimestamp <= sunsetTimestamp) {
              theme="light";
             
            } else {
            theme="dark";
            }   

            dispatch({type:'setTemperature', payload:theme});  




          })
          .catch((error) => {
            let time=new Date();
            time = time.getHours();
        if(time>=18){
          dispatch({type:'setTemperature', payload:"dark"});  
        }else{
          dispatch({type:'setTemperature', payload:"light"}); 
        }
            console.error('Error fetching weather data:', error);
          });
      },
      (error) => {
        let time=new Date();
        time = time.getHours();
        
        if(time>=18){
          dispatch({type:'setTemperature', payload:"dark"});  
        }else{
          dispatch({type:'setTemperature', payload:"light"}); 
        }
        console.error('Error getting user location:', error);
      }
    );
  } else {
   

    console.log('Geolocation is not supported by this browser.');
  }
  

}
export default fetchWeather;