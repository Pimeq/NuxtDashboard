<script setup lang="ts">
	import type { FormError } from "@nuxthq/ui/dist/runtime/types";
	const user = useSupabaseUser();
	const isOpen = ref(false);
	const emit = defineEmits(["submit"]);
	const toast = useToast();
	defineShortcuts({
		escape: {
			usingInput: true,
			whenever: [isOpen],
			handler: () => {
				isOpen.value = false;
			},
		},
	});
	const symbols = ["BTCUSDT", "ETHUSDT"];

	const state = ref({
		activeUser: user.value.id,
		symbols: [],
	});

	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.symbols) errors.push({ path: "symbols", message: "Required" });
		return errors;
	};
	const form = ref();
	async function submit() {
		await form.value!.validate();
		const response = await useFetch("/api/saveUserConfig", {
			method: "POST",
			body: state.value,
		});
		toast.add({
			title: "Config saved",
			description: "Your config has been saved",
			icon: "i-heroicons-check-circle-20-solid",
		});
		isOpen.value = false;
		emit("submit");

		console.log(response);
	}
</script>
<template>
	<div>
		<UButton
			class="mx-2"
			color="primary"
			label="Setup a config"
			@click="isOpen = true"
		/>
		<UModal v-model="isOpen" prevent-close class="font-mono">
			<UButton
				color="gray"
				variant="ghost"
				icon="i-heroicons-x-mark-20-solid"
				class="w-8 h-8 absolute top-0 right-0"
				@click="isOpen = false"
			/>
			<div class="p-8">
				<h1 class="text-2xl">Modal</h1>
				<UForm
					ref="form"
					:validate="validate"
					:state="state"
					@submit.prevent="submit"
				>
					<UFormGroup label="User" name="User">
						<UInput v-model="state.activeUser" disabled />
					</UFormGroup>
					<UFormGroup label="Symbols" name="Symbols">
						<USelectMenu
							v-model="state.symbols"
							:options="symbols"
							multiple
							placeholder="Select symbols"
						/>
					</UFormGroup>
					<UButton class="my-3" type="submit"> Submit </UButton>
				</UForm>
			</div>
		</UModal>
	</div>
</template>
