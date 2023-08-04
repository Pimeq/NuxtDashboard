<script setup lang="ts">
	const user = useSupabaseUser();
	const client = useSupabaseClient();
	const router = useRouter();

	const logIn = async (
		provider: "github" | "google" | "discord" | "bitbucket"
	) => {
		const { error } = await client.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: "http://localhost:3000/auth/confirmed",
			},
		});
		if (error) {
			return alert("Something went wrong !");
		}
	};
</script>

<template>
	<div class="flex justify-center items-center h-screen">
		<div class="grid place-items-center">
			<div>
				<UButton @click="logIn('discord')">Login with Discord</UButton>
			</div>
		</div>
	</div>
</template>
