import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { getOwnWiki, getUserDetails, getWikiList } from "../../api/api"
import "./main.css"
import NavBar from "./misc/navbar"
import Footer from "./misc/footer"

import Loader from "./misc/loadingScreen"

function Main(){
    const [user,setUser] = useState({})
    const [WikiList,setWikiList]= useState([])
    const [MyWiki,setMyWiki] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        if(location.pathname == "/app") navigate("/app/wikis")
        async function fetchData(){
            let fetchedUser = await getUserDetails(token)
            if(fetchedUser.status !== 200){
                if(fetchedUser.message.includes("verify")) return navigate("/error/verify")
                localStorage.removeItem("token")
                return navigate("/")        
            }
            setUser(fetchedUser.data)
            
            let wikis = await getWikiList(token)
            if (wikis.status = 200) setWikiList(wikis.data)
            let mywiki = await getOwnWiki(token,fetchedUser.data.id)
            if(mywiki.status == 200) setMyWiki(mywiki.data)
            setLoading(false)
        }
        fetchData()

    },[])

    return (
        <div>
            {loading && <Loader/>}
            <NavBar User={user}/>
            <div className="component-container">
              {!loading && <Outlet context={[WikiList,user,MyWiki,token]} /> }
            </div>
            <Footer />
        </div>
    )
}

export default Main