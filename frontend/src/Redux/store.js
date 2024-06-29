import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


// export const store = configureStore({
//     reducer: todoReducer
// })


const persistConfig = {
    key: "root",
    storage,
    userReducer,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});
