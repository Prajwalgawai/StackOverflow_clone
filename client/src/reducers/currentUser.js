const currentUserReducer=(state=null, action)=>{

    switch(action.type){                          //action has type and payload.
        case "FETCH_CURRENT_USER":
            // console.log("hii bhava"+JSON.stringify(action.payload));
              return action.payload;
        default:
            return state;     
    }
}
export default currentUserReducer;