import { useEffect, useRef, useState } from "react"

import InstagramIcon from "../../../icons/instagram.svg"
import DiscordIcon from "../../../icons/discord.svg"
import TwitterIcon from "../../../icons/twitter.svg"
import FacebookIcon from "../../../icons/facebook.svg"
import GmailIcon from "../../../icons/gmail.svg"

import { AnimatePresence } from "framer-motion"
import Modal from "../../modal/modal"
import SocialSelector from "../../modal/socialsSelector"
import MiscTileCreator from "../../modal/miscTileCreator"
import ContentPreview from "./contentPreview"
import ScrollContainer from 'react-indiana-drag-scroll'

const social_graphics = {
    "instagram":InstagramIcon,
    "discord":DiscordIcon,
    "twitter":TwitterIcon,
    "facebook":FacebookIcon,
    "email":GmailIcon
}

function WikiEditor({wiki,user,handleSave,isSaving}){
    const [Wiki,setWiki] = useState({...wiki})
    
    const [isSelectingSocial,setSelectingSocial] = useState(false)
    const [isCreatingTile,setCreatingTile] = useState(false)
    const [isPreviewingContent,setPreviewingContent] = useState(false)
    
    const TextAreaRef = useRef([])

    useEffect(() => {
        TextAreaRef.current.forEach((r) => {
            r.style.height = "inherit" ;
            r.style.height = r.scrollHeight-40 + "px" 
        })
    },[])
    
    const InputChange = (e) => {
        e.target.style.height = "inherit" ;
        e.target.style.height = e.target.scrollHeight-40 + "px" 
        
        let oldWiki = Wiki
        oldWiki[e.target.id] = e.target.value
        setWiki({...oldWiki})
    }

    const removeSocial = (social) => {
        let socials = Wiki.socials
        socials = socials.filter(s => s.name !== social)
        let editedWiki = Wiki
        editedWiki.socials = socials
        setWiki({...editedWiki})
    }
    const addSocial = (social) => {
        setSelectingSocial(false)
        document.body.style.overflow = 'unset';
        let socials = Wiki.socials
        socials.push(social)
        let editedWiki = Wiki
        editedWiki.socials = socials
        setWiki({...editedWiki})
    }
    const removeTile = (tile) => {
        let tiles = Wiki.scrollTiles
        tiles = tiles.filter(s => s.title !== tile)
        let editedWiki = Wiki
        editedWiki.scrollTiles = tiles
        setWiki({...editedWiki})
    }
    const addTile = (tile) => {
        setCreatingTile(false)
        document.body.style.overflow = 'unset';
        let tiles = Wiki.scrollTiles
        tiles.push(tile)
        let editedWiki = Wiki
        editedWiki.scrollTiles = tiles
        setWiki({...editedWiki})
    }

    const changePrivacy = (e) => {
        let oldWiki = Wiki
        oldWiki.type = e.target.checked ? "private":"public"
        setWiki({...oldWiki})
    }

    const changePassword = (e) => {
        let oldWiki = Wiki
        oldWiki.password = e.target.value
        setWiki({...oldWiki})
    }

    return (
        <div className="wiki-editor">
            <AnimatePresence>
                {isSelectingSocial && <Modal customClass="socials-selector-modal" customComponent={ <SocialSelector handleClose={() => {setSelectingSocial(false);document.body.style.overflow = 'unset';}} handleSelect={addSocial} existingSocials={Wiki.socials} /> } /> }
                {isCreatingTile && <Modal customClass="misc-tile-creation-modal" customComponent={ <MiscTileCreator handleCreate={(tile) => {addTile(tile)}} /> } />}
                {isPreviewingContent && <Modal customClass="preview-modal" customComponent={ <ContentPreview handleClose={() => { setPreviewingContent(false);document.body.style.overflow = 'unset'; }} content={Wiki.content} /> } />}
            </AnimatePresence>
            <h1>Introduction</h1>
            <div style={{width:"100%"}} className="wiki-editor-input">
                <textarea ref={(e) => TextAreaRef.current[0] = e} style={{minHeight: "15vh"}} maxLength={500} id="intro" defaultValue={Wiki?.intro ? Wiki.intro : ""} onChange={InputChange}/>
                <h6>{Wiki.intro.length}/500</h6>
            </div>
            <h1>Content</h1>
            <div style={{height:"auto",width:"100%"}} className="wiki-editor-input">
                <textarea placeholder="start a sentence with > to turn it into a header!" maxLength={25000} ref={(e) => TextAreaRef.current[1] = e} style={{minHeight: "25vh"}}  id="content" defaultValue={Wiki?.content ? Wiki.content : ""} onChange={InputChange} />
                <h6>{Wiki.content.length}/25000</h6>
            </div>
            <button id="preview-btn" onClick={() => { setPreviewingContent(true) }} >Preview</button>
            <h1>Socials</h1>
            <div className="tiles-container">
            <ScrollContainer>
                {Wiki.socials.length > 0 && Wiki.socials.map(s => {
                    return (<div key={Wiki.socials.indexOf(s)} className="social-container">
                        <div className="social-tile">
                            <h3>
                                {s.value}
                            </h3>
                            <button onClick={() => {removeSocial(s.name)}} id="delete-tile">X</button>
                        </div>
                        <div className="social-type">
                            <img src={social_graphics[s.name]} />
                            <h4>{s.name}</h4>
                        </div>
                    </div>
                    )
                })}
                {Wiki.socials.length < 5 && <button onClick={() => {setSelectingSocial(true)}} id="add">Add</button>}
            </ScrollContainer>
            </div>

            <h1>Miscellaneous</h1>
            <div className="tiles-container">
            <ScrollContainer>
                {Wiki.scrollTiles.length > 0 && Wiki.scrollTiles.map(s => {
                    return (<div key={Wiki.scrollTiles.indexOf(s)} className="misc-container">
                        <div className="misc-tile">
                            <h1>• {s.title}</h1>
                            <p>
                                {s.value}
                            </p>
                            <button onClick={() => {removeTile(s.title)}} id="delete-tile">X</button>
                        </div>
                    </div>
                    )
                })}
                {<button onClick={() => {setCreatingTile(true)}} style={{alignSelf:"center"}} id="add">Add</button>}
            </ScrollContainer>
            </div>
            <h1>Privacy</h1>
            <div className="type-selector">
                <h3>Private</h3>
                <label className="switch">
                <input checked={Wiki?.type == "private"} onChange={(e) => {changePrivacy(e)}} type="checkbox"/>
                <div className="slider"></div>
                </label>
            </div>
            {Wiki.type == "private" && <input onChange={changePassword} defaultValue={Wiki?.password ? Wiki.password : ""} placeholder="Enter Password" id="password-input" type="text" />}
            {isSaving ? <span className="button-loader"></span> :<button id="save-button" onClick={() => {handleSave(Wiki)}} >Save</button>}
                
        </div>
    )   
}

export default WikiEditor