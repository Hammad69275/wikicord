import {motion} from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";

function Backdrop({children,onClick}){

    return (
        <motion.div key="backdrop" onClick={onClick} className="backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {children}
        </motion.div>
    )
}

export default Backdrop