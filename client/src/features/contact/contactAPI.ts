import api from "../../services/axios";
import type { ContactForm } from "../../types/contact";

export const sendContactAPI = async (data: ContactForm) => {
  const res = await api.post("/contacts", data);

  return res.data;
};
