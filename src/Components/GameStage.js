import React, { useState, useContext, useEffect } from "react"
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase";
import Choices from "./Choice"
import { MyGame } from "../Constant/Context"
import style from "../Styles/GameStage.module.css"
import Timer from "./Timer"

const GameStage = () => {
    const { data, getCursor, imgLink, setGame, gameState, timer} = useContext(MyGame)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const [showOps, setOps] = useState(false)
    const [gameOver, setOver] = useState(false)
    const [name, setName] = useState('')
    const [wrong, setWrong] = useState(false)

    useEffect(() => {
        if (data.every(el => el.marked === true) && data.length > 0) {
            setOver(true)
            setGame(false)
        }
    }, [data])

    useEffect(() => {
        setOver(false)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setWrong(false)
        }, 1500)
    }, [wrong])


    const load = () => {
        setGame(true)
    } 

    const trigOps = () => {
        setOps(true)
    }

    const handleMove = (e) => {
        if (showOps === false) {
            let lens = document.querySelector("#overlay")
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
            setOps(false)
        }
    }

    async function saveMessage(e, user, time) {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'clear'), {
                name: user,
                record: time,
            });
        }
        catch (error) {
            console.error('Error writing new message to Firebase Database', error);
        }
        window.location.href = '#/leaderboard'
    }

    return (
        <div className={style.holder}>
            <div className={`${wrong ? `${style.announ} ${style.wrong}` : `${style.announ}`}`} >Try Again!</div>
            <div className={`${gameState ? `${style.overlay}` : ""}`} id="overlay" onMouseMove={(e) => handleMove(e)} onClick={() => trigOps()}
                style={{
                    left: `${pos.left}px`, top: `${pos.top}px`,
                }}>
                {(showOps) ? <Choices setter={setOps} setWrong={setWrong} /> : null}
            </div>
            <div className={`${gameOver ? `${style.resultHolder}` : ""}`}>
                {(gameOver) ?
                    <form className={style.result} onSubmit={(e) => saveMessage(e, name, timer)}>
                        <p className={style.congrats}> Congratulations!</p>
                        <div className={style.clearTime}>Clear Time: <Timer /></div>
                        <label htmlFor="name"></label>
                        <input className={style.input} value={name} name="name" id="name"
                            onChange={(e) => setName(e.target.value)} autoComplete='off' placeholder="Enter Your Name" required></input>
                        <button className={style.btn}>Add</button>
                    </form>
                    : null}
            </div>
            <img className={style.pic} id="gamePic" src={`${imgLink}`} onLoad={() => load()} alt="" onClick={e => handleMove(e)} ></img>
        </div>

    )
}

export default GameStage

