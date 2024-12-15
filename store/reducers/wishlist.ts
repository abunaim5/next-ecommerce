import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductTypeList } from 'types';

// create types
interface wishlistTypes {
    wishlistItems: ProductTypeList[];
};

// initialize state for wished items
const initialState = {
    wishlistItems: []
} as wishlistTypes;

// function for find product index in wishlist
const findProductInWishlist = (state: wishlistTypes, product: ProductTypeList) => {
    return state.wishlistItems.findIndex(item => item.id === product.id);
};

const shoppingWishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // function for add product to wishlist
        addProductToWishlist: (state, action: PayloadAction<ProductTypeList>) => {
            const existingProductIndex = findProductInWishlist(state, action.payload);


            if (existingProductIndex === -1) {
                state.wishlistItems.push(action.payload);
            }
        }
    }
});

export const { addProductToWishlist } = shoppingWishlistSlice.actions;

export default shoppingWishlistSlice.reducer;