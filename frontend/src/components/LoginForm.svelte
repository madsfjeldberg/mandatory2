<script>
  import { Register } from "flowbite-svelte-blocks";
  import { Button, Checkbox, Input, Label } from "flowbite-svelte";

  let { errors, handleSubmit, loginMode } = $props();
</script>

<Register>
  <h1 class="font-bold text-3xl text-center dark:text-gray-200">Login to your account</h1>
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
    </form>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    {#if loginMode}
      Don't have an account yet? 
      <button onclick={() => loginMode = false} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
        Sign up
      </button>
    {:else}
      Already have an account? 
      <button onclick={() => loginMode = true} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
        Sign in
      </button>
    {/if}
  </p>
  </div>
</Register>