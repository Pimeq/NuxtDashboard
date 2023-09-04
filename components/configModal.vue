<script setup lang="ts">
	import type { FormError } from "@nuxthq/ui/dist/runtime/types";
	const user = useSupabaseUser();
	const isOpen = ref(false);

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
		console.log(state.value);
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
							placeholder="Select people"
						/>
					</UFormGroup>
					<UButton class="my-3" type="submit"> Submit </UButton>
				</UForm>
			</div>
		</UModal>
	</div>
</template>
