import { Outlet,useOutletContext } from "react-router-dom"

function Wikis(){
    const [wikiList,user,MyWiki,token] = useOutletContext()
    return (
        <>
            <Outlet context={[wikiList,user,token]} />
        </>
    )
}

export default Wikis