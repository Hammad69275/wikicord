import { useRef, useState } from "react"
import InstagramIcon from "../../icons/instagram.svg"
import DiscordIcon from "../../icons/discord.svg"
import TwitterIcon from "../../icons/twitter.svg"
import FacebookIcon from "../../icons/facebook.svg"
import GmailIcon from "../../icons/gmail.svg"

const social_graphics = {
    "instagram":InstagramIcon,
    "discord":DiscordIcon,
    "twitter":TwitterIcon,
    "facebook":FacebookIcon,
    "email":GmailIcon
}

function SocialSelector({existingSocials,handleClose,handleSelect}){
    const [hasSelected,setHasSelected] = useState(false)
    const [selectedSocial,setSelectedSocial] = useState("")
    const ref = useRef()

    const onSocialAdd = () => {
        if(ref.current.value < 2) return
        handleSelect({
            name:selectedSocial,
            value:ref.current.value
        })
    }
    return(
        <div className="socials-selector">
            <h1>Add Account</h1>
            {hasSelected == false ? <div className="selector-tiles-container">
                {Object.keys(social_graphics).map((s) => {
                    if(existingSocials.find(es => es.name == s)) return
                    return (
                        <div key={Object.keys(social_graphics).indexOf(s)} className="selector-tile">
                            <button onClick={() => { setHasSelected(true);setSelectedSocial(s) }} >{s}</button>
                        </div>
                    )
                })}
            </div> : <div>
                
                <input ref={ref} type="text" placeholder="Enter Account Name" />
                <button onClick={onSocialAdd} >Add</button>
            </div>}
            <button id="close" onClick={handleClose} >Close</button>
        </div>
    )
}
export default SocialSelector