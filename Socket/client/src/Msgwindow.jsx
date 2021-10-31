import {useState, useRef} from 'react';

const Msgwindow = ({socket, to, user})=>{
    const [msgs, setmsgs] = useState([]);
    const text = useRef(null);
    const sendmsg = ()=>{
        console.log(`from ${user.id} -> to${to.id}:${text.current.value}`)
        socket.emit("sendmsg", to.id, text.current.value, user.id, res=>{
            setmsgs([...msgs, {text:res.text, flag:"to"}]);
            if(res.status) console.log('received');
        })
    }
    socket.on("recievedmsg", (text, fromid)=>{
        console.log(`from ${fromid} -> to${user.id}:${text}`)
        setmsgs([...msgs, {text, flag:"from"}]);
    })
    return(
        <div id="msgwindow">
            {to?.name}
            <div id="msg">
                {msgs.map((msg, i)=><div key={i} className={msg?.flag}>{msg?.text}</div>)}
            </div>
            <div id="inputmsg">
                <input type="text" ref={text} placeholder="Write msg"/>
                <button onClick={sendmsg}>Send</button>
            </div>
        </div>
    )
}

export default Msgwindow;