import { ProductStoreType } from './../../types/index';

interface wishlistType {
    wishedItems: ProductStoreType[];
};

type AddWishedProductType = {
    product: ProductStoreType,
    count: number
};

const initialState = {
    wishedItems: []
} as wishlistType;