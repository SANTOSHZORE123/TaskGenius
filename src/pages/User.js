import React, { useEffect, useState } from "react"
import SearchTab from "../Components/SearchTab"
import Task from "../Components/Task";
import AddComponent from "../Components/AddComponent"
import "./User.css"
const User=()=>{
     // Get the query string from the URL
     const queryString = window.location.search;

     // Create a URLSearchParams object to parse the query string
     const queryParams = new URLSearchParams(queryString);
     console.log(queryParams)
     const usernames=[]
     queryParams.forEach((value, key) => {
      usernames.push({[key]:value})
      // You can store or manipulate the key-value pairs as needed here
    });


    const [currTargetElement,setTargetElement]=useState([])
    const [openModal,setOpenModal]=useState(false);
     const [TaskData,setTask]=useState([]);
     const [PrevData,setPrevData]=useState([]);
     const [loading,setLoading]=useState(false);
    const [isLoading,setIsLoading]=useState()



     const preLoadTask=async()=>{
      setIsLoading(true)
      const Response=await fetch("https://taskgenius-38db1-default-rtdb.firebaseio.com/Task.json");
      const data=await Response.json();
      const LoadedTask=[]
      for(let key in data){
         if(data[key].Author===usernames[0].name){
            LoadedTask.push({
               id:key,
               description:data[key].desc,
               completed:data[key].completed,
               createdAt:data[key].createdAt
            })
         }
      }
      console.log(LoadedTask,'hii')
      setTask(LoadedTask)
      setPrevData(LoadedTask)
      setIsLoading(false)
     }
     useEffect(()=>{
      console.log("fetching")
        preLoadTask()
     },[loading])

     //setting values based on user input
     const filterTask=(value)=>{
         const newTask=PrevData.filter((element)=>{
            return element.description.toLowerCase().includes(value.toLowerCase())
         })
         setTask(newTask)
     }

     const updateHandler=(id)=>{
         console.log(id,'update')
         const TargetElement=TaskData.filter((element)=>{
            return element.id===id;
         })
         console.log(TargetElement)
         setOpenModal(true)
         setTargetElement(TargetElement)
     }



      const deleteHandler = async (id) => {
      setIsLoading(true)
      const documentId = id; // Replace with the ID of the document you want to delete
      const deleteUrl = `https://taskgenius-38db1-default-rtdb.firebaseio.com/Task/${documentId}.json`;

      try {
         const response = await fetch(deleteUrl, {
            method: 'DELETE',
         });

         if (response.ok) {
            console.log('Document successfully deleted!');
            // Handle any additional actions after deletion
         } else {
            console.error('Error deleting document:', response.statusText);
         }
      } catch (error) {
         console.error('Error deleting document:', error);
      }
      setLoading(!loading)
      setIsLoading(false)
      };



     const AddTaskHandler=()=>{
         setOpenModal(true);
         setTargetElement([])
     }
    return <>
    <SearchTab filterTask={filterTask} Authenticate={true} AddTaskHandler={AddTaskHandler}/>
   {isLoading===true&&<h2>Tasks Are loading Please Wait...</h2>}
   {TaskData.length===0&&isLoading===false&&<h2>No Task Created Yet</h2>}
    <div className="ParentContainer">
      {openModal&&<AddComponent Author={usernames[0].name} loadItems={()=>setLoading(!loading)}OpenModalHandler={()=>setOpenModal(false)} TargetElement={currTargetElement}/>}
     {TaskData.map((element)=>{
      return <Task key={element.id} description={element.description} completed={element.completed} createdAt={element.createdAt} updateHandler={updateHandler.bind(null,element.id)} deleteHandler={deleteHandler.bind(null,element.id)}></Task>
     })}
    </div>
    </>
}
export default User