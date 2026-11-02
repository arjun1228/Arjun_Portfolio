import api from './axios.js';

export const loginAdmin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getAdminMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Admin Profile Update
export const updateAdminProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
};

// Admin Experience CRUD
export const createAdminExperience = async (data) => {
  const response = await api.post('/experience', data);
  return response.data;
};

export const updateAdminExperience = async (id, data) => {
  const response = await api.put(`/experience/${id}`, data);
  return response.data;
};

export const deleteAdminExperience = async (id) => {
  const response = await api.delete(`/experience/${id}`);
  return response.data;
};

// Admin Projects CRUD
export const createAdminProject = async (data) => {
  const response = await api.post('/projects', data);
  return response.data;
};

export const updateAdminProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteAdminProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// Admin Skills CRUD
export const createAdminSkill = async (data) => {
  const response = await api.post('/skills', data);
  return response.data;
};

export const updateAdminSkill = async (id, data) => {
  const response = await api.put(`/skills/${id}`, data);
  return response.data;
};

export const deleteAdminSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};

// Admin Certifications CRUD
export const createAdminCertification = async (data) => {
  const response = await api.post('/certifications', data);
  return response.data;
};

export const updateAdminCertification = async (id, data) => {
  const response = await api.put(`/certifications/${id}`, data);
  return response.data;
};

export const deleteAdminCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}`);
  return response.data;
};

// Admin Messages
export const getAdminMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};

export const markMessageRead = async (id, read = true) => {
  const response = await api.patch(`/messages/${id}`, { read });
  return response.data;
};

export const deleteAdminMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};

// Admin Image Upload
export const uploadImageApi = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

