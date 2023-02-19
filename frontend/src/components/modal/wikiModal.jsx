import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWiki } from "../../api/api"

function WikiModal({token,handleClose,wiki,isOwn}){
    const [error,setError] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleEnter = async () => {
        setLoading(true)
        let result = await getWiki(token,wiki.author.id,password)
        if(result.status !== 200){
            setLoading(false)
            return setError(result.message)
        }
        if(result.status == 200){
            const encoded_password = Buffer.from(password).toString("base64")
            let url = `/app/wikis/${wiki.author.id}${(wiki.type == "private" || !isOwn) ? `?c=${encoded_password}`:""}`
            navigate(url)
        }
    } 

    return(
        <div className="wiki-modal-container">
            <img alt="pfp" src={wiki.author.picture} />
            <h1>{wiki.author.username}</h1>
            <h2>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(wiki.author.createdAt)}</h2>
            <h1>Introduction</h1>
            <p>{wiki.intro}</p>
            {(wiki.type == "private" && !isOwn) && <h1>Password</h1>}
            {(wiki.type == "private" && !isOwn) && <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter password to see full wiki" />}
            {error.length > 0 && <h6>{error}</h6>}
            <div>
                {loading && <span style={{marginTop:"2.5vh"}} className="button-loader2"></span> }
               {!loading && <button onClick={handleEnter} >Enter</button>}
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    ) 
}

export default WikiModal