import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async ({ email_or_regno, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://13.60.203.193:8000auth/login/', { email_or_regno, password }).catch((error)=>{
            console.log(error.response.data);
        });
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        return data.user;
    } catch (error) {
        console.error('Login error:', error.response.data); // Debugging log
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