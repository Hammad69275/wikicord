import { useState } from "react";

function MiscTileCreator({handleCreate}){
    const [title,setTitle] = useState("")
    const [value,setValue] = useState("")
    
    const add = () => {
        if(title.length < 1 || value.length < 1) return
        handleCreate({title,value})
    }

    return (
        <div className="misc-tile-creation-menu">
            <h1>Create Tile</h1>
            <div className="misc-input-container">
                <div>
                    <h3>Enter Title</h3>
                    <input onChange={(e) => { setTitle(e.target.value) }} maxLength={20}/>
                </div>
                <div>
                    <h3>Enter Description</h3>
                    <textarea onChange={(e) => { setValue(e.target.value) }}  maxLength={170} />
                </div>
            </div>
            <button onClick={add} >Add</button>
        </div>
    )
}

export default MiscTileCreator