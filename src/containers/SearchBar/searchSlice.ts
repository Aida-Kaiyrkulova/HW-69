import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface Show {
  id: number;
  name: string;
}

interface SearchState {
  results: Show[];
  status: 'idle' | 'loading' | 'success' | 'fail';
}

const initialState: SearchState = {
  results: [],
  status: 'idle',
}

export const searchDisplay = createAsyncThunk('search/searchDisplay', async (query: string) => {
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  return response.data.map(({ show }: { show: Show }) => show);
});

const searchSlice = createSlice({
  name:'search',
  initialState,
  reducers:{
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDisplay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchDisplay.fulfilled, (state, action) => {
        state.status = 'success';
        state.results = action.payload;
      })
      .addCase(searchDisplay.rejected, (state) => {
        state.status = 'fail';
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const { clearResults } = searchSlice.actions;