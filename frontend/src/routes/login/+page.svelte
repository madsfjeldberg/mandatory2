<script>
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Input, Label } from 'flowbite-svelte';
  import { auth } from '../../lib/services/auth';
  import { z } from 'zod';
	import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';


  let errors = {
    username: '',
    password: '',
    form: ''
  }

  const LoginRequest = z.object({
    username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
    password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(100, 'Password must be at most 100 characters long'),
  });
  
  // Add a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      LoginRequest.parse({ username, password });

      const response = await auth.login(username, password);
      if (response.status === 200) {
        await toast.success('Login successful!');
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


<div class="container mx-auto max-w-lg p-4 mt-10">
  <!-- <Section name="login"> -->
  <Register href="/">
    <h1 class="font-bold text-3xl text-center dark:text-gray-200">Login to your account</h1>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
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
        <Button type="submit" class="w-full1 hover:cursor-pointer">Sign in</Button>
        <Button on:click={() => toast.success('Toast button clicked!')}>Toast</Button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        </p>
      </form>
    </div>
  </Register>
<!-- </Section> -->
</div>