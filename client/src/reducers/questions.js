const questionsReducers=(state={data:null}, action)=>{
    switch(action.type){
        case "POST_QUESTION":
            return {...state}
        
        case "POST_ANSWER":
            return {...state}    
            
        case 'FETCH_ALL_QUESTIONS':
            return {...state, data:action.payload}

        case 'FETCH_MY_QUESTIONS':
            return {...state, data:action.payload}
        
        default:
            return state;  
    }
}
export const myquestionsReducers=(state={data:null}, action)=>{
    switch(action.type){
       
        case 'FETCH_MY_QUESTIONS':
            return {...state, data:action.payload}
        
        default:
            return state;  
    }
}
export default questionsReducers;

