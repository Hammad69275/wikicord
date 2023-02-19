import SearchIcon from "../../../../icons/search.svg"
import Modal from "../../../modal/modal"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import WikiModal from "../../../modal/wikiModal"
import { useOutletContext } from "react-router-dom"

function WikiList(){
   
    const [passwordModal,setPasswordModal] = useState(false)
   
    const [wikiList,user,token] = useOutletContext()
    
    const [WikiList,setWikiList] = useState(wikiList)
    const [selectedWiki,setSelectedWiki] = useState({})

    const onCardSelect = (id) => {
        setPasswordModal(true)
        setSelectedWiki(WikiList.find(i=> i.author.id == id))
    }

    const onSearch = (e) => {
        let wl = wikiList
        let filteredList = wl.filter(w => w.author.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setWikiList(filteredList)
    }

    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <AnimatePresence mode="wait" initial={false}>
                {passwordModal && <Modal customClass="wiki-modal" customComponent={ <WikiModal handleClose={() => {setPasswordModal(false)}} token={token} isOwn={selectedWiki.author.id == user.id} wiki={selectedWiki} /> } />}
            </AnimatePresence>
        <div className="searchmenu">
                <img alt="SearchIcon" src={SearchIcon} />
                <input onChange={onSearch} type="text" placeholder="Search..." />
        </div>
        <div className="wikilist-container">
           {WikiList.length>0 && WikiList.map(wiki => {
               return <WikiCard onclick={onCardSelect} Wiki={wiki} key={wiki.author.id}/>
            })}
            
        </div>
        </div>
    )
}

function WikiCard({Wiki,onclick}){
    return(
        <div className="wiki-card" onClick={()=>{ onclick(Wiki.author.id) }}>
                <img alt="PFP" src={Wiki.author.picture} />
            <div>
                <h4>{Wiki.author.username}</h4>
                <p>{Wiki.intro}</p>
            </div>
        </div>
    )
}

export default WikiList