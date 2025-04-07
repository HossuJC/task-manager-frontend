import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;