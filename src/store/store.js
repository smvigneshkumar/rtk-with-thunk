import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
const { configureStore } = require("@reduxjs/toolkit");
const store = configureStore({
    reducer:{
        cart:cartSlice.reducer,
        ui:uiSlice.reducer
    }
});

export default store;