<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();

const logOut = async () => {
  await await client.auth.signOut();
  router.push("/auth/login");
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <div class="float-right m-3">
      <UButton size="lg" icon=" i-heroicons-lock-open" @click="logOut()">
        Log Out
      </UButton>
    </div>

    <div v-if="!user">
      <NuxtLoadingIndicator />
    </div>

    <p v-else>{{ user }}</p>
  </div>
</template>
