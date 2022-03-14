import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOGIN_ENDPOINT } from 'src/api/apiEndPoint';
import axiosInstance from 'src/api/axiosInstance';
import { openNotification } from 'src/Components/Notification/Notification';
import { setCookie } from 'src/utils/cookie';

export const loginAction = createAsyncThunk(
  'users/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LOGIN_ENDPOINT, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  user: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logout(state) {
      state.errorMessage = '';
      state.isLoading = false;
      state.user = null;
      setCookie('token', '', 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
      // <Navigate to={page.signIn} />;
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const { payload: data } = action;
      const { data: user } = data;
      const newUser = Object.assign({}, user);
      delete newUser['accessToken'];
      setCookie('token', user.accessToken, 30);
      state.user = newUser;
    });

    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      const { payload } = action;
      openNotification('Login failed', payload?.message);
    });
  },
});

export const { logout } = counterSlice.actions;
export default counterSlice.reducer;
