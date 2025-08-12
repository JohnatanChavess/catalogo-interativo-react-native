import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, // O app sempre começa com o usuário deslogado
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ação para quando o login for bem-sucedido
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Salva os dados do usuário
    },
    // Ação para fazer logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;