import { useState } from "react";
import Loader from "../main/misc/loader";
import Modal from "../modal/modal";
import ErrorModal from "../modal/errorModal";
import { AnimatePresence } from "framer-motion";
import { Register as RegisterFunction } from "../../api/api.js"
import { useNavigate } from "react-router-dom";

function Register(){

    const [username,setUsername] = useState(``)
    const [email,setEmail] = useState(``)
    const [password,setPassword] = useState(``)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handleFormSubmit = async () => {
        setLoading(true)
        let result = await RegisterFunction(username,email,password)
        setLoading(false)
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
                <h1>Hello</h1>
                <h5>Lets get you started!</h5>
            </div>
            <div className="register-form-container">
                <h1>sign up</h1>
                <div className="register-form">
                
                <div className="input-container">
                <input type="text" onChange={(e) => setUsername(e.target.value)} required></input>
                    <span>Username</span>
                </div>
                <div className="input-container">
                <input type="text" onChange={(e) => setEmail(e.target.value)} required></input>
                    <span>Email</span>
                </div>
                <div className="input-container">
                <input type="password" onChange={(e) => setPassword(e.target.value)} required></input>
                     <span>Password</span>

                </div>
                {loading ? <Loader/>:<button onClick={handleFormSubmit}>Submit</button> }
                <h5>Already have an account? <a href="/login">Sign In</a> </h5>
                </div>
            </div>
        </div>
    )
}


export default Register