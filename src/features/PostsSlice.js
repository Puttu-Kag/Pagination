import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  await new Promise(resolve => setTimeout(resolve, 5000));
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: true,
    currentPage: 1,
  },
  reducers: {
    deletePost: (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export const { deletePost, setPage } = postsSlice.actions;
export default postsSlice.reducer;
