const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    showCart:false,
    notification:null
};
const uiSlice=createSlice({
    name:"uiSlice",
    initialState,
    reducers:{
        
        cartToggle(state){
            state.showCart = !state.showCart;
        },
        showNotification(state,action){
            state.notification = {status:action.payload.status,title:action.payload.title,message:action.payload.message};
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;