import api from "../../services/axios";
import type { Project } from "../../types/project";

export const fetchProjectAPI = async (): Promise<Project[]> => {
  const response = await api.get("/projects");

  return response.data.data;
};
