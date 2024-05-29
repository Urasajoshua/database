import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/login/', { email, password });
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        return data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload ? action.payload : 'Invalid credentials';
            });
    }
});

export default userSlice.reducer;
