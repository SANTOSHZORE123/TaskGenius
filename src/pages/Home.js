import React from "react"
import Slider from "../Components/Slider"
import SearchTab from "../Components/SearchTab"
import "./Home.css"
const Home=()=>{
    return <>
        <SearchTab Authenticate={false}/>
        <div className="SliderCont">
         <Slider/>
        </div>
    </>
}
export default Home