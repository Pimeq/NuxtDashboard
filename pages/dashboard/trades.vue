<script setup lang="ts">
	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	const { data } = await useFetch("/api/fetchTradesData");
</script>

<template>
	<div>
		<div v-if="user">
			<div v-if="data">{{ data }}</div>
			<div v-else class="m-auto text-center align-middle">
				<h1>Your trades will appear here</h1>
			</div>
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
