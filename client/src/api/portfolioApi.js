import api from './axios.js';

let isApiOnline = null;
let lastCheckTime = 0;
let healthCheckPromise = null;

// Silent availability check: caches result for 30 seconds and shares one in-flight request
const checkServerAvailable = async () => {
  const now = Date.now();
  if (isApiOnline !== null && (now - lastCheckTime < 30000)) {
    return isApiOnline;
  }
  if (healthCheckPromise) {
    return healthCheckPromise;
  }

  healthCheckPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);
      const res = await fetch((import.meta.env.VITE_API_URL || '/api') + '/health', {
        method: 'GET',
        signal: controller.signal
      }).catch(() => null);
      clearTimeout(timeoutId);
      isApiOnline = Boolean(res && res.ok);
    } catch {
      isApiOnline = false;
    }
    lastCheckTime = Date.now();
    return isApiOnline;
  })();

  try {
    return await healthCheckPromise;
  } finally {
    healthCheckPromise = null;
  }
};

const safeGet = async (url, params = {}) => {
  // If server is known to be offline, quietly return null to use fallbackData without browser network errors
  const isOnline = await checkServerAvailable();
  if (!isOnline) {
    return { success: false, data: null, isOffline: true };
  }

  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    isApiOnline = false; // Mark offline for quiet retry later
    return { success: false, data: null, error: error.message };
  }
};

export const getProfile = async () => safeGet('/profile');
export const getExperiences = async () => safeGet('/experience');
export const getProjects = async (params = {}) => safeGet('/projects', params);
export const getProjectBySlug = async (slug) => safeGet(`/projects/${slug}`);
export const getSkills = async () => safeGet('/skills');
export const getCertifications = async () => safeGet('/certifications');
export const checkHealth = async () => safeGet('/health');

export const submitContactMessage = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return {
        success: false,
        message: 'Backend server is currently offline. Please reach out directly via the email listed above!'
      };
    }
    return error.response.data || { success: false, message: error.message };
  }
};
