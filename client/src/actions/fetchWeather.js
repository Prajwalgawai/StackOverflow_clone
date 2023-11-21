import axios from 'axios';

const fetchWeather=()=>async(dispatch)=>{


let theme="";
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

        
// const apiKey = '2bc3e33a7e1619f747ed4040d325f870';
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

//         axios.get(apiUrl)
//           .then((response) => {
//             const currentTemp = response.data.main.temp;
//             // setTemperature(currentTemp);

//             const sunriseTimestamp = response.data.sys.sunrise;
//             const sunsetTimestamp = response.data.sys.sunset;
//             const currentTimestamp = Math.floor(Date.now() / 1000);
//             const weatherConditions = response.data.weather;

//             // Check for bad weather conditions
//             const badWeatherTypes = ['Rain', 'Snow', 'Thunderstorm', 'Fog', 'Haze', 'Dust'];
//             for (const weatherCondition of weatherConditions) {
//               if (badWeatherTypes.includes(weatherCondition.main)) {
// // console.log("it is bad weather");
//  theme="dark";
//                 break;
//               }
//             }

//             // Determine whether it's day or night
//             if (currentTimestamp >= sunriseTimestamp && currentTimestamp <= sunsetTimestamp) {
//               theme="light";
//             } else {
//             theme="dark";
//             }

//             console.log("day is :"+theme);

//             dispatch({type:'setTemperature', payload:theme});  




//           })
//           .catch((error) => {
//             console.error('Error fetching weather data:', error);
//           });
//       },
//       (error) => {
//         console.error('Error getting user location:', error);
//       }
//     );
//   } else {
//     console.log('Geolocation is not supported by this browser.');
//   }
  

}
export default fetchWeather;