import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Verify as RequestVerification } from "../../api/api"

function Verify(){
    const {search} = useLocation()
    const [invalid,setInvalid] = useState(false)
    const [success,setSuccess] = useState(false)

    useEffect(()=> {
        async function verifyFunction(){
            if(!search.startsWith("?otp=")) return setInvalid(true)
            let code = search.replace("?otp=","")
            let result = await RequestVerification(code)
            if(result.status == 400) return setInvalid(true)
            if(result.status == 200) setSuccess(true)
        }
        verifyFunction()
    },[])
    return(
        <div className="loading-screen verify-screen">
               <h1>WIKI</h1>
               {(invalid == false && !success) && <span></span>}
               {invalid && <h3 style={{color:"white",fontWeight:"normal",marginTop:"0"}} >Invalid OTP</h3>}
               {success && <h3 style={{color:"white",fontWeight:"normal",marginTop:"0"}} >Verification Successful</h3>}
        </div>
    )
}

export default Verify