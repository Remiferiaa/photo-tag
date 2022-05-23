import React, { useState, useEffect } from "react"
import {collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


export const MyGame = React.createContext(null)
const GameProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [showOps, setOps] = useState(false)
    const [coordNow, setCoord] = useState({x:0 , y:0})

    useEffect(() => {
        winCond()
    }, [])

    const winCond = async () => {
        const fetcher = await getDocs(collection(db, "winCondition"))
        let cond = []
        fetcher.forEach(item => {
            cond.push(item.data().Targets)
        })
        setData(...cond)

    }
    const getCursor = (e) => {
        let x = 0;
        let y = 0;
        let img = document.querySelector("img")
        let imgDimen = img.getBoundingClientRect()
        x = e.pageX - imgDimen.left - window.scrollX;
        y = e.pageY - imgDimen.top - window.scrollY;
        setCoord({x:x, y:y})
        return { x: x, y: y, width: imgDimen.width, height: imgDimen.height }
    }

    const methods = {
        data,
        setData,
        getCursor,
        coordNow,
        showOps,
        setOps,
    }

    return (
        <MyGame.Provider value={methods}>
            {children}
        </MyGame.Provider>
    )
}

export default GameProvider