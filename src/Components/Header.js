import React, { useContext} from "react";
import { MyGame } from "../Constant/Context";
import { Link } from "react-router-dom";
import style from "../Styles/Header.module.css"
import Timer from "./Timer";

const Header = () => {
    const { data, gameState} = useContext(MyGame)
    let targ = data.filter(el => el.marked !== true)

    const gameHeader = () => {
        return (
            <div className={style.container}>
                <nav ><Link to="/"  className={style.links} >Home</Link></nav>
                <div className={style.marks}>
                    {targ.map((item) => {
                        return (
                            <div key={item.id} className={style.mark}>
                                <p>{item.name}</p>
                                <img src={`${item.link}`} className={style.pic} alt={`${item.name}`}></img>
                            </div>
                        )
                    })}
                    <Timer/>
                </div>
                <nav ><Link to="/leaderboard" className={style.links} >Leaderboard</Link></nav>
            </div>
        )
    }

    const normHeader = () => {
        return (
            <nav className={style.container}>
                <Link to="/"  className={style.links} >Home</Link>
                <Link to="/leaderboard"  className={style.links} >Leaderboard</Link>
            </nav>
        )
    }

    return (
        (gameState) ? gameHeader() : normHeader()
    )
}

export default Header