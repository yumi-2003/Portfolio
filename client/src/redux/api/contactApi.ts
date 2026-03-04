import { apiSlice } from './apiSlice';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<{ success: boolean; message: string }, ContactMessage>({
      query: (message) => ({
        url: '/contact',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
