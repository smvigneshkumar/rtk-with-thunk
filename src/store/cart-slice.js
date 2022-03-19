import { uiActions } from "./ui-slice";
const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    items:[],
    totalQuantity:0,
    changed:false
};
const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        replaceCart(state,action){
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addProductToCart(state,action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.changed =true;
            if(existingItem){
                existingItem.quantity++;
                existingItem.total = existingItem.total+newItem.price;
            }else{
                state.items.push({
                    id:newItem.id,
                    title:newItem.title,
                    price:newItem.price,
                    total:newItem.price,
                    quantity:1
                });
                state.totalQuantity = state.totalQuantity + 1;
            }
        },
    
        removeProductFromCart(state,action){
            const newItemId = action.payload;
            const existingItem = state.items.find(item => item.id === newItemId);
            state.changed =true;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== newItemId);
                state.totalQuantity = state.totalQuantity - 1;
            }else{
                existingItem.quantity--;
                existingItem.total = existingItem.total-existingItem.price;
            }
        }
    }
});
export const sendCartData = (cart,quantity) =>{
    return async(dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Sending.....",
              message: "Sending cart data to server",
            })
          );

          const sendCartRequest = async() => {
            const response = await fetch(
                "https://react-http-request-6538b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
                {
                  method: "PUT",
                  body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
                }
              );
        
              if (!response.ok) {
                throw new Error("Sending cart to the server failed");
              }
          }; 
          try {
            await sendCartRequest();
            dispatch(
                uiActions.showNotification({
                  status: "success",
                  title: "Cart data sent",
                  message: "Send cart data to server success",
                })
              );
          } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error",
                  message: "Send cart data to server failed.",
                })
              );
          }
    };
};

export const fetchCartData = () => {
    return async(dispatch) =>{
        const fetchCartRequest = async() => {
            const response = await fetch("https://react-http-request-6538b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");
        
            if (!response.ok) {
                throw new Error("Sending cart to the server failed");
            }
            const responseData = await response.json();
            return responseData;
        }; 

        try {
            const data = await fetchCartRequest();
            dispatch(cartActions.replaceCart({items:data.items || [],totalQuantity:data.totalQuantity}));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error",
                  message: "Send cart data to store failed.",
                })
            );
        }
    };
}

export const cartActions = cartSlice.actions;

export default cartSlice;