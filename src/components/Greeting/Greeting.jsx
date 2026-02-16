import { useEffect, useState } from "react";
import style from "./Greeting.module.css";
import { basename } from "../../consts";

export const Greeting = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const greetingImages = [
        `${basename}/img/greeting_image1.png`,
        `${basename}/img/greeting_image2.png`,
        `${basename}/img/greeting_image3.png`,
        `${basename}/img/greeting_image4.png`,
    ]


    useEffect(() => {
        let timer = setInterval(() => {
            if(currentIndex >= greetingImages.length-1){
                setCurrentIndex(0)
            }
            else{
                setCurrentIndex(currentIndex+1)
            }
        }, 4000)

        return () => clearInterval(timer)
    })
    
    return(
        <div className={style.greetingContainerBG}>
            <div className={style.greetingContainer}>
                <div className={style.message_container}>
                    <img src={`${basename}/img/greeting_message.svg`} />
                </div>
                <div className={style.image_container}>
                    <div style={{
                        backgroundImage:`url(${greetingImages[currentIndex]})`,
                        height:"400px",
                        width:"720px",
                        transition: "all 500ms ease",
                        }}>
                    </div>
                </div>
            </div>
        </div>
    )
}