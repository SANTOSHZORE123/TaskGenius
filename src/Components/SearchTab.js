import React from "react";
import "./searchcss.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useRef } from "react";
const SearchTab=(props)=>{
    const InputTask=useRef()
    const History=useHistory()
    const SignUpHandler=()=>{
        History.push("/SignUp")
    }
    const LoginHandler=()=>{
        History.push("/Login")
    }
    const AddTaskHandler=()=>{

    }
    const GroupTaskFilter=()=>{

    }

    const changeHandler=()=>{
        console.log(InputTask.current.value)
        props.filterTask(InputTask.current.value)
    }
    return <>
    {!props.Authenticate&&<div className="input">
        <button onClick={()=>{History.push("/")}}>Home</button>
        <button onClick={SignUpHandler}>SignUp</button>
        <button onClick={LoginHandler}>Login</button>
    </div>}
    {props.Authenticate&&<div className="input">
        <input ref={InputTask} onChange={changeHandler} type="text"placeholder="Filter Task" />
        <button onClick={props.AddTaskHandler}>Add Task</button>
        <button onClick={GroupTaskFilter}>View Group Task</button>
        <button onClick={()=>{History.push("/")}}>LoggedOut</button>
    </div>}
    </>
}
export default SearchTab;