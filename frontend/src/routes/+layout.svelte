<script>
	import '../app.css';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
  import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { isAuthenticated } from '$lib/stores/authStore';
  import { auth } from '$lib/services/auth.js';
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

  const year = new Date().getFullYear();

  const handleLogout = async () => {
    await auth.logout();
    toast.success('Logged out successfully');
    goto('/');
  };

	let { children } = $props();
</script>

<Toaster />
<main class="min-h-screen bg-white dark:bg-gray-800">
<Navbar>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Cool ass website</span>
  </NavBrand>
  <div class="flex md:order-2">
    <DarkMode class="text-primary-500 dark:text-primary-600 border dark:border-gray-800" />
    <NavHamburger />
  </div>
  <NavUl class="flex md:order-1 md:ml-auto">
    
    <!-- Conditionally render navbar -->
    {#if $isAuthenticated}
    <NavLi href="/dashboard">Dashboard</NavLi>
    <NavLi class="cursor-pointer" on:click={handleLogout}>Logout</NavLi>
    {:else}
    <NavLi href="/">Home</NavLi>
    <NavLi href="/login">Login</NavLi>
    {/if}
  </NavUl>
</Navbar>

{@render children()}
</main>

<Footer>
  <div class="sm:flex sm:items-center sm:justify-between dark:bg-gray-800 p-5">
  <FooterCopyright href="/" by="madsfjeldberg" year={year} />
  <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <FooterLink href="/">About</FooterLink>
    <FooterLink href="/">Privacy Policy</FooterLink>
    <FooterLink href="/">Licensing</FooterLink>
    <FooterLink href="/">Contact</FooterLink>
  </FooterLinkGroup>
  </div>
</Footer>