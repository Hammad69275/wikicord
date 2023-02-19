import { useOutletContext } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion"

import UserDashboard from "../UserDashboard/userDashboard";


function MyAccount(){
    const user = useOutletContext()[1]
    const wiki = useOutletContext()[2]
    const token = useOutletContext()[3]

    return (
        <>  
            <UserDashboard token={token} user={user} wiki={wiki} isOwn={true}/>
        </>
    )
}
export default MyAccount