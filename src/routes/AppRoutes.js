import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import CartPage from "../cart/CartPage";
import Home from "../home/Home";
import HomePage from "../home/HomePage";
import AddProductPage from "../product/AddProductPage";
import ProductCatalog from "../product/ProductCatalogPage";
import LoginPage from "../register/LoginPage";
import RegisterPage from "../register/RegisterPage";
import Reset from "../register/Reset";

export default function AppRoutes({children}) {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={< LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage />} />
                    <Route exact path="/home" element={<HomePage />} />
                    <Route exact path="/catalog/products" element={<ProductCatalog />} />
                    <Route exact path="/cart" element={<CartPage />} />

                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route path="/catalog/addProduct" element={<AddProductPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}