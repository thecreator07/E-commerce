import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    isAuth: false,
    accessToken: null,
    refreshToken: null,
    // role: "user",
    product: null,
    cart: null,
    totalItems: null,
    totalPrice: null
}

export const userslice = createSlice({
    name: "Analytics",
    initialState,
    reducers: {
        setLogin(state, action) {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.isAuth = true
        },
        setlogOut(state, action) {
            state.accessToken = null
            state.user = null
            state.refreshToken = null
            state.isAuth = false
        },
        setsearchData(state, action) {
            const { product } = action.payload
            state.product = product
        },
        setcart(state, action) {
            const { cart, totalPrice, totalItems } = action.payload
            state.cart = cart
            state.totalItems = totalItems
            state.totalPrice = totalPrice
        }

    }
})

export const { setLogin, setsearchData, setlogOut, setcart } = userslice.actions

export default userslice.reducer