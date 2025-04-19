import { isAuthenticated } from "$lib/stores/authStore";

const BASE_URL = 'http://localhost:8080/auth';

const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  isAuthenticated.set(true);
  const data = await response.json();
  return data;
}

const register = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, email, password })
  });

  isAuthenticated.set(true);
  const data = await response.json();
  return data;
}

const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  isAuthenticated.set(false);
  return true;
}

export const auth = {
  login,
  register,
  logout
};