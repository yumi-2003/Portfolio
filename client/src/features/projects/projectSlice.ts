import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectAPI } from "./projectAPI";
import type { Project } from "../../types/project";

export const fetchProjects = createAsyncThunk<Project[]>(
  "project/fetchProjects",
  async () => {
    return await fetchProjectAPI();
  },
);

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch projects";
      });
  },
});

export default projectSlice.reducer;
