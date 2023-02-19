import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../App.css"


function Home(){
   const [isExiting,setExiting] = useState(false)
   const device = window.innerWidth > 600 ? "desktop":"mobile"
   const navigate = useNavigate()
   useEffect(() => {
        if(localStorage.getItem("token")) navigate("/app/wikis/list")
   },[navigate])

    return(
        <div className={`home-container ${isExiting ? `home-container-exiting`:``}`}>
            {device === "mobile" && <div>
                <h1 className="title">WIKICORD</h1>
                <h5>Welcome! What would you like to do?</h5>
            </div>}
            <div className={`home-buttons-container ${isExiting ? `home-buttons-exiting`:``}`}>
                {device === "desktop" && <div>
                    <h1 className="title">WIKICORD</h1>
                    <h5>Welcome! What would you like to do?</h5>
                </div>}
                <button onClick={() => {
        if(device === "desktop") return navigate("/register")
        setExiting(true)
        setTimeout(() => {
            navigate("/register")
        }, 1000);
    }}>Register</button>
                <button onClick={() => {
         if(device === "desktop") return navigate("/login")           
        setExiting(true)
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }}>Login</button>
                <h5>Need Help? Contact Us!</h5>
            </div>
        </div>
    )
}

export default Home