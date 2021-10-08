const Contacts = ({socket, users, user, setto})=>{
    
    return(
        <div id="contacts"> 
            {users.filter(curuser=>curuser.id!==user.id).map(user=>(<div>
                <h3 onClick={()=>{setto(user.id)}}><b>{user.name}</b></h3>
                <code>{user.id}</code>
                <hr/>                
            </div>))}
        </div>
    )
}

export default Contacts;