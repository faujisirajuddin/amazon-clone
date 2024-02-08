import { StoreProduct } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface productProps {
    productData: StoreProduct[],
    favoriteData: StoreProduct[],
    allProducts: StoreProduct[]
}

const initialState: productProps = {
    productData: [],
    favoriteData: [],
    allProducts: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.productData.find(
                (item: StoreProduct) => item._id === action.payload._id)
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload)
            }

        },
        addToFavorite: (state, action) => {
            const existingProduct = state.favoriteData.find(
                (item: StoreProduct) => item._id === action.payload._id)
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.favoriteData.push(action.payload)
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: StoreProduct) => item._id === action.payload._id)
            existingProduct && existingProduct.quantity++
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: StoreProduct) => item._id === action.payload._id)
            if (existingProduct?.quantity === 1) {
                existingProduct.quantity = 1
            } else {
                existingProduct!.quantity--
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
                (item) => item._id !== action.payload._id)
        },
        resetCart: (state) => {
            state.productData = []
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        }
    }
})

export const {
    addToCart,
    addToFavorite,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    resetCart,
    setAllProducts
} = productSlice.actions
export default productSlice.reducer