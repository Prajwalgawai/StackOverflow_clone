const fetchWeather=(state={data:null}, action)=>{

    
    switch(action.type){
        case "setTemperature":
            console.log("I am in reducer & day of color is "+JSON.stringify(action.payload));
            return {...state, data:action.payload};
        default:
            return {...state};    
    }

}
export default fetchWeather;