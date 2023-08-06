<script setup lang="ts">
	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	const query = "dunk low";
	const data = await useFetch(
		`https://stockx.com/api/browse?_search=${query}`,
		{
			headers: {
				"user-agent":
					"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36",
				"sec-fetch-dest": "none",
				"sec-fetch-site": "cross-site",
				"sec-fetch-mode": "cors",
				"accept-language": "en-US",
			},
		}
	);
</script>

<template>
	<div>
		<div v-if="user">
			{{ data.error }}
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
