import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductStoreType } from './../../types/index';

// create types
interface wishlistTypes {
    wishlistItems: ProductStoreType[];
};

// type AddWishlistProductType = {
//     product: ProductStoreType,
//     count: number
// };

// initialize state for wished items
const initialState = {
    wishlistItems: []
} as wishlistTypes;

// function for find product index in wishlist
const findProductInWishlist = (state: wishlistTypes, product: ProductStoreType) => {
    return state.wishlistItems.findIndex(item => item.id === product.id);
};

const shoppingWishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // function for add product to wishlist
        addProductToWishlist: (state, action: PayloadAction<ProductStoreType>) => {
            const existingProductIndex = findProductInWishlist(state, action.payload);


            if (existingProductIndex === -1) {
                state.wishlistItems.push(action.payload);
            }
        }
    }
});

export const { addProductToWishlist } = shoppingWishlistSlice.actions;

export default shoppingWishlistSlice.reducer;