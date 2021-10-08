const Msgwindow = ({socket, to, user})=>{
    return(
        <div id="msgwindow"> 
            <div id="msg">
                <div className="to">hello</div>
                <div className="to">hello</div>
                <div className="from">hello</div>
                <div className="to">hello</div>
                <div className="from">hello</div>
                <div className="from">hello</div>
                <div className="to">hello</div>
                <div className="from">hello</div>
                <div className="to">hello</div>
                <div className="from">hello</div>
            </div>
            <input type="text" placeholder="Write msg"/>
        </div>
    )
}

export default Msgwindow;