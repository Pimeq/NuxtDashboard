<script setup lang="ts">
	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});
</script>

<template>
	<div>
		<div v-if="user">
			{{ user }}
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
