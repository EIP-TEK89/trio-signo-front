import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type pour l'état initial
interface AuthState {
    token: string | null;
}

// État initial
const initialState: AuthState = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action pour définir le token
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        // Action pour supprimer le token
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;