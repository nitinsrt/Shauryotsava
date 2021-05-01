import EvList from '../../Models/EvList';
import TeamFormat from '../../Models/TeamFormat';
import Informal from '../../Models/Infromals';
import Gallery from '../../Models/Gallery';

export const REGISTER_EVENT = 'REGISTER_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SET_REGISTRATION = 'SET_REGISTRATION';


export const fetchTeamData = ()=>{
    return async (dispatch,getState)=> {
        const userId = getState().auth.userId
        const collegeName= getState().auth.collegeName
            const response = await Promise.all([
                fetch(`https://shauryotsava-3160c.firebaseio.com/RegitrationData/${collegeName}.json`),
                fetch("https://shauryotsava-3160c.firebaseio.com/EventDetails.json"),
                fetch("https://shauryotsava-3160c.firebaseio.com/InformalEvents.json"),
                fetch("https://shauryotsava-3160c.firebaseio.com/Gallery.json")
             ] )
             const resData=[];
            for(var i in response){
                const Data = await response[i].json();
                resData.push(Data)
            }
            const LoadedTeams = [];
            const LoadedEvents = [];
            const LoadedInformals = [];
            const LoadedGallery=[];
            for(const key in resData[0]){
                LoadedTeams.push(new TeamFormat(key, resData[0][key].Captain,resData[0][key].viceCaptain,resData[0][key].teamMembers,resData[0][key].phoneNumber,
                    resData[0][key].totalMembers,resData[0][key].title,resData[0][key].ownerId));
            }
            for(const key in resData[1]){
                LoadedEvents.push(new EvList(key, resData[1][key].imageUrl,resData[1][key].title,resData[1][key].text,resData[1][key].size))
            }
            for(const key in resData[2]){
                LoadedInformals.push(new Informal(key, resData[2][key].imageUrl,resData[2][key].title,resData[2][key].Venue,resData[2][key].timings))
            }
            for(const key in resData[3]){
                LoadedGallery.push(new Gallery( resData[3][key].title,resData[3][key].image))
            }
            
            dispatch({type: SET_REGISTRATION, registrationData: LoadedTeams.filter(team=>team.ownerId===userId)
                , formalEvents: LoadedEvents,
            informalEvents: LoadedInformals,
        galleryItems : LoadedGallery})
          
    }
}


export const registerEvents = (Captain, viceCaptain, teamMembers, phoneNumber,totalMembers,title) =>{
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const collegeName = getState().auth.collegeName;
        const response = await fetch(`https://shauryotsava-3160c.firebaseio.com/RegitrationData/${collegeName}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Captain, viceCaptain, teamMembers, phoneNumber, totalMembers, title, ownerId: userId
            })
        });

        const resData = await response.json();
        console.log(resData)
        dispatch({
            type: REGISTER_EVENT,
            evId: resData.name,
            FormDetails: {
                spTitle: title,
                cap: Captain,
                viceCap: viceCaptain,
                squad: teamMembers,
                phone: phoneNumber,
                totalNo: totalMembers,
                ownerId: userId
            }
        });
    };
};

export const deleteEvent = (id)=>{
return async (dispatch,getState) =>{
    const token = getState().auth.token
    await fetch(`https://shauryotsava-3160c.firebaseio.com/RegitrationData/${id}.json?auth=${token}`,{
        method: 'DELETE'
    })
   dispatch( {type: DELETE_EVENT,
    evId: id,
   }
   )
}
}

