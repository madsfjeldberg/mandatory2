import { redirect } from '@sveltejs/kit';

// This function runs on the server side before rendering the page
// It checks if the user is authenticated by looking for a JWT cookie
// If the cookie is not found, it redirects the user to the login page
// passes data variable to +layout.svelte

// 'cookies' is received from the server-side context automatically
//  we can also access url, params, request, but we don't need them here
export function load({ cookies }) {
  const token = cookies.get('jwt');
  if (!token) {
    // User is not authenticated, redirect to login page  
    console.log('User not authenticated');
    throw redirect(303, '/login');
  }
  
  
  console.log('User authenticated, proceeding to dashboard...');
  return {
    authenticated: true
  };
}