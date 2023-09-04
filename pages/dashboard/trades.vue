<script setup lang="ts">
	import { Trades } from "types/trades";

	const client = useSupabaseClient();
	const router = useRouter();
	const user = useSupabaseUser();
	definePageMeta({
		layout: "dashboard",
	});

	const {
		pending: tradesPending,
		data: tradesData,
		refresh: tradesDataRefresh,
	} = await useLazyFetch<Trades>("/api/fetchTradesData", { method: "POST" });
	watch(tradesData, (newTradesData) => {
		tradesData.value = newTradesData;
	});

	interface BotStatus {
		status: boolean;
	}
	const {
		pending: botPending,
		data: botStatus,
		refresh: botStatusRefresh,
	} = await useLazyFetch<BotStatus>("/api/checkBotStatus", {
		method: "POST",
	});
	watch(botStatus, (newBotStatus) => {
		if (newBotStatus?.status == null) return;
		botStatus.value = newBotStatus;
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
		if (botPending.value == true) {
			return "text-yellow-300 animate-pulse";
		} else if (botStatus.value?.status == true) {
			return "text-green-300";
		} else if (botPending.value == false) {
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
								if (botPending == true) {
									return "Checking bot status...";
								} else if (botStatus?.status == true) {
									return "Bot is running";
								} else if (botStatus?.status == false) {
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
								botStatus?.status == true ||
								botPending == true ||
								botStatus == null
							"
							>Turn On</UButton
						>
						<UButton
							class="mx-2"
							color="red"
							:disabled="
								botPending == true ||
								botStatus?.status == false ||
								botStatus == null
							"
							>Turn Off</UButton
						>
						<UButton
							class="mx-2"
							color="blue"
							:disabled="botPending == true"
							@click="
								async () => {
									const what = await botStatusRefresh();
									console.log(botStatus, botPending);
								}
							"
						>
							Refresh
						</UButton>
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
