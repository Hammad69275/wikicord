import { useNavigate } from "react-router-dom"

function NavBar({User}){
    const navigate = useNavigate()
    return(
        <div className="navbar-container">
            <img alt="UserPFP" src={User.picture} />
            <h1 onClick={() => { navigate("/app/me") }}>{User.username}</h1>
            <h1>WIKI</h1>
            
        </div>
    )
}

export default NavBar