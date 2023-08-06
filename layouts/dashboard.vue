<script setup>
	const client = useSupabaseClient();
	const router = useRouter();
</script>

<template>
	<div>
		<div class="float-right m-3">
			<UButton
				size="lg"
				icon=" i-heroicons-lock-open"
				@click="
					() => {
						client.auth.signOut();
						router.push('/auth/login');
					}
				"
			>
				Log Out
			</UButton>
		</div>
		<div class="w-2/12 h-screen float-left">
			<DrawerNav />
		</div>

		<slot class="" />
	</div>
</template>
