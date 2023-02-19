import WikiIcon from  "../../../icons/wiki.svg"
import UserIcon from  "../../../icons/user.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Footer(){
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="footer-container">
            <div className={`footer-button ${location.pathname.startsWith("/app/wikis") ? "active" : ""}`} >
                <img src={WikiIcon} alt="" onClick={() => {navigate("/app/wikis/list")}} />
                <h6>Wikis</h6>
            </div>
            <div className={`footer-button ${location.pathname == "/app/me" ? "active" : "" }`}>
                <img src={UserIcon} alt="" onClick={() => {navigate("/app/me")}} />
                <h6>My Account</h6>
            </div>
        </div>
    )    
}

export default Footer