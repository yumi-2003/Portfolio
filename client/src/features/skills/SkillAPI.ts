import api from "../../services/axios";
import type { Skill } from "../../types/skill";

export const fetchSkillAPI = async (): Promise<Skill[]> => {
  const res = await api.get("/skills");

  return res.data.data;
};
