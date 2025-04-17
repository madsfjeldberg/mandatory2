<script>
  import { browser } from '$app/environment';
	import { isAuthenticated } from '$lib/stores/authStore';
  import { onMount } from 'svelte';

  // this receives data from +layout.server.js
  export let data;

  onMount(() => {
    if (data.authenticated) {
      isAuthenticated.set(true);
    }
  });
  
</script>

<slot />