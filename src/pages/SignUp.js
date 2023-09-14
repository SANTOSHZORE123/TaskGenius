import React from "react"
import "./SignUp.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SearchTab from "../Components/SearchTab"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
const SignUp=()=>{
    const History=useHistory()
    const [NameError,setNameError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    const [confirmError,setconfirmError]=useState(false);
    const [emailError,setemailError]=useState(false);
    const [prevUserData,setPreviousUserData]=useState([])
    const [ExistingUser,setExistingUser]=useState(false)

    const Username=useRef()
    const Password=useRef()
    const Email=useRef()
    const Confirm=useRef()


    

    //preload user
    const FetchData=async()=>{
        const response=await fetch("https://taskgenius-38db1-default-rtdb.firebaseio.com/user.json")
        const data=await response.json()
        console.log(data)
        const loadedUsers=[]
        for(let key in data){
            loadedUsers.push({
            id:key,
            username:data[key].username
            })
        }
        setPreviousUserData(loadedUsers)
    }

    useEffect(()=>{
        FetchData()
    },[])

    const submitHandler=async(e)=>{
        e.preventDefault()
        if(Username.current.value.length===0){
            setNameError(true)
            return
        }else{
            setNameError(false)
        }
        if(Password.current.value.length<8){
            setPasswordError(true)
            return
        }
        else{
            setPasswordError(false)
        }
        if(!Email.current.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            setemailError(true)
            return
        }
        else{
            setemailError(false)
        }
        if(Confirm.current.value!==Password.current.value){
            setconfirmError(true)
            return
        }
        const filteredData=prevUserData.filter((element)=>{
            return element.username===Username.current.value
        })

        if(filteredData.length>0){
            setExistingUser(true)
            return;
        }
        setconfirmError(false)
        setExistingUser(false);
        await fetch("https://taskgenius-38db1-default-rtdb.firebaseio.com/user.json",{
            method:'POST',
            body:JSON.stringify({
                username:Username.current.value,
                password:Password.current.value,
                email:Email.current.value
            })
        })
        History.push("/User/?name="+Username.current.value)
        
    }

    return <>
        <SearchTab Authenticate={false}/>
        <form className="SignUpForm" onSubmit={submitHandler}>
            <h2>SignUp Form</h2>
            <div>
                {ExistingUser&&<p>UserName Already Exist</p>}
                <label htmlFor="Name">UserName: </label>
                <input ref={Username} id="Name" name="Name"type="text"/>
                {NameError&&<p>Username is required</p>}
            </div>
            <div>
                <label htmlFor="Email">Email-id&nbsp;:&nbsp;&nbsp; &nbsp;</label>
                <input ref={Email} id="Email" name="Email"type="email"/>
                {emailError&&<p>Email is invalid</p>}
            </div>
            <div>
                <label htmlFor="Password">PassWord&nbsp;: </label>
                <input ref={Password} id="Password" name="Password" type="password"/>
                {passwordError&&<p>password must be atleast 8 chars</p>}
            </div>
            <div>
                <label htmlFor="confirm">Confirm&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <input ref={Confirm} id="confirm" name="confirm" type="password" placeholder="Enter password again"/>
                {confirmError&&<p>Confirm password not maching</p>}
            </div>
            <button className="submitB"type="submit">Submit</button>
        </form>
    </>
}
export default SignUp