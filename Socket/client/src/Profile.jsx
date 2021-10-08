const Profile = ({user})=>{
    return(
        <div id="profile"> 
            <h3><b>{user.name}</b></h3>
                <code>{user.id}</code>
        </div>
    )
}

export default Profile;