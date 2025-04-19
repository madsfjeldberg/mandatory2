<script>
  export let data;

  const { user } = data;
  let username = user.username;
</script>

<h1 class="font-bold text-3xl text-center dark:text-gray-200">Settings</h1>

<h2 class="font-bold textxl dark:text-gray-200">Change username</h2>
<p class="font-bold textxl dark:text-gray-200">{username}</p>

<h2 class="font-bold textxl dark:text-gray-200">Change password</h2>