import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import React from 'react';
const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export default function ProductContextProvider  ({ children }){
    const [products, setProducts] = useState()
    const [cart, setCart] = useState()
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (user && !products) {
            axios.get("http://localhost:8080/list/products")
                .then((response) => {
                    if (response.data) {
                        setProducts(response.data)
                    }
                }
            )

           
        }
        if (user && !cart) {
            getCartProducts();
        }
    }, [user])

    const getCartProducts = () => {
        axios
            .get("http://localhost:8080/cart/get?cartId=0&emailId=" + user.email)
            .then((response) => {
                debugger;
                setCart(response.data);
        })
    }

    const addToCart = (payload) => {
        debugger;
        axios.post("http://localhost:8080/cart/save", 
            {...payload }
        )
            .then((response) => {
                if (response.data) {
                    getCartProducts();
                }
         })
    }
    const getAllProducts = () => {
        axios.get("http://localhost:8080/list/products")
            .then((response) => {
                if (response.data) {
                    setProducts(response.data)
                }
            }
         )
    }
    const saveProduct = (payload) => {
        axios.post("http://localhost:8080/add/product", JSON.stringify({...payload }))
            .then((response) => {
                if (response.data) {
                    getAllProducts();
                }
            }
            )
    }

    return (<ProductContext.Provider value={{ products, getAllProducts, saveProduct, cart, addToCart}}>
        { children}
    </ProductContext.Provider>)


}

