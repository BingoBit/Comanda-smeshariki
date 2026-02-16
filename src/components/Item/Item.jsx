import { useEffect, useState } from "react"
import style from "./Item.module.css"


export const Item = (props) => {

    const {item, handleAddCart, handleFavours, handleAddRecently} = props
    let [fullItem, setFullItem] = useState(false)
    
    


    useEffect(() => {
        if(fullItem){document.body.style.overflowY = "hidden"}
        else{document.body.style.overflowY = "scroll"}
    },[fullItem])

    return(
        <div className={style.item_card} >
            <svg className={`${style.favours} ${item.favours ? style.active : ''}`} onClick={() => handleFavours(item)} viewBox="0 0 1024 1024"><path fill="current" stroke="current" strokeWidth={"30px"} d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9"></path></svg> 
            <div className={style.item_information}>
                <div className={style.item_image}>
                    <img src={`${item.img}`} onClick={() => {setFullItem(fullItem = !fullItem), handleAddRecently(item)}} />
                </div>
                <div className={style.item_text}>
                    <p className={style.itemPrice}>{item.price}₽</p>
                    <h1>{item.name}</h1>
                    <p className={style.storageCount} style={{color:item.storage < 50? "red" : item.storage > 50 && item.storage < 200 ? "orange": "green" }}>{item.storage === 0? "Нет в наличии":"Количество на складе: " + item.storage}</p>
                    <button onClick={() => handleAddCart(item)}>В корзину</button>
                </div>
            </div>   
            {fullItem && (
                <div className={style.fullItemBG} >
                    <div style={{cursor:"pointer",width:"100vw", height:"100vh", position:"absolute", zIndex:"0"}} onClick={() => setFullItem(fullItem = !fullItem)}></div>
                    <div className={style.fullItemContainer}>
                        <div className={style.fullItemImageContainer}>
                            <svg className={`${style.favours} ${item.favours ? style.active : ''}`} onClick={() => handleFavours(item)} viewBox="0 0 1024 1024"><path fill="current" stroke="current" strokeWidth={"30px"} d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9"></path></svg> 
                            <img src={item.img} className={style.FullItemImg} onClick={() => setFullItem(fullItem = !fullItem)} />
                        </div>
                        <div className={style.fullItemTextContainer}>
                            <div className={style.fullItemTitleContainer}>
                                <h1 className={style.title}>{item.title}</h1>
                                <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path></svg>
                                <h1 className={style.category}>{item.category}</h1> 
                            </div>
                            <div className={style.fullItemName}>{item.name}</div>
                            <div className={style.fullItemDesc}>
                                <h1>КАКАЯ ТО ИНФОРМАЦИЯ О ТОВАРЕ</h1>
                            </div>
                            <div className={style.fullItemBottomPanel}>
                                <p style={{fontWeight:"500", marginTop:"20px", marginBottom:"20px",color:item.storage < 50? "red" : item.storage > 50 && item.storage < 200 ? "orange": "green" }}>{item.storage === 0? "Нет в наличии":"Количество на складе: " + item.storage}</p>
                                <div>
                                    <p className={style.fullItemPrice}>{item.price} ₽</p>
                                    <button onClick={() => handleAddCart(item)} className={style.addToCartButton} >В КОРЗИНУ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}