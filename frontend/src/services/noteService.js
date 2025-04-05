import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/notes";

export const fetchNotes = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createNote = async (note) => {
  const { data } = await axios.post(API_URL, note);
  return data;
};

export const getArchivedNotes = async () => {
  const response = await axios.get(`${API_URL}/archived`);
  return response.data;
};

export const updateNote = async (note) => {
  const { data } = await axios.patch(`${API_URL}/${note.id}`, note);
  return data;
};


export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const archiveNote = async (id) => {
  return axios.patch(`${API_URL}/${id}/archive`, { archived: true });
};

export const unarchiveNote = async (id) => {
  return axios.patch(`${API_URL}/${id}/archive`, { archived: false });
};

