<script setup lang="ts">
	import { RecentEvents } from "types/recentEvents";

	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	const { data } = await useFetch<RecentEvents>("/api/fetchRecentEvents");
	const rData = ref(data);

	function formatDate(dateString: string) {
		const [date, time] = dateString.split("T");
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);

		return year + " " + month + " " + day;
	}
</script>

<template>
	<div class="max-h-screen">
		<div v-if="data" class="max-h-screen overflow-y-auto flex-wrap flex">
			<UCard v-for="item in rData?.feed" class="m-5 relative">
				<template #header>
					<h1 class="font-mono">
						{{ item.title }}
					</h1>
				</template>
				<p class="font-mono">
					{{ item.summary }}
				</p>
				<img :src="item.banner_image" class="max-h-40 m-3" />
				{{
					computed(() => {
						switch (item.overall_sentiment_label) {
							case "Bullish":
								break;

							case "Somewhat-Bullish":
								break;

							case "Neutral":
								break;

							case "Somewhat-Bearish":
								break;

							case "Bearish":
								break;
						}
					})
				}}

				<template #footer>
					<UBadge
						class="m-1"
						color="primary"
						variant="solid"
						v-for="topic in item.topics"
						:label="ref(topic.topic).value"
					/>
					<p>{{ formatDate(item.time_published) }}</p>
				</template>
			</UCard>
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
