<script setup lang="ts">
	import { Trades } from "types/trades";

	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	//maybe rewite to use lazy
	const { data } = await useFetch<string | Trades>("/api/fetchTradesData");

	interface BotStatus {
		status: boolean;
	}

	const botStatus = useFetch<BotStatus>("http://localhost:5000/checkStatus", {
		method: "POST",
		mode: "no-cors",
		lazy: true,
	});

	data.value = JSON.parse(data.value as string) as Trades;
	const columns = [
		{
			key: "id",
			label: "ID",
		},
		{
			key: "created_at",
			label: "Timestamp",
		},
		{
			key: "profit",
			label: "Calculated Profit/Loss",
		},
		{
			key: "direction",
			label: "Direction",
		},
	];

	const color = computed(() => {
		if (botStatus.pending.value == true) {
			return "text-yellow-300 animate-pulse";
		} else if (botStatus.data.value?.status == true) {
			return "text-green-300";
		} else if (botStatus.pending.value == false) {
			return "text-red-500";
		} else {
			return "text-gray-300";
		}
	});
</script>

<template>
	<div>
		<div v-if="user">
			<div v-if="data" class="max-h-screen overflow-y-auto">
				<h1 class="font-mono text-xl m-5" :class="color">
					{{
						computed(() => {
							if (botStatus.pending.value == true) {
								return "Checking bot status...";
							} else if (botStatus.data.value?.status == true) {
								return "Bot is running";
							} else if (botStatus.pending.value == false) {
								return "Bot is not running";
							} else {
								return "Bot status is unknown";
							}
						}).value
					}}
				</h1>
				<div class="m-8">
					<UTable :columns="columns" :rows="(data as Trades)" />
				</div>
			</div>
			<div v-else class="m-auto text-center align-middle justify-center">
				<h1>Your trades will appear here</h1>
			</div>
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
