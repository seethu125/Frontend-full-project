import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useProductContext } from '../providers/ProductContext';

export default function ProductCatalog() {
    const { products, addToCart,cart } = useProductContext();

    React.useEffect(() => {
        console.log("Products", products)
    },[products])

    const handleAddTocart = (item) => {
        debugger;
        addToCart({
            ...cart, products: cart && cart.products ?[...cart.products,item.productId]:[item.productId]
        });
    }

    return (
        <ImageList>
            {products && products.map((item) => (
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
                           
                                <AddIcon color="success" onClick={() => handleAddTocart(item)}/>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

