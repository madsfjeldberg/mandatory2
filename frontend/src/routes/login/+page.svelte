<script>
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Input, Label } from 'flowbite-svelte';
  import AuthForm from '../../components/AuthForm.svelte';
  import LoginForm from '../../components/LoginForm.svelte';
  import { auth } from '../../lib/services/auth';
  import { z } from 'zod';
	import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';


  let errors = {
    username: '',
    email: '',
    password: '',
    form: ''
  }

  // create state
  let loginMode = true;

  const toggleMode = () => {
    loginMode = !loginMode;
  }

  console.log('loginMode', loginMode);


  
  // Add a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      if (loginMode) {
        let response;
        LoginRequest.parse({ username, password });
        response = await auth.login(username, password);
      } else {
        RegisterRequest.parse({ username, email, password});
        response = await auth.register(username, email, password)
      }
      
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


<div class="container mx-auto max-w-lg p-4 mt-10">
   <AuthForm errors={errors} handleSubmit={handleSubmit} loginMode={loginMode} toggleMode={toggleMode}/>
</div>