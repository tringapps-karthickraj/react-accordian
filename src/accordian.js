import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './accordian.css';

export default function Accordian(){
    const [data,setdata] = useState([]);
    useEffect(() => {
        axios.get("https://reqres.in/api/users")
        .then(res=>{
           let result = res.data.data;
           result.forEach(element => {
                element.isActive = false;
            });
            setdata(result);
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    function showprofile(profile){
       
        data.forEach(element => {
            if(element.id !== profile.id){
                element.isActive = false;
            }
            
        });
        profile.isActive = !profile.isActive;
        setdata([...data]);
        let localprofile ={
            profile:profile
        }
        localStorage['profile'] = JSON.stringify(localprofile);
    }
    
  return (
    <div>
        <h1 className='center'>Welcome to Tringapps!</h1>
        {data.map(profile =>{
            return <div  key={profile.id}><button onClick={()=>showprofile(profile)}><span className='lefttext'>{profile.first_name}</span><span className='righttext'><i className={
                profile.isActive ? "fa fa-chevron-up":"fa fa-chevron-down"
            }></i></span></button>
            { profile.isActive ? <div className='panal'>
           
                <table>
                    <tr>
                        <td><img src={profile.avatar}/></td>
                        <td>
                            <tr>
                                <td class="left"><span class="bold">First name:</span>{profile.first_name}</td>
                            </tr>
                            <tr>
                                <td class="left"><span class="bold">Last name:</span>{profile.last_name} </td>
                            </tr>
                            <tr>
                                <td class="left"><span class="bold">Email:</span>{profile.email} </td>
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
