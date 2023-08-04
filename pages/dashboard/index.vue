<script setup lang="ts">
	const client = useSupabaseClient();
	const user = useSupabaseUser();
	const router = useRouter();
	definePageMeta({
		layout: "dashboard",
	});
</script>

<template>
	<div>
		<div class="float-right m-3">
			<UButton
				size="lg"
				icon=" i-heroicons-lock-open"
				@click="
					() => {
						client.auth.signOut();
						router.push('/auth/login');
					}
				"
			>
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
