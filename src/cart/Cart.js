import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useProductContext } from '../providers/ProductContext';
import { ListSubheader } from '@mui/material';
import axios from 'axios';

export default function Cart() {
    const { cart } = useProductContext();
    const [cartProducts, setCartProducts] = React.useState();

    React.useEffect(() => {
        if (cart && cart.products) {
            axios
                .get("http://localhost:8080/cart/get/details?ids=" + cart.products)
                .then((response) => {
                    debugger;
                    setCartProducts(response.data);

                })
        }
    }, [cart])

    return (
        <ImageList>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Quantity of Products in Cart : {cart && cart.products && cart.products.length}</ListSubheader>
            </ImageListItem>
            {cartProducts && cartProducts.map((item) => (
                <ImageListItem key={item.productUrl}>
                    <img
                        src={`${item.productUrl}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.productUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.productName}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.productName}
                        subtitle={"Price : " + item.productPrice}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.quantity}`}
                            >
                                {item.quantity}
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

