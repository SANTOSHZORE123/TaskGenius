import ReactDOM from 'react-dom'
import classes from "./Modal.module.css"
import React from 'react'

export const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={()=>{props.onClose(false)}}></div>
}

export const ModalOverlay=(props)=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal=(props)=>{
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlay'))}
    </>
}
export default Modal