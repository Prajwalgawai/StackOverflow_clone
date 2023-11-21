const authReducer=(state={data:null}, action)=>{

    switch (action.type){
        case 'AUTH':
            alert(action?.data);
            
            localStorage.setItem('Profile', JSON.stringify({...action?.data}))  //converting json to string

            return {...state, data:action?.data};     //means data will get updated in previous state.
            
        case 'LOGOUT':
            localStorage.clear();    
            return {...state, data:null};            //in previous state setting data to null.
        default:
            return state;  
    }

}

export default authReducer;