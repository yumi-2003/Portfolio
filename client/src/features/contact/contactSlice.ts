import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendContactAPI } from "./contactAPI";
import type { ContactForm } from "../../types/contact";
import toast from "react-hot-toast";

export const sendContact = createAsyncThunk(
  "contact/sendContact",
  async (data: ContactForm) => {
    const response = await sendContactAPI(data);

    toast.success("Message sent successfully");

    return response;
  },
);

interface ContactState {
  loading: boolean;
}

const initialState: ContactState = {
  loading: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendContact.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default contactSlice.reducer;
