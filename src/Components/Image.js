import React, { useEffect, useState, useContext } from "react"
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../firebase"
import Choices from "./Choice"
import { MyGame } from "../Context/Context"
import "./Image.css"


const Image = () => {
    const {getCursor, showOps, setOps } = useContext(MyGame)
    const [imgLinks, setLinks] = useState([])
    const [pos, setPos] = useState({ top: 0, left: 0 })

    useEffect(() => {
        const pic = async () => {
            const source = ref(storage, 'images/1.png')
            const url = await getDownloadURL(source)
            setLinks(i => ([url]))
        }
        pic()
    }, [])

    const handleMove = (e) => {
        if (showOps === false) {
            let lens = document.querySelector(".overlay")
            let w = lens.offsetWidth / 2
            let h = lens.offsetHeight / 2
            let cur = getCursor(e)
            let x_pos = cur.x
            let y_pos = cur.y
            if (x_pos > cur.width - w) { x_pos = cur.width - w }
            if (x_pos < w) { x_pos = w }
            if (y_pos > cur.height - h) { y_pos = cur.height - h }
            if (y_pos < h) { y_pos = h }
            setPos({ ...pos, top: y_pos - w, left: x_pos - h })
        }
    }


    const asdf = () => {
        setOps(true)
    }

    return (
        <div className="holder">
            <div className="overlay" onMouseMove={e => handleMove(e)} onClick={() => asdf()}
                style={{
                    left: `${pos.left}px`, top: `${pos.top}px`,
                    backgroundPosition: `${pos.left}px ${pos.top}px`
                }}>
                {showOps === true ? <Choices /> : null}
            </div>
            <img src={`${imgLinks}`} alt="" onMouseEnter={e => handleMove(e)} onClick={e => handleMove(e)} ></img>
        </div>
    )
}

export default Image

//                