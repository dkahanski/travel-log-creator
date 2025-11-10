<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="flex-none">
      <ThemeSwitcher />
      <GithubAuthButton />
    </div>
  </div>
</template>
