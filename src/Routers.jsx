import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect, useMemo, useRef, useState } from 'react'
import { Header } from './components/Layout/Header/Header'
import { Footer } from './components/Layout/Footer/Footer'
import { GOODS } from './consts'
import { Catalog } from './components/Catalog/Catalog'
import { Favours } from './components/Favour/Favour'
import { AbouUs } from "./components/AboutUs/AboutUs";
import { Cart } from "./components/Cart/Cart";
import { Contacts } from "./components/Contacts/Contacts";
import { DeliveryForm } from "./components/DeliveryForm/DeliveryForm";
import { Profile } from "./components/Profile/Profile";
import { ProfileDisplay } from "./components/Profile/Displays/ProfileDisplay/ProfileDisplay";
import { OrdersDisplay } from "./components/Profile/Displays/OrderDisplay/OrdersDisplay";
import { FavourDisplay } from "./components/Profile/Displays/FavoursDisplay/FavoursDisplay";
  


export const Routers = () => {
    const [items, setItems] = useState(GOODS)
    const [cartItems, setCartItems] = useState([])
    const [favoursItems, setFavoursItems] = useState([])
    const [searchedItems,setSearchedItems] = useState([])
    const [recentlyItems, setRecentlyItems] = useState([])
    const [orders, setOrders] = useState([])
    const location = useLocation()


    const handleAddRecently = (item) => {
        const isInArray = recentlyItems.some(el => el.id === item.id)
        if(!isInArray){setRecentlyItems(prev => [item, ...prev])}
    }

    const handleAddCart = (item) => {
        if(item.storage != 0){
            const isInArray = cartItems.some(el => el.id === item.id)
            if(!isInArray){setCartItems(prev => [...prev, item])}
            setCartItems(cartItems => cartItems.map(item => ({...item, count:1})))
        }
        else{
            alert("Товара нет на складе, не волнуйтесь, пополнение скоро будет, приносим свои извинения!")
        }
    }
    
    const handleFavours = (item) =>{
        setCartItems(cartItems => {
            return cartItems.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
        setItems(items => {
            return items.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
        setRecentlyItems(items => {
            return items.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
    }

    const DeleteCartItems = (id) =>{
          setCartItems(cartItems => cartItems.filter(el=> el.id !== id))
    }

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    useEffect(() => {
        setFavoursItems(prev => {
            const favouredIds = new Set(
            items
                .filter(item => item.favours)
                .map(item => item.id)
            );

            const filteredPrev = prev.filter(item => favouredIds.has(item.id));

            const existingIds = new Set(filteredPrev.map(el => el.id));
            const newItems = items.filter(item => 
            item.favours && !existingIds.has(item.id)
            );
            
            return [...filteredPrev, ...newItems];
        });
    }, [items])


    return(
        <>
        <Header cartItems={cartItems} favoursItems={favoursItems} />        
        <div className="main">
            <Routes location={location} key={location.pathname}>
                <Route index element={<Catalog handleFavours={handleFavours} handleAddCart={handleAddCart} items={items} setItems={setItems} searchedItems={searchedItems} setSearchedItems={setSearchedItems} handleAddRecently={handleAddRecently} />}/>
                <Route path="/aboutus" element={<AbouUs />} />
                <Route path="/cart">
                    <Route index element={<Cart handleFavours={handleFavours}  cartItems={cartItems} setCartItems={setCartItems} DeleteCartItems={DeleteCartItems} />} />
                    <Route path="delivery-form" element={<DeliveryForm cartItems={cartItems} DeleteCartItems={DeleteCartItems} setItems={setItems} orders={orders} setOrders={setOrders} setCartItems={setCartItems} /> } />
                </Route>
                <Route path="/favours" element={<Favours handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently} favoursItems={favoursItems}   />} />
                <Route path="/contacts" element={<Contacts/>} />
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<ProfileDisplay favoursItems={favoursItems} orders={orders} recentlyItems={recentlyItems} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently} />} />
                    <Route path="orders" element={<OrdersDisplay orders={orders} />} />
                    <Route path="favours" element={<FavourDisplay favoursItems={favoursItems} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently} />} />
                </Route>
                    
            </Routes>
        </div>
        <Footer />
        </>
    )
}

