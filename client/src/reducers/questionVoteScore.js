const questionVoteScore=(state={data:null}, action)=>{
   
    switch(action.type){
        case 'setQuestionCountScore':
            console.log("hii 🤩🤩");
            return {...state, data:action.payload};
        default :
            return {...state};    
    }
      
}
export default questionVoteScore;