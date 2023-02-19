import {motion} from "framer-motion"
import Backdrop from "./backdrop"

const dropin = {
    hidden:{
        y:"-100vh",
        opacity:0
    },
    visible:{
        y:"0",
        opacity:"1",
        transition:{
            duration:`0.1s`,
            type:"spring",
            damping:25,
            stiffness:500,
        }
    },
    exit:{
        y:"-100vh",
        
    }
}

function Modal({customComponent,customClass}){
   return (
       <Backdrop >
            <motion.div className={customClass ? customClass:`modal`} onClick={(e) => e.stopPropagation()}
                variants={dropin}
                initial="hidden"
                animate="visible"
                exit="exit"
            >   
                {customComponent}
            </motion.div>
        </Backdrop>
   )

}
export default Modal