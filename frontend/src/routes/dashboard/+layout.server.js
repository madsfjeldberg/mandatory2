import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import toast from 'svelte-french-toast';
dotenv.config();

// This function runs on the server side before rendering the page
// It checks if the user is authenticated by looking for a JWT cookie
// If the cookie is not found, it redirects the user to the login page
// implicitly passes data variable to +layout.svelte

// 'cookies' is received from the server-side context automatically
//  we can also access url, params, request, but we don't need them here
export function load({ cookies }) {
  const token = cookies.get('jwt');

  if (!token) {
    // User is not authenticated, redirect to login page  
    console.log('No token found.');
    throw redirect(303, '/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);

    // Check if token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      console.log('Token expired');
      // Delete the expired cookie
      cookies.delete('jwt');
      throw redirect(303, '/login');
    }

    console.log('User authenticated, proceeding to dashboard...');
    return {
      authenticated: true,
      user: {
        username: decoded.username
      }
    };
  } catch (error) {
    console.log('Token verification failed: ', error.message);
    cookies.delete('jwt', { path: '/'});
    throw redirect(303, '/login');
  }
  
  
  
}