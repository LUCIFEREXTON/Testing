import './style.css';
import {useState} from 'react';
import Contacts from './Contacts';
import Msgwindow from './Msgwindow';
import Profile from './Profile';
const Chatwindow = ({socket, users, user})=>{
    const [to, setto] = useState(null);    
    return (
        <div id="cols"> 
            <Contacts socket={socket} setto={setto} users={users} user={user}/>
            {to===null?<div id="msgwindow">Select contact</div>:<Msgwindow socket={socket} to={users.find(user=>user.id===to)} user={user}/>}
            <Profile socket={socket} user={user}/>
        </div>
    )
}

export default Chatwindow;