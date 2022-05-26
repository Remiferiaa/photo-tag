import React, { useState, useEffect, useRef } from "react"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../firebase"


export const MyGame = React.createContext(null)
const GameProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [coordNow, setCoord] = useState({ x: 0, y: 0 })
    const [imgLink, setLink] = useState([])
    const [gameState, setGame] = useState(false)
    const [timer, setTimer] = useState(0)
    const start = useRef(null)

    useEffect(() => {
        pic()
        winCond()
    }, [])

    const pic = async () => {
        const source = ref(storage, 'images/1.png')
        const url = await getDownloadURL(source)
        setLink(i => ([url]))
    }

    const winCond = async () => {
        const fetcher = await getDocs(collection(db, "winCondition"))
        let cond = []
        fetcher.forEach(item => {
            cond.push(item.data().Targets)
        })
        setData(...cond)
    }

    const getCursor = (e) => {
        let img = document.querySelector("#gamePic").getBoundingClientRect()
        let x = 0;
        let y = 0;
        x = e.pageX - img.left - window.scrollX;
        y = e.pageY - img.top - window.scrollY;
        setCoord({ x: x, y: y })
        return { x: x, y: y, width: img.width, height: img.height }
    }


    const reset = () => {
        pic()
        winCond()
        setGame(false)
        setTimer(0)
    }

    const methods = {
        data,
        setData,
        getCursor,
        coordNow,
        imgLink,
        gameState,
        setGame,
        reset,
        start,
        timer,
        setTimer,
    }

    return (
        <MyGame.Provider value={methods}>
            {children}
        </MyGame.Provider>
    )
}

export default GameProvider