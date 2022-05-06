import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../assets/accordian.css';

export default function Accordian(){
    const [profileData,setProfileData] = useState([]);
    const [apiError,setApiError] = useState('');
    const viewConsole=  false;
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL +"/api/users")
        .then(response=>{
           let result = response.data.data;
           result.forEach(element => {
                element.isActive = false;
            });
            setProfileData(result);
            viewConsole && console.log(result);
        })
        .catch(error=>{
            setApiError(error);
            viewConsole && console.log(apiError);
        })
    }, [])
    function showprofile(profile){
        viewConsole && console.log(profile);
        profileData.forEach(element => {
            if(element.id !== profile.id){
                element.isActive = false;
            }
        });
        profile.isActive = !profile.isActive;
        setProfileData([...profileData]);
        let localprofile ={
            profile:null
        }
        localprofile.profile=sessionStorage['profile'] === undefined || 
        !JSON.parse(sessionStorage['profile']).profile  || 
        JSON.parse(sessionStorage['profile']).profile.id !== profile.id ?   profile :  null;
           
        sessionStorage['profile'] = JSON.stringify(localprofile);
    }
    
  return (
    <div>
        { apiError && 
        <div>
            <label>There is some error</label>
        </div>}
        { !apiError && profileData?.length ===0 &&
        <div>
            <label>no data found</label>
        </div>}

        {!apiError && profileData?.length >0 && <div>
        <h1 className='center'>Welcome to Tringapps!</h1>
        {profileData.map(profile =>{
            const {id, first_name, last_name, email, avatar, isActive} = profile;
            return <div  key={id}><button className='button' onClick={()=>showprofile(profile)}><span className='lefttext'>{first_name}</span><span className='righttext'><i className={
                isActive ? "fa fa-chevron-up":"fa fa-chevron-down"
            }></i></span></button>
            { isActive && <div className='panal'>
           
                <table>
                    <tbody>
                        <tr>
                            
                            <td><img src={avatar} alt={first_name}/></td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="left"><span className="bold">First name:</span>{first_name}</td>
                                        </tr>
                                        <tr>
                                            <td className="left"><span className="bold">Last name:</span>{last_name} </td>
                                        </tr>
                                        <tr>
                                            <td className="left"><span className="bold">Email:</span>{email} </td>
                                        </tr>
                                    </tbody>
                                
                                </table>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>}
            </div>
        })}
        </div>}
        
    </div>
  )
}
