import React from "react"
import SearchTab from "../Components/SearchTab"
import "./Login.css"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useRef } from "react"
const Login=()=>{
    const History=useHistory()
    const [UserData,setUser]=useState([])
    const [Authenticated,setAuthenticated]=useState(false)
    const [NameError,setNameError]=useState(false)
    const [PassWordError,setPasswordError]=useState(false)

    const UserName=useRef()
    const PassWord=useRef()

    const[LoginFailed,setLoginFailed]=useState(false)

    //loading user data to check user present in database or not
    const preloaddata=async()=>{
        const response=await fetch("https://taskgenius-38db1-default-rtdb.firebaseio.com/user.json")
        const data=await response.json();
        const loadedUsers=[]
        for(let key in data){
            loadedUsers.push({
            id:key,
            username:data[key].username,
            password:data[key].password
            })
        }
        setUser(loadedUsers);
    }
    useEffect(()=>{
        preloaddata()
    },[])
    


    //user submit handler function
    const submitHandler=(e)=>{
        console.log(e)
        e.preventDefault()

        //checking validation
        if(UserName.current.value.length===0){
            setNameError(true)
            return
        }else{
            setNameError(false)
        }
        if(PassWord.current.value.length<8){
            setPasswordError(true)
            return
        }
        setPasswordError(false)


        const UserDetail=UserData.filter((element)=>{
            if(UserName.current.value===element.username&&PassWord.current.value===element.password){
                return element;
            }
        })
        if(UserDetail.length>0){
            setAuthenticated(true)
            History.push("/User/?name="+UserName.current.value)
        }else{
            setLoginFailed(true)
            setAuthenticated(false)
            setTimeout(()=>{
                setLoginFailed(false)
                setAuthenticated(false)
            },2000)
        }
    }
    return <>
        <SearchTab Authenticate={Authenticated}/>
        {LoginFailed&&<h2>Login Failed...</h2>}
        <form className="LoginForm" onSubmit={submitHandler}>
            <h2>Login Form</h2>
            <div>
                <label htmlFor="Name">UserName: </label>
                <input ref={UserName} id="Name" name="Name" type="text"/>
                {NameError&&<p>Name should not be empty</p>}
            </div>
            <div>
                <label htmlFor="Password">PassWord: </label>
                <input ref={PassWord} id="Password" name="Password" type="password"/>
                {PassWordError&&<p>password must be at least 8 chars</p>}
            </div>
            <button className="submitB" type="submit">Submit</button>
        </form>
    </>
}
export default Login