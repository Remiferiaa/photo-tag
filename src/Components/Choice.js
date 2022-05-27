import React, { useContext} from "react"
import { MyGame } from "../Constant/Context"
import style from '../Styles/Choice.module.css'


const Choices = (props) => {
    const { data, setData, coordNow, getCursor} = useContext(MyGame)
    let targ = data.filter(el => el.marked !== true)

    const choiceValid = (e, item) => {
        e.stopPropagation();
        let lens = document.querySelector("#overlay")
        let img = getCursor(e)
        let delWidth = (1 + ((1424 - img.width) / img.width))
        let delHeight = (1 + ((1960.5 - img.height) / img.height))
        let w = lens.offsetWidth / 2
        let h = lens.offsetHeight / 2
        let x = item.x / delWidth
        let y = item.y / delHeight
        if ((coordNow.x + w > x && coordNow.x - w < x) && (coordNow.y + h > y && coordNow.y - h < y)) {
            setData(data.map(el => ((el.id === item.id) ? {...el, marked: true} : el )))
        } else {
            props.setWrong(true)
        }
        props.setter(false)
    }

    return (
        <div className={style.options}>
            {targ.map((item) => (
                <button className={style.btn} key={item.id} onClick={(e) => choiceValid(e, item)}>{item.name}</button>
            ))}
        </div>
    )
    
}

export default Choices
