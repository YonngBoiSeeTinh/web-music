import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: '',
    isAdmin: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            
            const { name, email, access_token,isAdmin } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
                
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.isAdmin ="";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
