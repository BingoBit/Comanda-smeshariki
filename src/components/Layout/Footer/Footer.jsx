import { NavLink } from "react-router"
import style from "./Footer.module.css"

export const Footer = () => {
    return(
    <div className={style.footerBG} >
        <div className={style.footerContainer}>
            <div className={style.footerContacts}>
                <div className={style.contactInfo}>
                    <h1>Адрес</h1>
                    <p>г. Москва, ул. Электротехническая, д. 47, стр. 2, ТЦ «ТехноПарк», 1 этаж</p>
                </div>
                <div className={style.contactInfo}>
                    <h1>Если у вас есть вопросы</h1>
                    <p>Электронная почта: aplnmarket@gmail.com</p>
                    <p>Контактный телефон: +79826342801</p>
                </div>
                <iframe
                className={style.contactInfo} 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aff528a4365eeab6652faffe6ef265ac67d582b5d90db29f5aa5d141a9e791404&amp;source=constructor"  
                frameBorder={0}
                >
                </iframe>
            </div>
        </div>
    </div>
    )
}