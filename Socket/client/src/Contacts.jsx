const Contacts = ({socket, users, user, setto})=>{
    console.log(users)
    console.log(user)
    return(
        <div id="contacts"> 
            {users.filter(curuser=>curuser.id!==user.id)?.map(u=>(
                <div key={u?.id}>
                    <h3 onClick={()=>{setto(user?.id)}}><b>{u?.name}</b></h3>
                    <code>{u?.id}</code>
                    <hr/>                
                </div>
            ))}
        </div>
    )
}

export default Contacts;