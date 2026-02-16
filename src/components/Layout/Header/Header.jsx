import { useEffect, useState } from "react"
import style from "./Header.module.css"
import { NavLink, useLocation } from "react-router"
import { basename } from "../../../consts"


export const Header = (props) => {
    
    const {cartItems,favoursItems} = props
    const [windowWidth, setWindowWidth] = useState(0)
    let [burgerMenu, setBurgerMenu] = useState(false)
    const [headerStyle, setHeaderStyle] = useState({
        background:"none",
        color:"black"
    })

    const location = useLocation()

    useEffect(() => {
        setBurgerMenu(false)
    },[location])

    return(
        <>
            <div className={style.headerContainer} >
                <div className={style.menu}>
                    <div className={style.nav}>
                        <NavLink to={"/"}>Каталог</NavLink>
                        <NavLink to={"aboutus"}>О нас</NavLink>
                        <NavLink to={"contacts"}>Контакты</NavLink>
                    </div>
                    <NavLink to={"/"} className={style.logo} ><img alt="logo" src={`${basename}/img/Logo2.svg`} style={{cursor:"pointer"}} /></NavLink>
                    <div className={style.nav}>
                        <NavLink to={"profile"}>Профиль</NavLink>
                        <NavLink id={style.deliverIcon} to={'/cart'}>Корзина<div className={`${style.counterCart} ${cartItems.length != 0 ? style.active: style.noactive}`}>{cartItems.length}</div></NavLink>
                        <NavLink to={'favours'}>Избранное</NavLink>
                    </div>
                </div>
                <div className={style.mobileMenu}>
                    <NavLink to={""} className={style.logo} ><img alt="logo" src={`${basename}/img/Logo2.svg`} style={{cursor:"pointer"}} /></NavLink>
                    <img src={`${basename}/img/burger_menu.svg`}  style={{cursor:"pointer"}} onClick={() => setBurgerMenu(burgerMenu = !burgerMenu)}/>
                </div>
                {burgerMenu && (
                    <div className={style.burger_menu}>
                        <div className={style.burger_nav}>
                            <NavLink to={"/"}>Каталог</NavLink>
                            <NavLink to={"aboutus"}>О нас</NavLink>
                            <NavLink to={"contacts"}>Контакты</NavLink>
                            <NavLink to={"profile"}>Профиль</NavLink>
                            <NavLink to={'/cart'}>Корзина <div className={`${style.counter} ${cartItems.length != 0 ? style.active: style.noactive}`}>{cartItems.length}</div></NavLink>
                            <NavLink to={'favours'}>Избранное<div className={`${style.counter} ${favoursItems.length != 0 ? style.active: style.noactive}`}>{favoursItems.length}</div></NavLink>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}