import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Skill } from "../../types/skill";
import { fetchSkillAPI } from "./SkillAPI";

export const fetchSkills = createAsyncThunk<Skill[]>(
  "skills/fetchSkills",
  async () => {
    return await fetchSkillAPI();
  },
);

interface SkillState {
  skills: Skill[];
  loading: boolean;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default skillSlice.reducer;
