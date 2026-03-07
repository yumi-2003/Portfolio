import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";
import skillReducer from "../features/skills/skillsSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    skills: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
