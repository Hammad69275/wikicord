function ErrorModal({title,text,handleClose}){

    return(
        <div className="error-modal">
            <h1>{title}</h1>
                <p>{text}</p>
                <button onClick={handleClose}>Close</button>
        </div>

    )
}

export default ErrorModal