import { redirect } from '@sveltejs/kit';

// /** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const protectedPaths = ['/dashboard'];
  
    const isProtectedPath = protectedPaths.some(path => event.url.pathname.startsWith(path));

    // Check if user is trying to access protected route
    if (isProtectedPath) {
        const token = event.cookies.get('jwt');
        if (!token) {
            throw redirect(303, '/login');
        }
    }

    const response = await resolve(event);
    return response;
};