import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initializing state
const initialState = {
  loading: false,
  user: null,
  tasks: [],
  posts: [],
  error: null,
  success: null,
};

// Generates async functions
// https://backend.propertiesyard.com

// LOGIN
export const logorsign = createAsyncThunk(
  "Tnews/logorsign",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/`,
        form
      );
      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("myId", response.data.myId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.err);
    }
  }
);
// Get User
export const getUser = createAsyncThunk(
  "Tnews/getUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/`);
      return response.data; // data is the last
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Post
export const post = createAsyncThunk(
  "Tnews/post",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/post/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH POSTS
export const fetchPosts = createAsyncThunk(
  "Tnews/fetchPosts",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/post/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE Investment
export const updatePost = createAsyncThunk(
  "Tnews/updatePost",
  async (form, { rejectWithValue }) => {
    // console.log(id);
    try {
      const response = await axios.put(`http://localhost:5000/api/post/`, form);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "Tnews/updateUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/`, form);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "Tnews/fetchTasks",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CLAIM TASK
export const claimTask = createAsyncThunk(
  "Tnews/claimTask",
  async ({ taskId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/${taskId}`,
        {
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CREATE TASK
export const createTask = createAsyncThunk(
  "Tnews/createTask",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// REDUCERS
const TnewsSlice = createSlice({
  name: "Tnews",
  initialState,
  reducers: {
    clear(state) {
      return {
        ...state,
        success: null,
        error: null,
      };
    },
  },
  // working for async fetching data
  extraReducers: (builder) => {
    // WORKING FOR Register -> LOGIN
    builder.addCase(logorsign.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logorsign.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(logorsign.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // WORKING FOR GET User
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // WORKING FOR MAKE POST
    builder.addCase(post.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(post.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(post.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // FETCH POSTS
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = null;
      state.error = action.error.message;
    });

    // UPDATE POST
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = action.error.message;
    });

    // UPDATE USER
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // UPDATE Investment
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = null;
      state.error = action.payload;
    });

    // CLAIM TASK
    builder.addCase(claimTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(claimTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(claimTask.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // CREATE TASK
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });
  },
});
export const { clear } = TnewsSlice.actions;
export default TnewsSlice.reducer;
