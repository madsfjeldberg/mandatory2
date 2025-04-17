<script>
  import { isAuthenticated } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import toast from 'svelte-french-toast';



</script>


<h1 class="font-bold text-3xl text-center dark:text-gray-200">Welcome to the Dashboard!</h1>
<h2 class="font-bold text-xl text-center dark:text-gray-200">This means you're logged in :)</h2>