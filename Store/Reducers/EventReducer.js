
import{REGISTER_EVENT, DELETE_EVENT, SET_REGISTRATION} from '../Actions/EventsAction';


const initialState = {
    formalEvents: [],
    informalEvents: [],
    registrationData: [],
    Gallery: []
}
 



const EventReducer = (state = initialState,action)=>{
    switch(action.type){
        case SET_REGISTRATION:
          return  {
                registrationData: action.registrationData,
                formalEvents: action.formalEvents,
                informalEvents: action.informalEvents,
                Gallery: action.galleryItems
            }
        case REGISTER_EVENT: 
        const registerTeam =  {
            id: action.evId,
            captain:  action.FormDetails.cap,
            viceCaptain: action.FormDetails.vicecap,
            teamMembers: action.FormDetails.squad,
            phoneNo : action.FormDetails.phone,
            totalMem: action.FormDetails.totalNo,
            sport : action.FormDetails.spTitle,
            ownerId: action.FormDetails.ownerId
        }
        return {
            ...state,
            registrationData: state.registrationData.concat(registerTeam),
            
        }
        case DELETE_EVENT : 
        return {
            ...state,
            registrationData: state.registrationData.filter(prod => prod.id!== action.evId)
        }
        
   
    }
    
    return state;
    
}

export default EventReducer;