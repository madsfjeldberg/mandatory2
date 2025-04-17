import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isAuthenticated = writable(false);

export const checkAuth = () => {
  console.log('Checking authentication status...');
  console.log('Browser environment:', browser);
  console.log('Document:', document);
  console.log('Document cookie:', document.cookie);
  
  if (!browser) return false;
    // Ensure this runs only in the browser
    // Check if the JWT cookie is present
    const hasCookie = document.cookie.includes('jwt=');
    isAuthenticated.set(hasCookie);
    return hasCookie;
};