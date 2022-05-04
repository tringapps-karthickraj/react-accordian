import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../assets/accordian.css';

export default function Accordian(){
    const [profileData,setProfileData] = useState([]);
    const link = "https://reqres.in"
    useEffect(() => {
        axios.get(link +"/api/users")
        .then(res=>{
           let result = res.data.data;
           result.forEach(element => {
                element.isActive = false;
            });
            setProfileData(result);
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])
    function showprofile(profile){
        profileData.forEach(element => {
            if(element.id !== profile.id){
                element.isActive = false;
            }
            
        });
        profile.isActive = !profile.isActive;
        setProfileData([...profileData]);
        let localprofile ={
            profile:profile
        }
        sessionStorage['profile'] = JSON.stringify(localprofile);
    }
    
  return (
    <div>
        <h1 className='center'>Welcome to Tringapps!</h1>
        {profileData.map(profile =>{
            return <div  key={profile.id}><button className='button' onClick={()=>showprofile(profile)}><span className='lefttext'>{profile.first_name}</span><span className='righttext'><i className={
                profile.isActive ? "fa fa-chevron-up":"fa fa-chevron-down"
            }></i></span></button>
            { profile.isActive ? <div className='panal'>
           
                <table>
                    <tr>
                        <td><img src={profile.avatar} alt=""/></td>
                        <td>
                            <tr>
                                <td className="left"><span className="bold">First name:</span>{profile.first_name}</td>
                            </tr>
                            <tr>
                                <td className="left"><span className="bold">Last name:</span>{profile.last_name} </td>
                            </tr>
                            <tr>
                                <td className="left"><span className="bold">Email:</span>{profile.email} </td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </div>:<div></div>}
            </div>
        })}
    </div>
  )
}
