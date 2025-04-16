import { isAuthenticated } from "$lib/stores/authStore";

const BASE_URL = 'http://localhost:8080/auth';

const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  isAuthenticated.set(true); // Set the authentication status to true
  const data = await response.json();
  return data;
}

const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  isAuthenticated.set(false); // Set the authentication status to false
  return true;
}



export const auth = {
  login,
  logout
};