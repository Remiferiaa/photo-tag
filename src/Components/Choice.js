import React, {useContext} from "react"
import { MyGame } from "../Context/Context"


const Choices = () => {
    const {data, setData, coordNow, setOps,showOps}  = useContext(MyGame)

    const choiceValid = (item) => {
        let lens = document.querySelector(".overlay")
        let w = lens.offsetWidth / 2
        let h = lens.offsetHeight / 2
        if((coordNow.x + w > item.x && coordNow.x - w < item.x ) || (coordNow.y + h > item.y && coordNow.y - h < item.y )) {
            rightChoice(item.id)
        }
    }
    
    const rightChoice = (id) => {
        setData(data.filter(item => item.id !== id))
        if(data.length -1  === 0) {
            alert("YouWin")
        }
    }

    const click = (e, item) => {
        e.stopPropagation();
        setOps(false)
        choiceValid(item)
    }
    return (
        <div className="options">
            {data.map((item) => (
                <button key={item.id} onClick={(e) => click(e, item)}>{item.name}</button>
            ))}
        </div>
    )
}

export default Choices
