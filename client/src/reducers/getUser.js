const getUser=(state={data:null}, action)=>{
    switch(action.type){
        case 'GET_USER_VIA_ID':
            return {...state,data:action.payload };
        default :
            return {...state};    
    }
 
}
export default getUser;