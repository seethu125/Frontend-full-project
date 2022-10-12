import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import axios from 'axios';
export default function AddProduct() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [productName, setProductName] = useState("");
    const [productUrl, setProductUrl] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [dataLoading, setDataLoading] = useState(false);
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    const handleSubmit = () => {
        axios.post("http://localhost:8080/add/product", {

            productName,
            productUrl,
            productPrice

        }).then((response) => {
            if (response.data) { navigate("/catalog/products") }

        }).catch((error) => console.log(error))
    }
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);
    return (
    <>
        { dataLoading ? <div>Loading .......</div>:
                <Box
            component = "form"
            sx = {{
                padding: '40px',
                    '& .MuiTextField-root': { m: 1, width: '75%' },
                '& .MuiButtonBase-root': { m: 1, width: '75%' },
            }
        }
            noValidate
    autoComplete = "off"
    onSubmit = { handleSubmit }>
        <div>
            <TextField
                required
                id="product_name"
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
                required
                id="product_url"
                label="Product Url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
            />

            <TextField
                id="product_price"
                label="Price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
            />
            <Button type="submit">Submit</Button>
        </div>
        </Box >
          }</>
    );
}
