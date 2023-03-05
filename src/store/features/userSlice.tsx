import { createSlice } from "@reduxjs/toolkit";



const initialState = { currentUser: {} };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser(state, action) {
            delete action.payload.token
            return {
                ...state,
                currentUser: action.payload,
            };
        },
        clearUser(state) {
            return {
                ...state,
                currentUser: {}
            }
        }
    },
});

export const { updateUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;