import {createSlice } from '@reduxjs/toolkit';

// const initialState={
//   user:null
// }

 const userSlice = createSlice({
  name:'user',
  initialState:{
    user:null,
  },
  reducers: {

    login:(state, action) => {
      //The expression action.payload in Redux represents the data carried by a Redux action. In Redux, actions are objects typically containing a type field specifying the action type and a payload field carrying additional information.
      // the type field indicates the type of the action, while the payload field contains the data that the action is carrying. The payload field holds the information necessary for the action to perform its intended operation.
      //Therefore, the statement state.user = action.payload; assigns the data carried by a Redux action, in this case, updated user information, to the user field in the Redux store. This kind of structure is commonly used in Redux to update the overall application state.
      state.user=action.payload;
    },
    logout:(state) => {
      state.user =null;
    },
  },
  });
 
  // This code exports actions from a Redux Slice. In a Redux Toolkit or Redux application, Slices, which are created using the createSlice function, typically include actions used to update the Redux store state.
  // Exporting these actions allows them to be utilized elsewhere in your code. 
  export const { login, logout } = userSlice.actions;


// It takes state as a parameter, representing the current state of the Redux store.
// The function returns the value of the user field inside the state. This allows access to the user field of the user Slice within the state
export const selectUser = (state) => state.user.user;

const userReducer= userSlice.reducer;

// This code exports the reducer of a Redux Slice created with Redux Toolkit or Redux. Slices typically include an initial state and actions to update that state. Within a Slice created with the createSlice function, there are actions and a reducer.
// This code exports the reducer used to update the state of the Redux store. If you want to use this reducer in another file, you can import it and use it to update the state of your Redux store. 
// export default userSlice.reducer;

export default userReducer;
