import { useState,useEffect } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { getWiki } from "../../../api/api";
import ContentPreview from "../UserDashboard/contentPreview";
import ScrollContainer from "react-indiana-drag-scroll";

import InstagramIcon from "../../../icons/instagram.svg"
import DiscordIcon from "../../../icons/discord.svg"
import TwitterIcon from "../../../icons/twitter.svg"
import FacebookIcon from "../../../icons/facebook.svg"
import GmailIcon from "../../../icons/gmail.svg"

const social_graphics = {
    "instagram":InstagramIcon,
    "discord":DiscordIcon,
    "twitter":TwitterIcon,
    "facebook":FacebookIcon,
    "email":GmailIcon
}

function WikiPage(){
    let {userID} = useParams()
    let user = useOutletContext()[1]
    let token = useOutletContext()[2]
    const [password,setPassword] = useState("")
    const [wiki,setWiki] = useState({})

    const location = useLocation()
    const [loading,setLoading] = useState(true)
    const [isPasswordGiven,setPasswordGiven] = useState(true)
    const [error,setError] = useState("")
    const [invalid,setInvalid] = useState(false)

    useEffect(() => {
        async function fetchWiki(){
            let c = location.search.match(/c=([^&]*)/) || ["",""]

            let encoded_password = c[1]
            let p = Buffer.from(encoded_password,"base64").toString()
            let result = await getWiki(token,userID,p)
            if(result.status != 200){
                if(result.message.includes("Incorrect")){
                    setPasswordGiven(false)
                    return setLoading(false)
                }else if(result.message.includes("No Wiki")){
                    setLoading(false)
                    return setInvalid(true)
                }
            }
            setWiki(result.data)
            setLoading(false)
        }
        fetchWiki()
    },[])
    const handleEnter = async () => {
        const result = await getWiki(token,userID,password)
        if(result.status !== 200) return setError(result.message)
        setPasswordGiven(true)
        setWiki(result.data)
    } 
    return(
        <div className="wiki-page-container">
           {loading && <span className="button-loader"></span>}
            {(!isPasswordGiven && userID !== user.id && !loading) && <div className="password-container">
                <h1>Enter Password</h1>
                
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter password" type="text" />
                <h6>{error}</h6>
                
                <button onClick={handleEnter}>Enter</button>
            </div>}
            {
                invalid && <div className="error-container">
                    <h1>Invalid Wiki</h1>
                </div>
            }
            {
                ((!loading) && Object.keys(wiki).length > 0) && <div className="wiki-container">
                   <div className="account-info"  >
                        
                        <img src={wiki.author.picture} />
                        <h1 id="username" >{wiki.author.username}</h1>
                        <h2>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(wiki.author.createdAt)}</h2>
                    </div>
                        <div className="wiki">
                                <h1>Introduction</h1>
                                <p>{wiki.intro}</p>
                                <h1>Wiki</h1>
                                <ContentPreview content={wiki.content} />
                                {
                                    wiki.socials.length > 0 && <>
                                        <h1>Socials</h1>
                                        <div className="tiles-container">
                                        <ScrollContainer>
                                            {wiki.socials.map(s => {
                                                  return (<div key={wiki.socials.indexOf(s)} className="social-container">
                                                  <div className="social-tile">
                                                      <h3>
                                                          {s.value}
                                                      </h3>
                                                  </div>
                                                  <div className="social-type">
                                                      <img src={social_graphics[s.name]} />
                                                      <h4>{s.name}</h4>
                                                  </div>
                                              </div>
                                              )
                                            })}
                                            </ScrollContainer>
                                        </div>
                                    </>
                                }
                                {
                                    wiki.scrollTiles.length > 0 && <>
                                        <h1>Miscellaneous</h1>
                                                <div className="tiles-container">
                                                <ScrollContainer>
                                                    {wiki.scrollTiles.map(s => {
                                                        return (<div key={wiki.scrollTiles.indexOf(s)} className="misc-container">
                                                            <div className="misc-tile">
                                                                <h1>• {s.title}</h1>
                                                                <p>
                                                                    {s.value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        )
                                                    })}
                                                </ScrollContainer>
                                                </div>
                                    </>
                                }
                                
                        </div>
                </div>
            }
        </div>
    )
}

export default WikiPage