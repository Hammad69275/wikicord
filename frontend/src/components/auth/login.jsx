import { useState } from "react";
import Loader from "../main/misc/loader";
import Modal from "../modal/modal";
import { AnimatePresence } from "framer-motion";
import {Login as LoginFunction} from "../../api/api"
import { useNavigate } from "react-router-dom";
import ErrorModal from "../modal/errorModal";

function Login(){
    const [email,setEmail] = useState(``)
    const [password,setPassword] = useState(``)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const navigate = useNavigate()

    const handleFormSubmit = async () => {
        setLoading(true)
        let result = await LoginFunction(email,password)
        setLoading(false)
        if(result.status !== 200 && !result.message) return setError("Server Seems To Be Down :( Contact Hammad So He Can Investigate The Issue And Fix It")
        if(result.status !== 200) return setError(result.message)
        localStorage.setItem("token",result.data.token)
        navigate("/")
    }

    return(
        <div className="register-container">
            <AnimatePresence mode="wait" initial={false}>
                 {error.length > 0 && <Modal customComponent={<ErrorModal handleClose={() => setError("")} title="Error" text={error} />} />}
            </AnimatePresence>
            <div id="welcome-text">
                <h1>Hi</h1>
                <h5>Welcome Back!</h5>
            </div>
            <div className="register-form-container">
                <div>
                <h1>Log In</h1>
                <h6>Welcome Back!</h6>
                </div>
                <div className="register-form">
                
                <div className="input-container">
                <input type="text" onChange={(e) => setEmail(e.target.value)} required></input>
                    <span>Email</span>
                </div>
                <div className="input-container">
                <input type="password" onChange={(e) => setPassword(e.target.value)} required></input>
                     <span>Password</span>

                </div>
                {loading ? <Loader/>:<button onClick={handleFormSubmit}>Submit</button> }
                
                </div>
            </div>
        </div>
    )
}


export default Login