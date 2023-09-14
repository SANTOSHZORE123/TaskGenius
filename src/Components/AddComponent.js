import React from "react"
import "../pages/Login.css"
import { useState } from "react"
import { useEffect } from "react"
import Modal from "../UI/Modals";
const AddComponent=(props)=>{
    const Targetlength=props.TargetElement.length;
    const [descriptionError,setDescriptionError]=useState(false)
    const [CompletedError,setCompletedError]=useState(false)
    
    const [description,setdescription]=useState(props.TargetElement.length>0?props.TargetElement[0].description:"")
    const [completed,setcompleted]=useState(props.TargetElement.length>0?props.TargetElement[0].completed:"")
    
    const [isLoading,setIsLoading]=useState(false)



    const validation=(e)=>{
        console.log(e)
        e.preventDefault()

        //checking validation
        if(description.length===0){
            setDescriptionError(true)
            return false
        }else{
            setDescriptionError(false)
        }
        if(completed.toLowerCase()!=='false'&&completed.toLowerCase()!=='true'){
            setCompletedError(true)
            return false
        }
        setCompletedError(false)
        return true;
    }



    //Task Update handler function

    const UpdatesubmitHandler = async (e) => {
        let today = new Date();
        let hr = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let time = hr + ':' + min + ':' + sec;
      
        if (!validation(e)) {
          return;
        }
        console.log('valid');
        setIsLoading(true)
        const documentId = props.TargetElement[0].id; // Replace with the ID of the document you want to update
        const updateUrl = `https://taskgenius-38db1-default-rtdb.firebaseio.com/Task/${documentId}.json`;
      
        const updatedData = {
          Author: props.Author,
          desc: description,
          completed: completed,
          createdAt: today + ' ' + time,
        };
      
        try {
          const response = await fetch(updateUrl, {
            method: 'PATCH', // Use PATCH to update specific fields, or 'PUT' to replace the entire document
            body: JSON.stringify(updatedData),
          });
          if (response.ok) {
              console.log('Document successfully updated!');
              props.loadItems();
            setIsLoading(false)
            props.OpenModalHandler();
          } else {
            console.error('Error updating document:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating document:', error);
        }
      };
      

    //task add handler
    const AddsubmitHandler=async(e)=>{
        let today = new Date();
        let hr=today.getHours()
        let min=today.getMinutes()
        let sec=today.getSeconds()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let time=hr+':'+min+':'+sec
        if(!validation(e)){
            return;
        }
        setIsLoading(true)
        console.log('valid')
        await fetch("https://taskgenius-38db1-default-rtdb.firebaseio.com/Task.json",{
            method:'POST',
            body:JSON.stringify({
                Author:props.Author,
                desc:description,
                completed:completed,
                createdAt:today+' '+time 
            })
        })
        setIsLoading(false)
        props.loadItems()
        props.OpenModalHandler()

    }



    console.log(props,"props")
    return <Modal onClose={props.OpenModalHandler}>
           <form className="AddTask" onSubmit={Targetlength>0?UpdatesubmitHandler:AddsubmitHandler}>
            {isLoading===true&&<h2>Processing Please Wait...</h2>}
            <h2>{Targetlength>0?'Update ':'Add '}Task</h2>
            <div>
                <label htmlFor="Name">description: </label>
                <input onChange={(e)=>setdescription(e.target.value)} id="Name" value={description}name="Username" type="text"/>
                {descriptionError&&<p>description should not be empty</p>}
            </div>
            <div>
                <label htmlFor="Completed">Completed: </label>
                <input onChange={(e)=>setcompleted(e.target.value)} id="Completed" value={completed} name="Completed" type="text"/>
                {CompletedError&&<p>completed must be either true or false</p>}
            </div>
            <button className="submitB" type="submit">{Targetlength>0?'Update':'Add'}</button>
        </form>
    </Modal>
}
export default AddComponent