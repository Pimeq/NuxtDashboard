<script setup lang="ts">
	const user = useSupabaseUser();
	const client = useSupabaseAuthClient();
	const router = useRouter();
	client.auth.startAutoRefresh();

	const logOut = async () => {
		await await client.auth.signOut();
		router.push("/auth/login");
	};

	definePageMeta({
		middleware: "auth",

		layout: "dashboard",
	});
</script>

<template>
	<div>
		<div class="float-right m-3">
			<UButton size="lg" icon=" i-heroicons-lock-open" @click="logOut()">
				Log Out
			</UButton>
		</div>
		<div v-if="user">
			{{ user }}
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
