import { Greeting } from "../Greeting/Greeting"
import style from "./Catalog.module.css"
import { act, useEffect, useState } from "react"
import { GOODS } from "../../consts"
import ReactPaginate from "react-paginate"
import { Item } from "../Item/Item"

export const Catalog = (props) => {
    const {handleFavours,  handleAddCart, items, setItems, searchedItems, setSearchedItems, handleAddRecently} = props
    const [searchValue, setSearchValue] = useState("")
    const [activeTitle, setActiveTitle] = useState(null)
    let [isSortActive, setIsSortActive] = useState(null)
    const [sortStatus, setSortStatus] = useState("")

    const availableTitle = ["Крупная бытовая техника", "Техника для дома", "Техника для кухни"]
    const itemsPerPage = 12
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage 
    const currentItemsOnPage = searchedItems.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(searchedItems.length/itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected  * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const search = (query, items, title) => {
        if(!query.trim()){return items}
        let normQuery = query.toLowerCase()
        return items.filter(item => {
            const words = item.name.toLowerCase().split(" ")
            return words.some(word => word.includes(normQuery))
        })
    }

    const handleChangeQuery = (event) => {
        setSearchValue(event.target.value.toLowerCase())
    }
    
    const chooseTitle = (title) => {
        if(title === "all"){
            setItems(GOODS)
            setActiveTitle(null)
            setSearchValue("")
        }
        else{
            setItems(GOODS.filter(el => el.title === title ))
        }
        setSearchValue("")
        setItemOffset(0)
    }

    const setSorting = (type) => {
        if(type === "decreasing"){
            setSearchedItems(items => items.sort((a,b) => b.price - a.price))
            setSortStatus("По убыванию: Цена")
        }
        else if(type === "increasing"){
            setSearchedItems(items => items.sort((a,b) => a.price - b.price))
            setSortStatus("По возрастанию: Цена")
        }
        setIsSortActive(false)
        setItemOffset(0)
    }



    useEffect(() => {
        const results = search(searchValue, items, activeTitle)
        setSearchedItems(results)
    },[searchValue, items])

    return(
        <>
        <Greeting />
        <div id="catalog" className={style.catalog_container}>
            <h1 style={{color:"white", paddingLeft:"20px"}}>Каталог</h1>
            <hr style={{border:"1px solid white", width:"95%"}}/>
            <div className={style.catalogs_panels}>
                <div className={style.filters_panel}>
                    <h1>Поиск</h1>
                    <div className={style.search_container}>
                        <input type="text" onChange={handleChangeQuery} value={searchValue} placeholder="Введите название"/>
                    </div>
                    <h1>Категория</h1>
                    <div className={style.categories_container}>
                        {availableTitle.map((el,index) => (
                            <div key={index} className={style.category_button} >
                                <div
                                    className={style.category_title}  
                                    onClick={() => {chooseTitle(el), setActiveTitle(index)}}
                                    style={{background:activeTitle === index ? "linear-gradient(-45deg, #378D5A, #27332C)": '', color:activeTitle === index ? "white" : ''}}
                                >
                                    {el}
                                </div>
                                {activeTitle === index ? <div className={style.cancel_button} onClick={() => chooseTitle("all")} >X</div> : ''}
                            </div>
                        ))}
                    </div>
                    <h1>Сортировка</h1>
                    <div className={style.sort_container}>
                        <div 
                            className={`${style.sort_open} ${isSortActive ? style.active :""}`}
                            style={{background:sortStatus !== ""? "linear-gradient(-45deg, #378D5A, #27332C)" : "none", color:sortStatus !== "" ? "white" : "black"}} 
                            onClick={() => setIsSortActive(isSortActive = !isSortActive)}>
                            <div>{sortStatus === "" ? "Выберите сортировку" : sortStatus}</div>
                            <span className={`${style.sort_arrow} ${isSortActive ? style.active :""}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 9l8 8l8-8"></path>
                                </svg>
                            </span>
                        </div>
                        <ul className={style.sort_options} style={{display: isSortActive ? 'flex':'none'}}>
                            <li onClick={() => setSorting("decreasing")}>По убыванию: Цена</li>
                            <li onClick={() => setSorting("increasing")}>По возрастанию: Цена</li>
                        </ul>
                    </div>
                </div>
                <div className={style.items_panel}>
                    <div className={style.items}>
                        {currentItemsOnPage.length === 0? 
                        <h1 style={{color:"white"}}>Ничего не найдено</h1>
                        :
                        currentItemsOnPage.map(el => (
                            <Item item={el} key={el.id} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently} />
                        ))}
                    </div>
                    <ReactPaginate 
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        containerClassName={style.containerClassName}
                        pageClassName={style.pageClassName}
                        pageLinkClassName={style.pageLinkClassName}
                        pageLabelBuilder={style.pageLabalBuilder}
                        nextClassName={style.nextContainer}
                        breakClassName={style.break}
                        previousClassName={style.previousContainer}
                    />  
                </div>
            </div>
        </div>
        </>
    )
}