import {useState, useRef, useEffect} from 'react';
import Chatwindow from './Chatwindow'
import io from 'socket.io-client'
import axios from 'axios';
import {getCookie} from './cookiesParser';
function App() {
  const [login, setlogin] = useState(false);
  const [socket, setsocket] = useState(null);
  const name = useRef(null);
  const passcode = useRef(null);
  const [users, setusers] = useState([]);
  const [curuser, setcuruser] = useState({});
const loginHandler = async() => {
    try {
        const res = await axios.post('http://localhost:3001/login', { name: name.current.value, passcode: passcode.current.value },{ withCredentials: true });
        if (res.data.login) {
            setcuruser({...res.data.user})
            setsocket(io.connect('http://localhost:3001',{ query: { id: res.data.user.id } }));
        }
    } catch (err) {
        console.log(err);
    }
}
useEffect(()=>{
  const token = getCookie('token');
  if(token){
    (async()=>{
      const res = await axios.get('http://localhost:3001/user/'+token);
      setcuruser({...res.data.user});
      setsocket(io.connect('http://localhost:3001',{ query: { id: res.data.user.id } }));
    })()
  }
},[])
useEffect(()=>{
    if(socket!==null){
    socket.on("allusers", users=>{
        setusers(users);
        setlogin(true);
    })
    socket.emit('getusers');
    }
    return ()=>{
      socket!==null && socket.disconnect();
    }
},[socket])
  return (
    <div className="App">
      {login?<Chatwindow socket={socket} users={users} user={curuser}/>:
        <div>
            <input type="text" ref={name} id="name"/>
            <input type="text" ref={passcode} id="passcode"/>
            <button onClick={loginHandler}>Login</button>
        </div>}
    </div>
  );
}

export default App;
