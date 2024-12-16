import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductTypeList } from 'types';

// create types
interface wishlistTypes {
    wishlistItems: ProductTypeList[];
};

type AddWishlistProductType = {
    product: ProductTypeList,
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
        addProductToWishlist: (state, action: PayloadAction<AddWishlistProductType>) => {
            const existingProductIndex = findProductInWishlist(state, action.payload.product);


            if (existingProductIndex === -1) {
                state.wishlistItems.push(action.payload.product);
            }
        },

        // function for remove product from wishlist
        removeProductFromWishlist: (state, action: PayloadAction<ProductTypeList>) => {
            const productIndex = findProductInWishlist(state, action.payload);

            if (productIndex !== -1) {
                state.wishlistItems.splice(productIndex, 1)
            }
        }
    }
});

export const { addProductToWishlist, removeProductFromWishlist } = shoppingWishlistSlice.actions;

export default shoppingWishlistSlice.reducer;