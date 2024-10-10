import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            
            const { name, email, access_token } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            
           
            state.name = "";
            state.email = "";
            state.access_token = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
