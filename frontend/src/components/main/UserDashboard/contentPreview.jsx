import { useEffect,useState } from "react"

function ContentPreview({content,handleClose}){
    const [formattedContent,setFormattedContent] = useState("")
    useEffect(() => {
        let contentArray = content.split("\n")
        contentArray = contentArray.map((str) => {
            if(str.startsWith(">")){
                let editedStr = str.replace(">","")
                editedStr = `<h1>${editedStr}</h1>`
                return editedStr
            }
            return str
        })
        contentArray = contentArray.join("\n")
        contentArray.split(/<h1>.*<\/h1>/g).forEach((p) => {
            if(p.length == 0) return
            contentArray = contentArray.replace(p,`<p>${p}</p>`)
        })
        setFormattedContent(contentArray)
    })
    
    return(
        <>
            {handleClose && <button onClick={handleClose} id="close-preview">X</button>}
            <div className="wiki-content" dangerouslySetInnerHTML={{__html: formattedContent}} ></div>
        </>
    )
}
export default ContentPreview