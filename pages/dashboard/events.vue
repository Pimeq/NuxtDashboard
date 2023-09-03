<script setup lang="ts">
	import { RecentEvents } from "types/recentEvents";
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	//maybe rewite to use lazy
	const { data, pending } = await useLazyFetch<RecentEvents>(
		"/api/fetchRecentEvents"
	);

	function formatDate(dateString: string) {
		const [date, time] = dateString.split("T");
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);

		return day + "." + month + "." + year;
	}
</script>

<template>
	<div class="max-h-screen">
		<div v-if="pending" class="grid place-items-center h-screen">
			<h1 class="font-mono text-xl m-5 text-yellow-300 animate-pulse">
				Fetching most recent events...
			</h1>
		</div>

		<div
			v-else-if="!data?.Note"
			class="max-h-screen overflow-y-auto flex-wrap flex"
		>
			<UCard v-for="item in data?.feed" class="m-5 relative">
				<template #header>
					<h1 class="font-mono">
						{{ item.title }}
					</h1>
				</template>
				<p class="font-mono">
					{{ item.summary }}
				</p>
				<img :src="item.banner_image" class="max-h-40 m-3" />

				<template #footer>
					<UBadge
						class="m-1"
						color="primary"
						variant="solid"
						v-for="topic in item.topics"
						:label="ref(topic.topic).value"
					/>
					<p>
						{{ formatDate(item.time_published) }}
						<UBadge color="white">{{ item.overall_sentiment_label }}</UBadge>
					</p>
				</template>
			</UCard>
		</div>
		<div v-else class="flex flex-wrap">Too many requests, please stand by</div>
	</div>
</template>
