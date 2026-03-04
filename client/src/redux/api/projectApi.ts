import { apiSlice } from './apiSlice';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink: string;
  githubLink: string;
}

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    // Add more endpoints as needed (CRUD)
  }),
});

export const { useGetProjectsQuery } = projectApi;
