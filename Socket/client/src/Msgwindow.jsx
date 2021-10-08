const Msgwindow = ({socket, to, user})=>{
    return(
        <div id="msgwindow"> 
            <div id="msg">
                <div className="to"></div>
                <div className="to"></div>
                <div className="from"></div>
                <div className="to"></div>
                <div className="from"></div>
                <div className="from"></div>
                <div className="to"></div>
                <div className="from"></div>
                <div className="to"></div>
                <div className="from"></div>
            </div>
            <input type="text" placeholder="Write msg"/>
        </div>
    )
}

export default Msgwindow;