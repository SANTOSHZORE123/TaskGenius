import React from "react";
import "./Task.css"
const Task=(props)=>{
    console.log(props,"newone")
    return <div className="TaskContainer" style={{backgroundColor:`${props.completed==='false'?'#d77979':'#9ee99e'}`}}>
        <h3>{props.description}</h3>
        <h4>Status:&nbsp;{props.completed==='false'?'Pending...':'Completed'}</h4>
        <h5>Last Updated: {props.createdAt}</h5>
        <button onClick={props.updateHandler}>Update</button>
        <button onClick={props.deleteHandler}>Delete</button>
    </div>
}
export default Task