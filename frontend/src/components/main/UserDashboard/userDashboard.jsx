import pencil from "../../../icons/pencil.svg"

import { useEffect, useRef , useState } from "react";
import { useNavigate } from "react-router-dom";

import { changePfp, patchWiki } from "../../../api/api";

import WikiEditor from "./wikiEditor";
import Modal from "../../modal/modal";
import ErrorModal from "../../modal/errorModal";

import { AnimatePresence } from "framer-motion";

function UserDashboard({token,user,wiki,isOwn}){
    const inputFile = useRef()
    
    const [wikiExists,setWikiExists] = useState(false)
    const [isUploading,setIsUploading] = useState(false)
    const [isNew,setIsNew] = useState(false)
    const [isLoading,setLoading] = useState(false)
    
    const [Wiki,setWiki] = useState(wiki)
    const [error,setError] = useState("")
    
    const navigate = useNavigate()

    useEffect(() => {
        if(typeof Wiki?.intro == "string") setWikiExists(true) 
        document.body.style.overflow = 'unset'; 
    },[Wiki])

    const onAvatarClick = () => {
       if(isOwn) inputFile.current.click();
    };
    const handleFileSelect = async (e) => {
        setIsUploading(true)
        let result = await changePfp(localStorage.getItem("token"),e.target.files[0])
        if(result.status == 200){
            navigate(0)
        }
        setIsUploading(false)
    }

    const handleWikiCreate = () => {
        setIsNew(true)
        setWiki({
            intro:"",
            content:"",
            socials:[],
            scrollTiles:[],
            type:"public"
        })
    }
    const handleSave = async (editedWiki) => {
        setLoading(true)
        let action = isNew ? "POST":"PATCH"
        if(action=="PATCH") delete editedWiki.author
        let result = await patchWiki(token,user.id,editedWiki,action)
        setLoading(false)
        if(result.status !== 200) return setError(result.message)
        if(result.status == 200) navigate(0)
    }
    return (
        <div>
            <AnimatePresence>
                {error.length > 0 &&
                    <Modal customComponent={ <ErrorModal handleClose={() => { setError("");document.body.style.overflow = 'unset';  }} title="Error" text={error} /> } />
                }
            </AnimatePresence>
        <div  className="accountinfo-container">
            <div className={`avatar ${isUploading ? "uploading":""}`}>
                <img src={user.picture} alt="pfp"/>
                {isOwn && <img id="change-pfp" onClick={onAvatarClick} alt="edit" src={pencil} />}
            </div>
                <input type='file' accept="image/png, image/jpeg" id='file' ref={inputFile} onChange={handleFileSelect} style={{display: 'none'}}/>
                <h1 id="username">{user.username}</h1>
                <h2>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(user.createdAt)}</h2>
                {isOwn && <button id="logout" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/")
                 }} >LOG OUT</button>}
                <h1>WIKI</h1>
                {wikiExists && <WikiEditor user={user} wiki={Wiki} handleSave={handleSave} isSaving={isLoading} />}
                {!wikiExists && <button onClick={handleWikiCreate} style={{marginTop:"2vh"}}>Create Wiki</button>}
        </div>
    </div>
    )
}

export default UserDashboard