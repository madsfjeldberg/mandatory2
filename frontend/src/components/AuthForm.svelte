<script>
  import { Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Input, Label } from "flowbite-svelte";
  import { auth } from "$lib/services/auth";
  import { z } from "zod";
  import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';

  // state to handle switching between login/register
  let loginMode = $state(true);

  const toggleMode = () => {
    loginMode = !loginMode;
  }

  let errors = {
    username: '',
    email: '',
    password: '',
    form: ''
  }

  const RegisterRequest = z.object({
    username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
    password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(100, 'Password must be at most 100 characters long'),
    email: z.string()
    .email('Invalid email address')
    .max(50, 'Email must be at most 50 characters long'),
  });

  const LoginRequest = z.object({
    username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
    password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(100, 'Password must be at most 100 characters long'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      let response;
      if (loginMode) {
        LoginRequest.parse({ username, password });
        response = await auth.login(username, password);
      } else {
        RegisterRequest.parse({ username, email, password});
        response = await auth.register(username, email, password);
      }
      console.log("response: ", response)
      if (response.status === 200) {
        if (loginMode) {
          await toast.success('Login successful!');
        } else {
          await toast.success('Registration successful!');
        }
        await goto('/dashboard');
        
      } else {
        errors.form = 'Login failed: Invalid credentials';
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to form fields
        error.errors.forEach((err) => {
          if (err.path[0] in errors) {
            errors[err.path[0]] = err.message;
          }
        });
      } else {
        errors.form = error.message || 'An unexpected error occurred';
      }
    }
  };
  
</script>

<Register>
  {#if loginMode}
  <h1 class="font-bold text-3xl text-center dark:text-gray-200">Login</h1>
  {:else}
  <h1 class="font-bold text-3xl text-center dark:text-gray-200">Register</h1>
  {/if}
  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
      {#if errors.form}
        <p class="text-red-500 text-sm">{errors.form}</p>
      {/if}
      <Label class="space-y-2">
        <span>Username</span>
        <Input type="text" name="username" placeholder="username" required />
        {#if errors.username}
          <span class="text-red-500 text-sm">{errors.username}</span>
        {/if}
      </Label>
      <!-- Show email field if registering -->
      {#if !loginMode}
      <Label class="space-y-2">
        <span>Email</span>
        <Input type="text" name="email" placeholder="user@example.com" required />
        {#if errors.email}
          <span class="text-red-500 text-sm">{errors.email}</span>
        {/if}
      </Label>
      {/if}
      
      <Label class="space-y-2">
        <span>Password</span>
        <Input type="password" name="password" placeholder="•••••" required />
        {#if errors.password}
          <span class="text-red-500 text-sm">{errors.password}</span>
        {/if}
      </Label>
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
      </div>
      {#if loginMode}
      <Button type="submit" class="w-full1 hover:cursor-pointer">Sign in</Button>
      {:else}
      <Button type="submit" class="w-full1 hover:cursor-pointer">Sign up</Button>
      {/if}
    </form>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    {#if loginMode}
      Don't have an account yet? 
      <button onclick={toggleMode} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
        Sign up
      </button>
    {:else}
      Already have an account? 
      <button onclick={toggleMode} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
        Sign in
      </button>
    {/if}
  </p>
  </div>
</Register>