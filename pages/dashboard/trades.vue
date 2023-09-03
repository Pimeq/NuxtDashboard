<script setup lang="ts">
	import { Trades } from "types/trades";

	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	const { pending: tradesPending, data: tradesData } = await useLazyFetch<
		Trades | string
	>("/api/fetchTradesData");
	watch(tradesData, (newTradesData) => {
		tradesData.value = newTradesData;
	});

	//maybe rewite to use lazy
	interface BotStatus {
		status: boolean;
	}

	const botStatus = useFetch<BotStatus>("http://localhost:5000/checkStatus", {
		method: "POST",
		mode: "no-cors",
		lazy: true,
	});

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
		<div v-if="user && tradesData">
			<div class="max-h-screen overflow-y-auto">
				<div class="inline-flex">
					<h1 class="font-mono text-xl m-8" :class="color">
						{{
							computed(() => {
								if (botStatus.pending.value == true) {
									return "Checking bot status...";
								} else if (botStatus.data.value?.status == true) {
									return "Bot is running";
								} else if (botStatus.data.value?.status == false) {
									return "Bot is not running";
								} else {
									return "Bot status is unknown";
								}
							}).value
						}}
					</h1>
					<div class="m-8 ml-2">
						<UButton
							class="mx-2"
							color="primary"
							:disabled="
								botStatus.data.value?.status == true ||
								botStatus.pending.value == true ||
								botStatus.data.value == null
							"
							>Turn On</UButton
						>
						<UButton
							class="mx-2"
							color="red"
							:disabled="
								botStatus.pending.value == true ||
								botStatus.data.value?.status == false ||
								botStatus.data.value == null
							"
							>Turn Off</UButton
						>
						<UButton
							class="mx-2"
							color="blue"
							:disabled="
								botStatus.data.value == null || botStatus.pending.value == true
							"
							>Refresh</UButton
						>
					</div>
				</div>
				<div class="m-8">
					<UTable
						:rows="(tradesData as Trades)"
						:columns="columns"
						:loading="tradesPending"
					/>
				</div>
			</div>
		</div>
		<div v-else>
			<loading />
		</div>
	</div>
</template>
